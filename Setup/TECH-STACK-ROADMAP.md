# P2P Logistics — Prototype to Production: Tech Stack & Integration Roadmap

> **Prepared for:** P2P Logistics (UK & USA to Ghana Air Freight)
> **Target Architecture:** Next.js (App Router)
> **Prototype Stack:** React 19 + Vite + Tailwind CSS (SPA, no backend)
> **Document Purpose:** Educate on the backend systems, third-party integrations, and infrastructure required to evolve this approved visual prototype into a fully functional, production-ready product.

---

## How to Read This Document

Each section below corresponds to a functional capability identified from the prototype. For every capability, you will find:

- **Visual Trigger** — the specific UI element in the prototype that creates this need
- **Production Reality** — what actually has to happen "behind the scenes"
- **Build Approaches** — how the development team would build this natively
- **SaaS / Third-Party Options** — proven tools that handle this out of the box

---

## Section 1: Contact Form & Lead Capture

**Visual Trigger:** The "Send us a message" form in the Contact section (`ContactSection.tsx`) with Full Name, Email, Package Details, and Message fields. Currently, the submit button fires `e.preventDefault()` and does nothing.

**Production Reality:** Every form submission must be validated (both client-side and server-side), stored somewhere so the team can respond, and trigger an instant confirmation email to the customer. Without this pipeline, leads are silently dropped.

### Build Approaches (Next.js Native)

- **Next.js Server Actions + PostgreSQL:** Define a `sendMessage` Server Action that validates the payload with Zod, writes the lead to a `contact_submissions` table, and enqueues a transactional email. Zero additional API infrastructure needed; fully type-safe. _Time: ~1–2 days. Maintenance: low._
- **Next.js API Route + Resend SDK:** Create `/api/contact` as a Route Handler. On POST, send the message body directly via Resend's API to the team's inbox and reply with a confirmation email. No database required for a simple notification-only flow. _Time: ~half a day. Maintenance: very low._
- **React Hook Form + Zod + Server Action:** Add `react-hook-form` for UX-grade validation (inline errors, loading states, success toasts) wired to the same Server Action above. The `ShippingStatus` enum already stubbed in `types.ts` maps perfectly to this pattern. _Time: ~1 day. Maintenance: low._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Formspree** | Free tier (50 submissions/mo); Pro from $10/mo | Instant form-to-email with zero backend code; drop-in `<form action="...">` |
| **Netlify Forms / Vercel Edge Forms** | Included in hosting plans | Native to the deployment platform; no extra service needed |
| **HubSpot Free CRM Forms** | Free forever tier; Starter from $20/mo | Captures leads directly into a CRM with pipeline tracking, auto-follow-up sequences, and a free dashboard the client can log into |

> **Recommendation for MVP:** Next.js Server Action + Resend for instant notification, plus HubSpot free CRM to give the client visibility into every enquiry.

---

## Section 2: Transactional Email

**Visual Trigger:** The contact form, the "Get Shipping Address" CTA button, and the "Request Custom Quote" button on the Tariffs page all imply outbound email communication (confirmation receipts, address delivery, quote responses).

**Production Reality:** Transactional emails (triggered by a user action) are fundamentally different from marketing newsletters. They require a dedicated sending infrastructure with high deliverability, SPF/DKIM/DMARC DNS records, bounce handling, and template management. Sending from a personal Gmail account at scale will result in spam-folder placement and account suspension.

### Build Approaches (Next.js Native)

- **Nodemailer + SMTP (self-hosted):** Use `nodemailer` in a Server Action/Route Handler to send via your own domain's SMTP server. Full control, no third-party dependency. _Maintenance: high — you own deliverability, DNS records, and bounce handling._
- **React Email + Resend:** Define email templates as React components using the `react-email` library. Render them server-side and send via Resend's API. Gives the team full design control with familiar JSX syntax. _Time: ~1 day per template. Maintenance: low._
- **Custom Queue + Worker:** For high volume, add a Redis queue (Upstash) and process emails asynchronously via a background worker. Prevents slow form responses caused by email-sending latency. _Time: ~2–3 days. Maintenance: medium._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Resend** | Free (3,000 emails/mo, 100/day); Pro from $20/mo | Developer-first, React Email native, excellent DX — **top recommendation** |
| **SendGrid (Twilio)** | Free (100 emails/day forever); Essentials from $19.95/mo | Industry standard with 20+ years of deliverability infrastructure; best if volume grows |
| **Brevo (ex-Sendinblue)** | Free (300 emails/day, unlimited contacts); Starter from $9/mo | Combines transactional email + marketing email + SMS in one free tier — strong value for a growing business |

---

## Section 3: AI Shipping Assistant

**Visual Trigger:** The fixed bottom-right chat widget (`AIShippingAssistant.tsx`) which currently calls the Google Gemini API directly from the browser using an API key injected at build time.

**Production Reality:** Exposing an AI API key in client-side JavaScript is a **critical security vulnerability**. Anyone who opens DevTools can extract the key and run unlimited API calls billed to the P2P Logistics account. In production, all AI calls must be proxied through a server-side endpoint. Additionally, the current model identifier (`gemini-3-flash-preview`) is a preview name that may be deprecated.

### Build Approaches (Next.js Native)

- **Next.js Route Handler Proxy (`/api/chat`):** Move the `GoogleGenAI` call into a server-side Route Handler. The client sends the conversation history to `/api/chat`; the server holds the real API key securely in an environment variable and streams the response back. _Time: ~half a day. Maintenance: very low._
- **Vercel AI SDK (`ai` package):** Wraps Google, OpenAI, Anthropic, and others behind a unified streaming API with built-in rate limiting helpers, token counting, and React hooks (`useChat`). Replaces the custom fetch logic in `AIShippingAssistant.tsx` with ~10 lines of code. _Time: ~1 day. Maintenance: very low._
- **Rate Limiting + Abuse Protection:** Add per-IP rate limiting using Upstash Redis + `@upstash/ratelimit` in the Route Handler middleware. Prevents the assistant from being abused and running up unexpected AI API bills. _Time: ~half a day. Maintenance: low._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Google AI (Gemini 2.0 Flash)** | Free tier (generous); Pay-as-you-go after | Already integrated — migrate the key server-side; upgrade model to `gemini-2.0-flash` |
| **OpenAI GPT-4o Mini** | Pay-as-you-go (~$0.15/1M input tokens) | Best-in-class reasoning; GPT-4o Mini offers excellent quality at very low cost |
| **Intercom / Tidio** | Tidio: Free (50 conversations/mo); Intercom: from $39/mo | Full-featured live chat + AI bot hybrid — allows a human agent to take over when AI cannot answer; includes chat history, customer profiles, and mobile notifications for the P2P team |

---

## Section 4: Shipment & Order Tracking

**Visual Trigger:** The "End-to-End Tracking" feature card in `Features.tsx` ("Track your shipment from our warehouse to your Ghana pickup point") and the `ShippingStatus` enum (`IDLE | LOADING | SUCCESS | ERROR`) already stubbed in `types.ts`. The "Step 4: Final Delivery" card in `HowItWorks.tsx` also signals tracking intent.

**Production Reality:** Real tracking requires a database record per shipment, status update mechanisms (manual staff updates via an admin panel, or automated webhook triggers from a carrier), a customer-facing tracking page, and push/email/SMS notifications at each status change.

### Build Approaches (Next.js Native)

- **Database + Admin Panel:** Create a `shipments` table with a `status` column mapping to the `ShippingStatus` enum. Build a password-protected `/admin/shipments` page where staff log in and update statuses manually. Customers visit `/track/[trackingId]` to see their shipment's current stage. _Time: ~3–5 days. Maintenance: medium._
- **Next.js Dynamic Route + QR Code:** Generate a unique tracking URL per shipment. Add a "Track your parcel" email with a QR code (using the `qrcode` npm package) linking to `/track/[id]`. Entirely self-contained; no external tracking provider needed. _Time: ~2 days. Maintenance: low._
- **Webhook-Driven Status Updates:** Integrate with air cargo carriers (e.g., British Airways World Cargo API, or a freight forwarder's API) to receive automated webhook events. Each webhook updates the `shipments` table in real time. _Time: ~1–2 weeks. Maintenance: medium-high (dependent on carrier API stability)._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **AfterShip** | Free (50 shipments/mo); Essentials from $11/mo | Multi-carrier tracking aggregator; provides a hosted tracking page and notification automations out of the box |
| **Shippo** | Pay-as-you-go ($0.05–$0.10/label); free tracking | Combines label generation + tracking; ideal if P2P wants to eventually print shipping labels directly |
| **EasyPost** | Free tier (up to 500 shipments); then metered | Developer-friendly, REST API, 100+ carrier integrations, Webhooks — best for a custom-branded tracking experience |

---

## Section 5: CMS — Content Management (FAQ, Services, Tariffs)

**Visual Trigger:** The FAQ section in `HowItWorks.tsx` (4 hardcoded Q&A cards), the Services list in the Footer, the "Professional Consolidation Services" bullet list in `ServicesPage`, and the pricing tables in `TariffSection.tsx` — all of this content is currently hard-coded in `constants.tsx`. Any update requires a code deployment.

**Production Reality:** The client (or their staff) will need to update tariff prices, add new FAQ items, and edit service descriptions without requiring a developer. A CMS decouples content from code, enabling non-technical edits through a web interface.

### Build Approaches (Next.js Native)

- **Markdown Files + `next-mdx-remote`:** Store FAQ and services content as `.mdx` files in the repo. Next.js reads and renders them at build time. Simple, zero cost, version-controlled. _Downside: still requires a Git commit to update content. Time: ~1 day. Maintenance: very low._
- **Database-Driven Content:** Store tariffs, FAQ, and service features in a PostgreSQL `content` table with a `type` column. Build a simple `/admin/content` CRUD interface. Fully dynamic; updates are instant. _Time: ~3–4 days. Maintenance: medium._
- **JSON Config Files:** Move all `constants.tsx` data into `/content/*.json` files. A non-developer can edit these files directly in GitHub's web UI. Still requires a redeploy but no code knowledge. _Time: ~2 hours. Maintenance: very low._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Sanity.io** | Free (up to 3 users, 100K API requests/mo); Growth from $15/mo | Best-in-class developer experience with Next.js; real-time collaborative editing, structured content, and a visual "Studio" the client can use to update tariffs and FAQ themselves |
| **Contentful** | Free (up to 5 users, 25K records); Basic from $300/mo | Enterprise-grade; excellent for multi-language content — useful if P2P expands beyond Ghana |
| **Notion + Notion API** | Notion: Free; API: Free | Use Notion as a CMS backend — the client edits a Notion page, Next.js fetches via the Notion API at build time. Zero training curve for non-technical clients |

---

## Section 6: Authentication & Admin Access

**Visual Trigger:** The "Get Shipping Address" CTA and the "Request Custom Quote" flow imply that customers should receive their unique UK/US warehouse addresses — this cannot be broadcast publicly. An authenticated customer portal is needed. Internally, staff need a protected admin interface to manage shipments and content.

**Production Reality:** Authentication covers two separate surfaces: (1) customer accounts where registered users can see their dedicated shipping address, track orders, and view history; and (2) an internal admin panel where the P2P team manages shipments, contacts, and pricing.

### Build Approaches (Next.js Native)

- **NextAuth.js (Auth.js v5):** The de-facto standard for Next.js authentication. Supports email/password, Google OAuth, magic links, and more. Middleware-based route protection. Session stored in JWTs or a database adapter. _Time: ~1–2 days. Maintenance: low._
- **Next.js Middleware + JWT:** Implement a lightweight custom auth using `jose` for JWT creation/verification inside Next.js Middleware. No external dependency; tokens stored in `httpOnly` cookies. _Time: ~2–3 days. Maintenance: medium (you own the security implementation)._
- **Role-Based Access Control (RBAC):** Extend whichever auth solution is chosen with a `role` column (`customer | staff | admin`) in the users table. Next.js Middleware checks the role claim in the JWT before allowing access to `/admin/*` routes. _Time: ~1 day (on top of auth). Maintenance: low._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Clerk** | Free (up to 10,000 MAUs); Pro from $25/mo | Easiest Next.js integration — pre-built UI components, multi-session, MFA, and a beautiful admin dashboard; recommended for fastest time-to-market |
| **Supabase Auth** | Free (50,000 MAUs); Pro from $25/mo | If Supabase is already chosen as the database (see Section 7), Auth comes included and is tightly integrated with Row-Level Security |
| **Auth0 (Okta)** | Free (7,500 MAUs, 2 social providers); Essentials from $35/mo | Enterprise-grade with advanced security features; preferred if the business needs compliance reporting or enterprise SSO later |

---

## Section 7: Database

**Visual Trigger:** Every functional feature described in this document — shipment records, contact submissions, customer addresses, tariff data, user accounts, AI conversation history — requires persistent data storage.

**Production Reality:** The prototype has no database whatsoever. Moving to production means choosing a database as the foundational data layer before anything else is built. This decision affects every other integration.

### Build Approaches (Next.js Native)

- **PostgreSQL + Prisma ORM:** Prisma generates a fully type-safe database client from your schema. Works seamlessly with Next.js Server Actions and Route Handlers. Migrations are version-controlled alongside the code. _Recommended for the P2P project. Time: ~1 day to set up schema. Maintenance: low._
- **PostgreSQL + Drizzle ORM:** A newer, lighter alternative to Prisma with a SQL-like query syntax. Faster at runtime, smaller bundle, excellent TypeScript inference. _Time: ~1 day. Maintenance: low._
- **SQLite + Turso (LibSQL):** For a very lean MVP, SQLite running on Turso's edge network is nearly free, globally distributed, and requires zero server management. Works well if data volume is modest. _Time: ~half a day. Maintenance: very low._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Supabase** | Free (500MB DB, 2GB bandwidth); Pro from $25/mo | Postgres + Auth + Storage + Realtime in one dashboard; free tier is genuinely production-capable for an early-stage business — **top recommendation** |
| **Neon** | Free (0.5GB storage, auto-suspend); Launch from $19/mo | Serverless Postgres with branching (create a database branch per PR for testing); best developer experience for a Next.js team |
| **PlanetScale** | Hobby: $39/mo (no free tier after 2024); Scaler from $39/mo | MySQL-compatible, extreme scalability; best reserved for high-traffic scenarios |

---

## Section 8: File & Media Storage

**Visual Trigger:** The prototype uses Unsplash image URLs directly embedded in `Hero.tsx` and `ServicesPage`. In production, the business will need to upload real photography, customer documents (proof of purchase, packing lists), and potentially parcel images.

**Production Reality:** Production apps never rely on third-party image hosting they do not control (Unsplash URLs can break). A proper storage layer is needed for: optimised product/service imagery, customer-uploaded documents, staff-uploaded proof-of-delivery photos, and any future invoices or receipts.

### Build Approaches (Next.js Native)

- **Next.js Image Component + Local `/public` Folder:** For static marketing images (hero, services), store optimised assets in `/public/images`. Next.js's `<Image>` component handles lazy loading, WebP conversion, and responsive srcsets automatically. _Time: ~2 hours. Maintenance: very low._
- **Self-Hosted S3-Compatible Storage (MinIO):** Run a MinIO instance on a VPS for complete control over storage. Integrates with the AWS S3 SDK. _Maintenance: high — you own backups, uptime, and scaling._
- **Presigned Upload URLs:** For customer document uploads, generate short-lived presigned URLs server-side (via any S3-compatible provider) and have the browser upload directly to storage, bypassing the Next.js server entirely. Prevents large file uploads from blocking serverless functions. _Time: ~1 day. Maintenance: low._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Cloudinary** | Free (25GB storage, 25GB bandwidth/mo); Plus from $99/mo | Upload, store, transform, and serve images via CDN with a single SDK; on-the-fly resizing and format conversion — best for marketing imagery |
| **Supabase Storage** | Included in free tier (1GB); scales with plan | If Supabase is the database choice, storage is included and uses the same auth/RLS policies — no additional service needed for an MVP |
| **Vercel Blob** | Pay-as-you-go ($0.023/GB/mo) | Native to the Vercel platform; zero configuration, edge-cached, integrates directly with Next.js Server Actions via the `@vercel/blob` package |

---

## Section 9: Analytics

**Visual Trigger:** Not explicitly shown in the prototype — but strictly required in production. The business needs to know which pages customers visit, where they drop off, which tariff region (UK vs USA) gets the most interest, and how many people start but don't complete the contact form.

**Production Reality:** Without analytics, every product and marketing decision is a guess. Page view data, event tracking (button clicks, form completions, tariff tab switches), traffic sources, and geographic breakdowns are the foundation of data-driven growth.

### Build Approaches (Next.js Native)

- **Vercel Analytics:** Zero-configuration, privacy-friendly Web Vitals and page view tracking included in all Vercel plans. Add `@vercel/analytics` and `<Analytics />` component in the root layout. _Time: ~10 minutes. Maintenance: none._
- **Custom Event Tracking with Server Actions:** Log custom business events (e.g., "User requested UK address", "Quote form submitted") to a `analytics_events` table in your own database. Full data ownership, no third-party tracking. _Time: ~1 day. Maintenance: low._
- **OpenPanel (open-source Plausible alternative):** Self-host an analytics server. GDPR-compliant, no cookie banners required. _Time: ~2–3 hours setup. Maintenance: medium (server upkeep)._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Vercel Analytics** | Free (2,500 events/mo on Hobby); included in Pro | Tightest Next.js integration; no cookie consent needed for basic metrics — **use this from day one** |
| **Plausible Analytics** | From $9/mo (no free tier, but open-source self-host option) | Privacy-first, GDPR-compliant, lightweight (< 1KB script); ideal for a European-facing business handling UK customer data |
| **PostHog** | Free (1M events/mo); Scale from $0 metered | Open-source product analytics platform with session replay, feature flags, and funnel analysis — enterprise power at startup prices |

---

## Section 10: Error Tracking & Observability

**Visual Trigger:** Not explicitly shown — but a hidden critical need. The AI assistant, contact form, and any future order tracking page can all fail silently. Without error monitoring, the team will only know something is broken when a customer complains.

**Production Reality:** Production apps need real-time error alerts, stack traces, user context (which browser, which action preceded the error), and performance monitoring. This is non-negotiable for a business where a broken contact form directly costs leads.

### Build Approaches (Next.js Native)

- **Next.js Error Boundaries + `global-error.tsx`:** Implement the `error.tsx` and `global-error.tsx` Next.js conventions to catch rendering errors and display user-friendly fallback UIs. _Time: ~1 hour. Maintenance: very low._ (This handles display but does not alert the team.)
- **Custom Logging with Axiom / Logtail:** Add structured logging in Server Actions and Route Handlers using the `@axiomhq/next` package. All server-side errors stream to a searchable log dashboard. _Time: ~half a day. Maintenance: low._
- **`winston` or `pino` Logger:** Use a structured Node.js logger in all server-side code, writing logs to stdout. On Vercel, these stream to the Function Logs. _Time: ~half a day. Maintenance: low._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Sentry** | Free (5K errors/mo, 10K performance transactions); Team from $26/mo | Industry standard for full-stack error tracking; Next.js SDK auto-instruments both client and server errors; includes performance monitoring and release tracking — **strongly recommended** |
| **LogRocket** | Free (1,000 sessions/mo); Pro from $69/mo | Combines error tracking with session replay — see exactly what the user did before the error occurred |
| **Highlight.io** | Free (500 sessions/mo, 1K errors/mo); Pay-as-you-go after | Open-source alternative to Sentry + LogRocket combined; one SDK for errors, logs, and session replay |

---

## Section 11: SEO & Performance

**Visual Trigger:** The current prototype is a client-side SPA rendered entirely in the browser. Search engine crawlers cannot index its content reliably, meaning P2P Logistics will not appear in Google results for searches like "ship parcel from UK to Ghana" or "Ghana air freight."

**Production Reality:** Migrating to Next.js App Router with Server-Side Rendering (SSR) or Static Site Generation (SSG) is the single highest-ROI technical decision for a logistics business that depends on organic search traffic. Each page needs proper `<title>`, `<meta description>`, Open Graph tags, and structured data (JSON-LD) for rich search results.

### Build Approaches (Next.js Native)

- **Next.js `generateMetadata` API:** Export `generateMetadata` from each page file in the App Router. Generates per-page `<title>`, `<meta>` tags, and Open Graph images. _Time: ~2 hours across all pages. Maintenance: very low._
- **`next/image` for Core Web Vitals:** Replace all `<img>` tags and Unsplash direct URLs with `next/image`. This alone can dramatically improve Largest Contentful Paint (LCP), a key Google ranking signal. _Time: ~half a day. Maintenance: very low._
- **Structured Data (JSON-LD):** Add `application/ld+json` script tags for `LocalBusiness`, `FAQPage`, and `Service` schema types. Enables Google rich results (FAQ accordions directly in search results). _Time: ~1 day. Maintenance: low._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Google Search Console** | Free | Monitor indexing status, crawl errors, and keyword impressions — **set this up on day one** |
| **Ahrefs Webmaster Tools** | Free (limited); Lite from $129/mo | Backlink analysis, keyword ranking tracking, site audit — essential for competitive SEO strategy |
| **Vercel's Edge Network** | Included in all plans | Global CDN with automatic image optimization and static asset caching; ensures fast load times for users in Ghana, UK, and USA simultaneously |

---

## Section 12: Hosting & CI/CD

**Visual Trigger:** The project already has a `vercel.json` and a GitHub Actions workflow (`.github/workflows/ci.yml`). The CI pipeline runs lint, type-check, and build on every push.

**Production Reality:** The prototype's CI pipeline is a solid starting point. For production, it needs to be extended with automated deployment (CD), environment variable management across staging/production environments, preview deployments for every pull request, and secrets management.

### Build Approaches (Next.js Native)

- **GitHub Actions + Vercel CLI Deploy Step:** Add a `vercel --prod` deploy step to the existing CI workflow, triggered only on merges to `main`. Non-`main` branches auto-deploy as preview URLs. _Time: ~2 hours. Maintenance: very low._
- **Turborepo for Monorepo Caching:** If the project grows to include a separate admin package or mobile app, Turborepo caches build outputs and test results, dramatically speeding up CI pipelines. _Time: ~1 day. Maintenance: low._
- **Docker + Self-Hosted Runner:** For maximum control (e.g., compliance, data residency), containerise the Next.js app with a `Dockerfile` and deploy to a VPS (DigitalOcean, Hetzner) via Docker Compose or Kubernetes. _Time: ~1–2 days. Maintenance: high._

### SaaS / Third-Party Options

| Tool | Tier | Best For |
|---|---|---|
| **Vercel** | Hobby: Free; Pro: $20/seat/mo | Best-in-class Next.js hosting; zero configuration, automatic preview deployments, Edge Functions, and Vercel Analytics all in one — **keep this as the deployment platform** |
| **Netlify** | Free tier; Pro from $19/mo | Strong alternative if Vercel pricing becomes a concern; excellent form handling that could replace Section 1's backend |
| **Railway** | Free trial; Starter from $5/mo | Ideal for hosting companion services (PostgreSQL database, Redis, background workers) alongside the Vercel-hosted Next.js app |

---

## Phase 1: Recommended Foundation Stack

This is the exact combination recommended to get P2P Logistics live as a fully functional MVP — quickly, cost-effectively, and with a clear path to scale.

### Core Principle: Maximize the Free Tier, Minimize Services

| Category | Tool | Cost |
|---|---|---|
| **Framework** | Next.js 15 (App Router, TypeScript) | Free |
| **Hosting & CD** | Vercel (Pro plan when team > 1) | Free → $20/seat |
| **Database** | Supabase (PostgreSQL + Auth + Storage) | Free tier |
| **Authentication** | Supabase Auth (built-in to Supabase) | Free tier |
| **Transactional Email** | Resend + React Email | Free (3K/mo) |
| **Contact Form** | Next.js Server Action → Resend + Supabase | Free |
| **AI Assistant** | Vercel AI SDK → Google Gemini 2.0 Flash (server-side) | Free / Pay-as-you-go |
| **File Storage** | Supabase Storage | Free (1GB) |
| **Analytics** | Vercel Analytics + Google Search Console | Free |
| **Error Tracking** | Sentry (free tier) | Free (5K errors/mo) |
| **SEO** | Next.js `generateMetadata` + JSON-LD | Free |

**Estimated total monthly cost at launch: £0–£20/month**

---

### Phase 1 Migration Summary: What to Build First

1. **Migrate from Vite SPA → Next.js App Router.** Re-use all existing Tailwind styles and components with minimal changes. Replace the `useState` view-switcher with Next.js file-based routing (`/`, `/services`, `/tariffs`, `/how-it-works`, `/contact`). Implement `generateMetadata` for each route immediately — this is free SEO value from day one.

2. **Secure the AI Assistant.** Move the `GoogleGenAI` call from the browser into a Next.js Route Handler (`/api/chat`). Add IP-based rate limiting with Upstash Redis. Upgrade the model to `gemini-2.0-flash`. This is a **security critical** step — do it before launch.

3. **Activate the Contact Form.** Wire the existing form to a Server Action using `react-hook-form` + Zod for validation. On submission: (a) save the lead to Supabase, (b) send a notification email to the P2P team via Resend, (c) send a confirmation email to the customer. The `ShippingStatus` enum already in `types.ts` is ready to power the loading/success/error states.

4. **Set up Error Tracking and Analytics.** Install Sentry and Vercel Analytics. These take under 30 minutes to configure and will immediately begin collecting data that informs every subsequent product decision.

5. **Replace Hardcoded Tariffs with Database-Driven Content.** Store UK and USA tariff tables in Supabase. Build a minimal password-protected `/admin/tariffs` page so the P2P team can update pricing independently without requiring a deployment.

---

### What Phase 2 Unlocks (Post-MVP)

Once the Phase 1 foundation is live and validated, these capabilities become natural next steps:

- **Customer Portal:** Authenticated `/dashboard` where registered customers log in, see their dedicated UK/US warehouse address, and view shipment history.
- **Shipment Tracking:** A `/track/[id]` page with real-time status updates, QR code emails, and push notifications.
- **CMS for FAQ & Services:** Connect Sanity.io to allow the client to manage FAQ items, services content, and marketing copy without developer involvement.
- **Shopping Concierge Flow:** An end-to-end "shop on my behalf" request form with order management, invoicing, and payment collection.
- **Payments:** Stripe integration for online payment of shipping invoices and customs fees — only needed once the customer portal exists.

---

*Document prepared by AI Technical Assistant — February 2026. Review with your development team before finalising technology commitments.*
