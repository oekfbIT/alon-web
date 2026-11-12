# Projects

## ÖKFB federation platform (live)
**Problem:** much of the federation ran on forms, emails, spreadsheets and phone calls.
**What I built:** five applications on one Swift/Vapor 4 + MongoDB API.
- Public website: league selection across regions, fixtures, live scores, tables, scorer and card leaderboards, team/player pages, match reports, AI previews, news, transfers, suspensions, sponsors, search.
- Admin dashboard: users and granular permissions, leagues, seasons, fixtures, stadiums, referee assignments, team applications, discipline, transfers, fees, content, email templates, push notifications, analytics.
- Team portal: squad and player registration, trainers, photos, matches, contracts and finances, transfers, inbox to the office.
- Referee portal: assigned matches, match sheets, live match control, goals and cards, corrections, match report.
- Mobile app (iOS and Android): live ticker, push notifications, statistics, team management, office area.

**Match day (referee workflow):** state machine Assigned → Match sheet → Kick-off → Half-time → Second half → Full time → Report → Complete, with correction paths: delete wrong events, adjust score, own goals, yellow/red/yellow-red cards with minute, abandoned matches, no-shows, reset states, kit selection. Results flow straight into scores, tables, leaderboards and suspensions; nobody re-types them.

**Team onboarding:** Application → Email verified → Documents → Review → League assigned → Payment → Team created. Welcome email with contract downloads and protected upload link; partial submissions allowed but no league assignment until ID documents and signed contracts are complete. Failed emails visible and resendable; signed, expiring email links for registrations, transfers and postponements (act without login).

**Payments:** every team has an account balance. Stripe Checkout and PaymentIntents with signed webhooks; credit only after Stripe confirms. Idempotency keys and durable receipts prevent double credits/debits (e.g. retried postponement approvals). Payment, accounting and email tracked as separate steps; interrupted processing resumes from persisted jobs. Fees configured centrally and versioned; every financial action stores the fee version it used. Automatic invoices and confirmation emails.

**Analytics:** native Swift importer for GA4 reporting and realtime APIs; hourly snapshots imported once across replicas via shared leases; correct period totals instead of summed daily users; caching and coalescing of concurrent requests; visible freshness, empty and failure states.

**Architecture:** Swift, Vapor 4, Fluent, MongoDB, Swift concurrency, OpenAPI. React 18, TypeScript/JavaScript, Redux, React Router, Ant Design, Material UI, Storybook. Stripe, Firebase Storage, Firebase Cloud Messaging, Expo push, SMTP, GA4. Vapor Queues, scheduled jobs, persisted jobs with distributed leases. Docker, Docker Compose, DigitalOcean, XCTest/XCTVapor, Jest, React Testing Library.
**Safeguards:** granular admin permissions, team ownership checks, signed expiring links, upload signature and size checks, idempotency keys, stale-write protection, database migrations and indexes, mocked external services in tests.

**Outcome:** 80%+ of routine admin automated; ~200 clubs and 8,000 players registered, transferred, scheduled, scored and invoiced through one platform. Documented and process-driven, so it keeps running whether or not I'm in the room.
**Lesson:** "Every shortcut eventually turns into a Sunday-morning phone call, so I design for the unglamorous parts first: correct data, idempotent money, recoverable jobs and documentation someone else can follow."

## THATSIT! vision card matching (shipped)
- Marketplace (co-founded) with 400,000+ cards and 2 million listings, launching December 2026.
- Problem: every listing must link to the right card; sellers searching hundreds of thousands of near-identical cards by hand is slow and error-prone.
- Architecture: React Native app → Swift backend → Python matching service (FastAPI, PyTorch, Transformers) → DINOv2 embeddings → Qdrant vector search; containerised.
- Decisions: search instead of classify (closer to search at this scale); pre-trained DINOv2 instead of training from scratch; dedicated vector DB; separate Python service behind FastAPI so the rest of the platform uses it like any API; running costs tracked as part of the product.
- Lesson: the interesting problems in applied AI are often not about the model, but data, interfaces, cost and how the system behaves when the model isn't sure.

## AI match analysis (in progress)
- Veo-like analysis as software: from any recording or live stream to match data, for our league.
- Training data: Label Studio, six classes (player, goalkeeper, referee, ball, goal, blank); a full match is close to 100,000 frames; ball is the hardest class (small, fast, often hidden); referee is its own class so officials never count as players.
- Pipeline: recording/stream → frame sampling → YOLOv8 detection → tracking → pitch positions → events → player identity → clips and stats.
- In place: Label Studio project, YOLOv8 connected to my backend, MCP server with a vision stream model.
- In progress: shot and event detection, tracking and pitch positions, identity from preloaded squads (jersey numbers).
- Next: automatic clips and per-player stats published next to live scores and previews.
- Approach: identity as matching against known players, not open-ended face recognition; specialised models for frame-level work, a general vision model via MCP for context and judgement; works with ordinary cameras.

## Hotel self-check-in, Bridge Development (shipped 2025)
- 200-room hotel; goal: take work off the front desk and modernise IT without disrupting a running hotel.
- Approach: start at the front desk (analyse real check-in first), buy-integrate-then-build (select partners, integrate into existing landscape), decisions on paper (pitches, architectures, decision papers with technical and commercial risks).
- Server migration and infrastructure work alongside new workflows. Self-service for guests who want it.
- Outcome: live with mobile self-check-in, ~30% less front-desk effort.
- Lesson: in an operation that never closes, half the work is getting management, staff and partners to agree what changes, when, and who owns it afterwards.

## adesso release pipeline (shipped)
- Reproducible cloned Kubernetes environments, automated path to production with Jenkins and GitHub workflows, quality as a gate (reviews, 70%+ coverage).
- Deployment time more than halved; 28 releases, 4 major.
- Lesson: delivery is mostly the bridge between users and team; a clear specification saves more time than any pipeline.

## Other things I've built
- AI match previews & reviews (live) — see ai.md
- Generated kit images (live): jersey upload → standardised home/away kit illustration, transparent PNG validated, preview before saving
- GA4 analytics importer (live)
- Losleben iOS app (shipped, ~30,000 users)
- Product scanner app at Bergner (shipped)
- Goodfield (in progress): all-in-one platform for padel, tennis and other sports clubs: branded public booking site plus back office for bookings, events, finance and teams; a club runs its own branded platform instead of renting space on a marketplace
- AI judge for card games (exploring): iPhone camera follows a trading card game, an agent checks plays, keeps score and talks to players
- This portfolio's "Ask me" chat: BM25 retrieval over a knowledge base, model answers only from retrieved passages, with sources
