/**
 * User Menu
 * 
 * Compact header button:
 *   - Logged out: "Sign In" button opens AuthModal
 *   - Logged in: shows email + tier badge with dropdown (profile, sign out)
 */

import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, getTrialStatus } from '@/stores'
import { tierDisplayName } from '@/domain/tier'
import { AuthModal } from './AuthModal'

export function UserMenu() {
  const { user, profile, signOut, initialized } = useAuthStore()
  const [showModal, setShowModal] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [showDropdown])

  if (!initialized) return null

  const trialStatus = getTrialStatus(profile)
  const effectiveTier = trialStatus === 'active' ? 'pro' : (profile?.tier ?? 'free')
  const trialDaysLeft = profile?.trial_end
    ? Math.max(0, Math.ceil((new Date(profile.trial_end).getTime() - Date.now()) / 86400000))
    : 0

  if (!user) {
    return (
      <>
        <button className="user-signin-btn" onClick={() => setShowModal(true)}>
          Sign In
        </button>
        <AuthModal isOpen={showModal} onClose={() => setShowModal(false)} />

        <style>{`
          .user-signin-btn {
            padding: 6px 16px;
            border-radius: 6px;
            border: 1px solid var(--accent);
            background: var(--accent-bg);
            color: var(--text-bright);
            font-size: 13px;
            cursor: pointer;
            transition: all 0.15s;
          }

          .user-signin-btn:hover {
            background: var(--accent-hover);
          }
        `}</style>
      </>
    )
  }

  return (
    <div className="user-menu" ref={dropdownRef}>
      <button
        className="user-menu-trigger"
        onClick={() => setShowDropdown(!showDropdown)}
        title={user.email ?? ''}
      >
        <span className="user-email">{user.email?.split('@')[0]}</span>
        <span className={`user-tier-badge tier-${effectiveTier}`}>
          {trialStatus === 'active' ? `Trial (${trialDaysLeft}d)` : tierDisplayName(effectiveTier as any)}
        </span>
      </button>

      {showDropdown && (
        <div className="user-dropdown">
          <div className="user-dropdown-header">
            <span className="user-dropdown-email">{user.email}</span>
            <span className="user-dropdown-tier">
              {tierDisplayName(profile?.tier ?? 'free')}
              {trialStatus === 'active' && ` — Trial (${trialDaysLeft} days left)`}
            </span>
          </div>
          <div className="user-dropdown-divider" />
          {trialStatus === 'expired' && (
            <div className="user-dropdown-notice">
              Your trial has ended. <a href="/#/pricing">Upgrade</a> to keep Pro features.
            </div>
          )}
          {effectiveTier === 'free' && trialStatus !== 'active' && (
            <button
              className="user-dropdown-item"
              onClick={() => { navigate('/nceca'); setShowDropdown(false) }}
            >
              Redeem Trial Code
            </button>
          )}
          {(effectiveTier === 'solo' || effectiveTier === 'pro') && trialStatus !== 'active' && (
            <button
              className="user-dropdown-item"
              onClick={() => {
                const portalUrl = import.meta.env.VITE_STRIPE_PORTAL_URL
                if (portalUrl) {
                  const url = new URL(portalUrl)
                  if (user.email) url.searchParams.set('prefilled_email', user.email)
                  window.open(url.toString(), '_blank')
                } else {
                  window.location.href = 'mailto:contact@stullatlas.app?subject=Billing%20Inquiry'
                }
                setShowDropdown(false)
              }}
            >
              Manage Subscription
            </button>
          )}
          <button className="user-dropdown-item" onClick={() => { signOut(); setShowDropdown(false) }}>
            Sign Out
          </button>
        </div>
      )}

      <style>{`
        .user-menu {
          position: relative;
        }

        .user-menu-trigger {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px;
          border-radius: 6px;
          border: 1px solid var(--border-secondary);
          background: var(--bg-input);
          color: var(--text-primary);
          cursor: pointer;
          font-size: 13px;
          transition: all 0.15s;
        }

        .user-menu-trigger:hover {
          border-color: var(--accent);
          background: var(--bg-elevated);
        }

        .user-email {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .user-tier-badge {
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
        }

        .tier-free {
          background: var(--bg-tertiary);
          color: var(--text-secondary);
        }

        .tier-solo {
          background: rgba(52, 152, 219, 0.2);
          color: #5ba3d9;
        }

        .tier-pro {
          background: rgba(155, 89, 182, 0.2);
          color: #a76bcf;
        }

        .tier-edu_individual, .tier-edu_classroom {
          background: rgba(46, 204, 113, 0.2);
          color: #2ecc71;
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          min-width: 220px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-primary);
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          z-index: 100;
          overflow: hidden;
        }

        .user-dropdown-header {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .user-dropdown-email {
          font-size: 13px;
          color: var(--text-primary);
        }

        .user-dropdown-tier {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .user-dropdown-divider {
          height: 1px;
          background: var(--border-primary);
        }

        .user-dropdown-item {
          display: block;
          width: 100%;
          padding: 10px 14px;
          background: none;
          border: none;
          text-align: left;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.1s;
        }

        .user-dropdown-item:hover {
          background: var(--bg-hover);
          color: var(--text-primary);
        }

        .user-dropdown-notice {
          padding: 8px 14px;
          font-size: 12px;
          color: var(--text-warning, #f59e0b);
          background: rgba(245, 158, 11, 0.08);
          line-height: 1.4;
        }

        .user-dropdown-notice a {
          color: var(--accent);
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}
