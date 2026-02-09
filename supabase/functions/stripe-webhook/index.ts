/**
 * Stripe Webhook — Supabase Edge Function
 * 
 * Handles Stripe subscription events to update user tier in the profiles table.
 * 
 * Events handled:
 *   - checkout.session.completed → set tier based on price ID
 *   - customer.subscription.updated → sync tier changes
 *   - customer.subscription.deleted → downgrade to free
 *   - invoice.payment_failed → flag for follow-up (keep tier for grace period)
 * 
 * Setup:
 *   1. Deploy: supabase functions deploy stripe-webhook --no-verify-jwt
 *   2. Set secrets:
 *      supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
 *      supabase secrets set STRIPE_SECRET_KEY=sk_live_...
 *   3. Add webhook endpoint in Stripe Dashboard:
 *      URL: https://<project>.supabase.co/functions/v1/stripe-webhook
 *      Events: checkout.session.completed, customer.subscription.updated,
 *              customer.subscription.deleted, invoice.payment_failed
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-04-10',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

const WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET')!

/** Map Stripe Price IDs to Stull Atlas tiers */
const PRICE_TO_TIER: Record<string, string> = {
  // Replace with your actual Stripe Price IDs
  [Deno.env.get('STRIPE_PRICE_SOLO') ?? 'price_solo']: 'solo',
  [Deno.env.get('STRIPE_PRICE_PRO') ?? 'price_pro']: 'pro',
}

async function updateUserTier(email: string, tier: string, stripeCustomerId?: string) {
  // Find user by email in auth.users, then update profile
  const { data: users } = await supabase.auth.admin.listUsers()
  const user = users?.users?.find(u => u.email === email)
  if (!user) {
    console.error(`No user found with email: ${email}`)
    return
  }

  const updates: Record<string, unknown> = { tier }
  if (stripeCustomerId) updates.stripe_customer_id = stripeCustomerId

  const { error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)

  if (error) {
    console.error(`Failed to update tier for ${email}:`, error)
  } else {
    console.log(`Updated ${email} to tier: ${tier}`)
  }
}

serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return new Response('Missing signature', { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature, WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  console.log(`Received event: ${event.type}`)

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const email = session.customer_email ?? session.customer_details?.email
      if (!email) break

      // Retrieve subscription to get the price/tier
      if (session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string)
        const priceId = sub.items.data[0]?.price?.id
        const tier = priceId ? (PRICE_TO_TIER[priceId] ?? 'solo') : 'solo'
        await updateUserTier(email, tier, session.customer as string)
      }
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const priceId = sub.items.data[0]?.price?.id
      const tier = priceId ? (PRICE_TO_TIER[priceId] ?? 'solo') : 'solo'

      // Get customer email
      const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer
      if (customer.email) {
        await updateUserTier(customer.email, tier)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      const customer = await stripe.customers.retrieve(sub.customer as string) as Stripe.Customer
      if (customer.email) {
        await updateUserTier(customer.email, 'free')
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const email = invoice.customer_email
      if (email) {
        // Don't downgrade immediately — log for follow-up
        console.warn(`Payment failed for ${email}. Consider grace period.`)
      }
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
