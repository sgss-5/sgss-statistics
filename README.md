# SGSS Telemetry & Product Statistics Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Deploy%20Status-Live-10b981?style=for-the-badge&logo=cloudflare" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/Live%20Endpoint-sgss--statistics.pages.dev-6366f1?style=for-the-badge" alt="Live URL" />
  <img src="https://img.shields.io/badge/Reliability-100.00%25-059669?style=for-the-badge" alt="Reliability" />
  <img src="https://img.shields.io/badge/Monthly%20Invocations-480k%2B-purple?style=for-the-badge" alt="Invocations" />
</p>

Executive real-time product usage analytics, telemetry intelligence, and traffic monitoring dashboard for all **SGSS** digital products, Discord gaming bots, web applications, and Cloudflare Workers & Pages deployed across all 3 Cloudflare accounts.

🌐 **Production URL**: [https://sgss-statistics.pages.dev](https://sgss-statistics.pages.dev)  
💖 **Support & Donations**: [https://donate-to-sgss.pages.dev](https://donate-to-sgss.pages.dev)  
👤 **Lead Developer**: [Walusimbi Leon](https://github.com/Walusimbi-Leon)  

---

## 🚀 Key Features

- **Multi-Account Fleet Telemetry**: Seamlessly aggregates data across all 3 Cloudflare accounts configured via GitAlia Vault credentials.
- **Granular Time Window Filtering**:
  - `24 Hours`: Immediate spike detection & diurnal usage.
  - `7 Days`: Week-over-week velocity and trending shifts.
  - `30 Days`: Monthly active volume and growth projections.
  - `All Time`: Cumulative invocation milestones.
- **Surge & Trending Detection**: Automatic classification of edge services based on week-over-week performance (`Surging ▲ +536.1%`, `Growing`, `Steady`, `Cooling`, and `Idle / Underused`).
- **Interactive SVG Trajectory Chart**: 31-day cubic-bezier area chart with hover tooltips, daily invocation count, and leader breakdown.
- **Per-Service Detail Modals**: Deep-dive histogram showing 31-day daily breakdown, Cloudflare Worker ID, subrequests executed, and 0.00% error rate.
- **Investor Presentation Mode**: One-click executive briefing modal summarizing platform traction (480,000+ requests across 22 microservices), global PoP coverage, unit economics, and instant clipboard export for partners and sponsors.
- **Turnkey Donation Integration**: Direct header and footer CTAs linking to the live Paystack donation portal at `https://donate-to-sgss.pages.dev`.

---

## 📊 Tracked Services Overview (480,000+ Invocations)

| Service Name | Category | Runtime | 30d Volume | 7d Velocity | Live Endpoint |
|:---|:---:|:---:|:---:|:---:|:---|
| **Stickman Rumble** | Discord Game | Worker | 142,004 | Steady | `stickman-rumble.walusimbileon1.workers.dev` |
| **Islamic Trivia** | Discord Game | Worker | 90,116 | Steady | `islamic-trivia.walusimbileon1.workers.dev` |
| **English Trivia** | Discord Game | Worker | 74,758 | Steady | `english-trivia.walusimbileon1.workers.dev` |
| **Trivia Rumble Elite** | Discord Game | Worker | 72,132 | Steady | `trivia-rumble-elite.walusimbileon1.workers.dev` |
| **Bible Trivia** | Discord Game | Worker | 60,234 | Steady | `bible-trivia.walusimbileon1.workers.dev` |
| **Bible Songs 24/7** | Media & Radio | Worker | 14,608 | **▲ +536.1%** | [bible-songs.walusimbileon1.workers.dev](https://bible-songs.walusimbileon1.workers.dev/) |
| **Dice Arena** | Discord Game | Worker | 12,681 | Steady | `dice-arena.walusimbileon1.workers.dev` |
| **Memory Cascade** | Discord Game | Worker | 8,681 | Steady | `memory-cascade.walusimbileon1.workers.dev` |
| **Brick Breaker** | Discord Game | Worker | 2,176 | Steady | `brick-breaker.walusimbileon1.workers.dev` |
| **Bluff Dice** | Discord Game | Worker | 1,704 | Steady | `bluff-dice.walusimbileon1.workers.dev` |
| **Quran Trivia** | Discord Game | Worker | 1,509 | Steady | `quran-trivia.walusimbileon1.workers.dev` |
| **Donate to SGSS** | Website | Pages | Active | Stable | [donate-to-sgss.pages.dev](https://donate-to-sgss.pages.dev) |
| **SGSS Statistics** | Analytics | Pages | Active | High | [sgss-statistics.pages.dev](https://sgss-statistics.pages.dev) |

---

## 🛠 Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 with `@tailwindcss/vite`
- **Styling**: Tailwind CSS v4 (Dark telemetry theme)
- **Icons**: Lucide React
- **Deployment**: Cloudflare Pages (`walusimbileon1@gmail.com`)

---

## 📦 Local Development

```bash
git clone https://github.com/Walusimbi-Leon/sgss-statistics.git
cd sgss-statistics
npm install
npm run dev
```

To build and deploy to Cloudflare Pages:

```bash
npm run build
npx wrangler pages deploy dist --project-name sgss-statistics --branch main
```

---

## 📄 License & Credits

Designed and maintained by the SGSS engineering team under [Walusimbi Leon](https://github.com/Walusimbi-Leon). All edge workers deployed across Cloudflare global network.
