# Email to Henry Crissman

**To:** hjcrissman@gmail.com
**Subject:** The glaze tool I mentioned today — stullatlas.app

---

Henry,

Great running into you at Steven's today. I wanted to follow up properly because I think you'd actually want to know the full picture of what I've been building, not just the elevator pitch.

Here's the link: **[stullatlas.app](https://stullatlas.app)**

It's free right now, runs in the browser, no account needed. But I want to tell you what's actually happening under the hood, because I think you're someone who'd care about that.

**The basic idea:**

In 1912, R.T. Stull published a chart mapping glaze surfaces (matte, satin, bright) against their silica-to-alumina ratios. He had maybe 50 glazes, all fired to cone 11. That chart has been reprinted in every glaze chemistry textbook for over a century — Hamer & Hamer, Rhodes, Digitalfire — but always as a static diagram. A picture of an idea from 1912.

What I did was take the same coordinate system — SiO2 on one axis, Al2O3 on the other, both in Unity Molecular Formula — and plot over 9,000 real glaze recipes on it. These are glazes from Glazy's open dataset. Recipes that actually got mixed, fired, and documented by potters. The density of points in different regions of the chart tells you something: where glazes cluster, that's where potters have found reliable results over decades. Where there are voids — empty zones nobody goes — that's where glazes tend to craze, crawl, or just not do anything interesting.

So Stull's 1912 map becomes a living density map of a century of accumulated potter knowledge. The patterns aren't theoretical. They're empirical. Thousands of people mixed these glazes because they worked.

**What you can do with it:**

When you click on any dot, you see the full recipe — materials, UMF oxide breakdown, cone, atmosphere, surface type. You see photos when they're available. You see the nearest neighboring glazes, so you can understand what's around you in that chemistry space. If you're developing a new glaze and you want to know "what else lives near this ratio?" — you can see that instantly.

There are blend tools — line blends, triaxial, radial — where you pick endpoints and the app calculates every intermediate recipe with full UMF. There's an optimizer where you can set target oxide values and it'll converge on a recipe. There's a suggestion engine where you can type something like "matte celadon cone 10 reduction" and it'll find recipes that match.

The wood-fire work in the dataset is particularly interesting. You'll see how those glazes cluster differently from reduction or oxidation — the ash chemistry shifts the flux balance in ways that show up clearly in the Stull space. Given your history with anagama and the Mobile Anagama project, I think you'd find that view especially worth exploring.

**Why I'm telling you all this:**

Because you said something today that stuck with me, and I went home and put it in the project's foundational document. The first line of the README now reads:

> **First Principle: Useful for Potters.**
> Non-negotiable. If it's not useful to a working potter, it doesn't ship.

Your name is on that line. It says: "This principle comes from Henry Crissman (Ceramics School, Hamtramck) and is held in place by a network of potters who will tell us the truth — Ken Shenstone, Steven Johnson, Brett Gray, Kevin Kwiatkowski."

I put those names there deliberately. That's the network that keeps this honest. If it turns into a tech demo that nobody in a studio would actually open, those are the people who'll say so. You're the first person I'm sending this to because you're the one who made me write that line.

**What I actually need from you:**

Not compliments. Critique. Open it, poke around, and tell me:
- What's confusing?
- What's missing?
- What would you actually use while you're mixing or developing a glaze?
- What would be useful for your students at CCS?

That last one matters to me. You think about ceramics as a means — "a means of social, intellectual and creative emancipation," as you put it. I think about tools the same way. A tool that only works for people who already understand UMF notation is a tool that reinforces existing knowledge hierarchies. A tool that helps someone at Ceramics School understand why their glaze crazed — that's actually doing something.

**NCECA:**

I'll be in the Resource Hall at NCECA in Pittsburgh, March 25-27. If you're going, come find me. I'd love to show you the 3D view in person — the interactive Stull chart extends into a third dimension when you add a flux axis, and that's when the real patterns emerge. It's the kind of thing that's better to see on a screen than described in an email.

If you're not going to Pittsburgh, I'd be happy to come by Ceramics School sometime and show it in person. It works on any laptop or tablet.

**One more thing:**

Ken Shenstone's name is on that list because you're the one who told me to go see him. You said "No, you need to go there tomorrow." I went. He's an incredible potter who told me things I never knew. The brick from Gary Navarre's Olympic kiln ended up on the crown of Ken's NOMMO dome. These connections aren't accidents — they're how the ceramics community actually works. This tool is trying to do the same thing for glaze knowledge that people like you and Ken do for craft knowledge: make it accessible, make it communal, make it survive.

**The other thing I'm building — and I think this one's actually for you:**

I've been mapping our community. Not metaphorically — literally. I built a force-directed network graph of the Michigan ceramics community. You're in it. Ken's in it. Virginia, Kelly, Paul Kotula, Steven, Kevin, Brett — everyone. Every node has a bio. Every edge has a story. When you click the line between you and Ken, it says "mentored by." When you click the line between you and Pewabic, it says "taught 2016-18." The data is real. The connections are real.

Right now it's text — names, relationships, notes. 27 nodes, 40 links. But here's where it's going:

**Images.** Photos of kilns and firings. Ken's anagama. The Salty Dog at Fortress Studios. People at work. Places that matter. The graph stops being abstract and starts being documentary.

**Oral history.** Click the edge between me and Ken, hear me describe driving to Albion because you said "No, you need to go there tomorrow." Click your node, hear you talk about why you started Ceramics School. Everyone has a "how I got into clay" story. Record those — 60 seconds each — and the graph becomes a living archive.

**The "flowed" field.** Every connection in the graph has a field called "flowed" — not just who knows who, but *what passed between them*. What flowed from Ken to you? Wood-fire philosophy. The studio as temple. What flowed from you to me? A First Principle. What flowed from Kelly to me? Entry into this whole world. That's the real graph — not the people, but what moved between them.

**Glaze as connection.** This is where it ties back to the Atlas. Glazes are recipes that travel. Someone shares a celadon base, it gets modified, it shows up three states away. That's a lineage — and it maps perfectly onto a graph. The Stull Atlas has the chemistry. The community graph has the people. Together: who gave what to who, and how the knowledge actually moved.

**The thing I keep thinking about:** Your philosophy — "ceramics as a means of social, intellectual and creative emancipation" — that's not just a statement. It's a structure. The community graph is what that structure looks like when you render it as data. You built a web around yourself without trying to. Ceramics School, the Kickstarter, the residencies, sending Ryan to Ken's, mentoring students at CCS — every one of those is an edge in the graph. I think you'd be moved to see it drawn out. The pattern is there whether you map it or not, but mapping it makes it shareable, preservable, and useful.

**Long game:** Teacher-to-student chains across generations. Historical nodes for people who built the traditions we inherited. A self-contained archive you can open in a browser in 20 years and the whole community is still there. Ceramics has an apprenticeship tradition that's mostly invisible — nobody maps it. This could be the first tool that actually shows how ceramic knowledge moves through generations in Michigan.

**At NCECA:** I want to set up a simple station: "Add yourself to the Michigan ceramics community graph." A tablet, 2 minutes. Name, where you work, who do you know. Walk away with 50 new nodes and 200 new edges — real ones, from real people. The graph explodes in three days. And everyone who added themselves has a reason to come back to it.

I want to show this to you — the Stull Atlas *and* the community graph — because they're really two halves of the same idea. One maps what potters know. The other maps how they came to know it. You're in both.

**A personal note:**

You might not know this about me, but I'm good on computers. Not just "I use them" good — I build things. In the past month I've done things with this project that genuinely surprised me, and I'm not easy to surprise. I want to share some of that with you in good time — how I'm building it, what the process looks like, why it matters that a potter is the one writing the code and not the other way around.

Thanks for being a friend, Henry. Keep the link. Come back to it when you're mixing. And call me if you'd rather talk through it — I know you prefer phone calls to artist statements.

Ryan Lack
stullatlas.app
hello@stullatlas.app
RL Ventures LLC
