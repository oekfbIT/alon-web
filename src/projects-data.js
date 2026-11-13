/* =========================================================
   Things I've built
   Edit the data below to add, remove or reorder projects.
   status: 'Live' | 'In progress' | 'Shipped' | 'Exploring'
   link: a case study (/work/...) or a live site; external links open in a new tab.
   org: the role it was built in (an id from roles.js), or null for an own project.
   image: a preview image. Without one, the card looks for /work/projects/<slug>.webp
   (slug = title in lowercase with dashes, e.g. referee-match-portal.webp) and shows a placeholder until it exists.
   Each role page in /experience/ lists its projects automatically.
   ========================================================= */
export const categories = {
  ai: { label: 'AI & ML', color: '#6b5fc7' },
  full: { label: 'Full-Stack', color: '#4f6bd8' },
  backend: { label: 'Backend & Data', color: '#c2410c' },
  mobile: { label: 'Mobile', color: '#a3489b' },
  delivery: { label: 'Delivery & Infra', color: '#64748b' },
};

export const projects = [
  {
    cat: 'ai', status: 'In progress', title: 'AI Match Analysis', image: '/work/vision/frame.webp', org: 'oekfb',
    text: 'Takes a match recording or live stream and finds shots and key events, tracks where players move and identifies who they are from preloaded squads. YOLOv8 trained on my own Label Studio data, connected to my backend, with an MCP-connected vision model.',
    tech: ['YOLOv8', 'Label Studio', 'Python', 'MCP', 'Vision model', 'Video streams', 'Tracking'],
    when: 'ÖKFB · 2026', link: '/work/match-vision.html', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'In progress', title: 'AI Judge for Card Games', image: '/work/projects/ai-judge-for-card-games.webp', org: null,
    text: 'An iPhone camera follows a trading card game, an AI agent checks whether plays are legal, keeps score and talks to the players.',
    tech: ['Vision AI', 'Real-time video', 'Voice', 'Agents', 'iOS'],
    about: ["A judge for trading card games, starting with Yu-Gi-Oh!. An iPhone on a tripod films the table from above, and an AI follows the duel the way a human judge would: what was played, what attacked and what that did to the life points.", "A screen next to the table shows both players' life points, updated as the game happens, together with a duel log of every summon, set card, attack and effect. A vision model reads the cards on the mat and the system keeps the game state in order, so the numbers on screen come from what actually happened.", "Players can also just talk to it. Ask whether a play is allowed and the judge answers by voice with a ruling and the rule behind it. It is a personal project in progress; the preview shows a concept with invented cards and sample data."],
    stepsTitle: 'How a duel runs',
    steps: [["Watch", "The phone on the tripod films the mat from above and the vision model finds cards, zones and their positions."], ["Track", "Every summon, set card, attack and graveyard move goes into the duel log, and the life points update on screen."], ["Check", "Each play is checked against the rules, for example one Normal Summon per turn, and marked as legal or not."], ["Rule", "Players ask by voice and get a spoken ruling with the reason, plus a note in the log."]],
    details: ["Designing the camera setup: one iPhone on a tripod, no special mat or sensors.", "Detecting cards, zones and face-up or face-down state with a vision model.", "Keeping a game state and duel log, so life points and rulings come from tracked events.", "Adding voice, so players can ask the judge questions in the middle of a duel."],
    when: 'Personal project', link: '/projects/ai-judge-for-card-games.html', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'Live', title: 'AI Match Previews & Reviews', image: '/work/oekfb/oekfb-preview.webp', org: 'oekfb',
    text: 'German match previews and matchday reviews on oekfb.eu. The backend computes the football facts; the model only chooses which verified facts to use, and the backend writes the article.',
    tech: ['Swift', 'Vapor', 'JSON Schema outputs', 'OpenAI-compatible API', 'MongoDB', 'Durable jobs'],
    about: ["Every week the federation used to publish a weekly report (Wochenbericht) covering all games played. Writing it by hand took two to three days, and there was no head-to-head information for upcoming matches.", "Now previews before every match and a review of each matchday are generated in German on oekfb.eu. They bring players and teams back to the site with what they care about: table placements, top scorers, head-to-head records and the key games of the round.", "Football fans notice a wrong number immediately, so the model never invents facts. The backend computes them, the model only chooses which verified facts to use, and the backend writes the article."],
    steps: [["Compute", "The backend calculates form, table position, head-to-head, scorers, discipline and confirmed absences, with a historical cutoff so a preview never uses results from after the match."], ["Choose", "Through strict JSON Schema outputs, the model selects and orders verified facts and title candidates."], ["Write", "The backend renders the article from those choices instead of publishing free text."], ["Review", "Admins review, edit, publish or delete each article."], ["Publish", "Previews go live before each match and a matchday review follows on oekfb.eu."]],
    details: ["Replaced a 2–3 day manual weekly report with automatic generation.", "Computed football facts: form, table position, head-to-head, top scorers, discipline and absences.", "Strict JSON Schema outputs so the model selects facts and the backend writes the text.", "Persistent background jobs with bounded concurrency, retries with backoff and idempotency keys.", "Every article records its source snapshot, model, prompt version, selected facts and token usage.", "Provider-independent: an OpenAI-compatible adapter behind an interface."],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#ai', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'Shipped', title: 'Vision AI Card Matching', image: '/work/projects/vision-ai-card-matching.webp', org: 'thatsit',
    live: 'https://api.thatsit.cards/scanner', livePassword: '1nvit3-0nly',
    text: 'Matches each of 2 million marketplace listings to the right card out of 400,000, using DINOv2 image embeddings and Qdrant vector search behind a FastAPI service.',
    tech: ['Python', 'FastAPI', 'PyTorch', 'DINOv2', 'Qdrant', 'Docker'],
    when: 'THATSIT! · Nov 2025 – Present', link: '/work/thatsit-vision-matching.html', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'Live', title: 'Generated Kit Images', image: '/work/projects/generated-kit-images.webp', org: 'oekfb',
    text: 'Turns an uploaded jersey into a standardised home or away kit illustration, validates the transparent PNG and shows a preview before it is saved.',
    tech: ['Image generation', 'PNG validation', 'Firebase Storage', 'React', 'Swift'],
    about: ["Every club uploads its own jersey, and every upload looks different: other angles, backgrounds and sizes. To show kits uniformly in the app and on the website, this feature takes over the club’s own design and turns it into a standardised home or away kit illustration.", "Admins upload the jersey in the dashboard, check a preview of the generated kit and only then save it."],
    steps: [["Upload", "An admin uploads a club’s jersey in the dashboard."], ["Generate", "The jersey and a layout reference go into the image generation as inputs, and the kit illustration comes back."], ["Validate", "The transparent PNG is checked: structure, CRCs, visible pixels and transparent edges."], ["Preview", "The admin sees the result before anything is saved."], ["Save", "The kit is stored in Firebase Storage, and stale saves are rejected."]],
    details: ["Reference-guided image generation that keeps the club’s own jersey design.", "PNG validation before anything is stored, so broken images never reach the app or website.", "Preview step in the React admin dashboard, with storage in Firebase and protection against stale saves.", "Swift/Vapor backend endpoints behind the dashboard."],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#ai', linkLabel: 'Details',
  },
  {
    cat: 'full', status: 'Live', title: 'Football League Website', image: '/work/projects/football-league-website.webp', org: 'oekfb',
    text: 'Public site for leagues across Austria: fixtures, live scores, tables, leaderboards, team and player pages, AI previews, transfers, suspensions and search.',
    tech: ['React 18', 'TypeScript', 'Parcel', 'Storybook', 'Swift', 'Vapor'],
    when: 'ÖKFB · Since Nov 2023', link: 'https://www.oekfb.eu/', linkLabel: 'Live site',
    about: ["The public website and app of the Austrian Small-Field Football Federation, where fans, players and clubs follow around 200 clubs and up to 10,000 registered players across Austria's regional leagues.", "Visitors pick a region and a league and land on everything around it: fixtures by season and matchday, league tables, live scores, team and player pages, player statistics, news, transfers, suspensions and disciplinary decisions, with search across players and teams.", "The site has no separate editorial workflow for results. Referees record goals and cards in the referee app during the match, the backend saves every event, and scores and tables update live on the homepage and in the app. Before each matchday, AI-written match previews and reviews are generated from the league's own verified data.", "Under the hood it is a React and TypeScript front end on top of the same Swift and Vapor backend that powers the admin dashboard, the team app and the referee app, so every part of the federation works from one source of truth."],
    header: '/work/projects/football-league-website-header.webp',
    headerAlt: 'League table and fixtures on the website, and live fixtures in the mobile app',
    steps: [["Fixtures", "Every match by season and matchday, with kick-off time, venue and a link to its preview."], ["Live scores", "Results update during the game, straight from the referee app."], ["Tables and stats", "League tables, top scorers and player statistics, calculated automatically."], ["Teams and players", "Squad pages, player profiles, transfers and suspensions."], ["AI previews and reviews", "Generated match previews and matchday reports in German, based on verified data."]],
    stepsTitle: 'What fans can follow',
    gallery: [{"src": "/work/oekfb/web-home.webp", "cap": "Homepage with region and league selector", "kind": "wide"}, {"src": "/work/oekfb/web-fixtures.webp", "cap": "Fixtures by season and matchday", "kind": "wide"}, {"src": "/work/oekfb/web-table.webp", "cap": "League table", "kind": "wide"}, {"src": "/work/oekfb/oekfb-preview.webp", "cap": "AI match preview", "kind": "wide"}, {"src": "/work/oekfb/app-leagues.webp", "cap": "App: leagues", "kind": "phone"}, {"src": "/work/oekfb/app-fixtures.webp", "cap": "App: fixtures", "kind": "phone"}, {"src": "/work/oekfb/app-table.webp", "cap": "App: table", "kind": "phone"}, {"src": "/work/oekfb/app-team.webp", "cap": "App: team page", "kind": "phone"}],
  },
  {
    cat: 'full', status: 'Live', title: 'Referee Match Portal', image: '/work/projects/referee-match-portal.webp', org: 'oekfb',
    text: 'Referees run matches from their phone: match sheets, kick-off to full time, goals and cards, corrections, no-shows and the match report.',
    tech: ['React', 'Material UI', 'Swift', 'Vapor', 'MongoDB'],
    when: 'ÖKFB · Since Nov 2023', link: '/work/oekfb-federation-platform.html#matchday', linkLabel: 'Details',
    header: "/work/projects/referee-match-portal-header.webp",
    headerAlt: "The referee app before kick-off and during the first half",
    about: ["The referee app replaces the paper match sheet. Administrators assign referees to games in the admin dashboard, and the referee runs the match on the spot from their phone.", "Everything recorded during the game goes straight to the backend, so nobody writes results down and types them in again later. The same data drives the live score on the federation homepage."],
    steps: [["Assign", "The administrator assigns referees to specific games."], ["Notify", "The referee gets a notification for the match."], ["Run the match", "On the pitch, the referee starts the game, runs the halves and records goals and yellow, red and yellow-red cards."], ["Save", "Match information and events are saved to the backend as they happen."], ["Live score", "Fans follow the score live on the homepage."]],
    gallery: [{"src": "/work/projects/gallery/ref-pregame.webp", "cap": "Before kick-off: teams, kits, venue, date and coaches, with start and cancel buttons", "kind": "phone"}, {"src": "/work/projects/gallery/ref-live.webp", "cap": "First half running: match timer and one-tap events for cards and goals", "kind": "phone"}],
  },
  {
    cat: 'full', status: 'Live', title: 'Team Self-Service Portal', image: '/work/projects/team-self-service-portal.webp', org: 'oekfb',
    text: 'Teams manage their squad, register players and trainers, upload photos, follow contracts and finances, request transfers and message the office.',
    tech: ['React', 'Material UI', 'Redux', 'Firebase', 'Swift', 'Vapor'],
    when: 'ÖKFB · Since Nov 2023', link: 'https://team.oekfb.eu/', linkLabel: 'Live site',
    header: "/work/projects/team-self-service-portal-header.webp",
    headerAlt: "Lineup, match detail, player registration and finances in the team app",
    about: ["The team app is each club's own office. Team managers handle their squad, matches and finances themselves instead of emailing the federation.", "Lineups are submitted ahead of each match, so only authorised players can go onto the pitch."],
    steps: [["Lineup", "Teams build their own lineup from their available players and submit it ahead of time."], ["Match day", "They see the kits, venue and weather conditions, and can postpone or cancel a game within the league limits."], ["Players and staff", "They register new players, update player details and photos, and upload trainer information."], ["Office", "They follow their balance and invoices, chat with the federation and look up the league rules."]],
    stepsTitle: "What teams do in the app",
    gallery: [{"src": "/work/projects/gallery/team-home.webp", "cap": "Team home: team management, office and transfer market", "kind": "phone"}, {"src": "/work/projects/gallery/team-lineup.webp", "cap": "Lineup: add players from the available squad before the match", "kind": "phone"}, {"src": "/work/projects/gallery/team-match.webp", "cap": "Match detail: kits, postpone or cancel, weather and venue", "kind": "phone"}, {"src": "/work/projects/gallery/team-register.webp", "cap": "Register a new player; the fee is charged to the team account", "kind": "phone"}, {"src": "/work/projects/gallery/team-player.webp", "cap": "Edit a player's photo, email and shirt number", "kind": "phone"}, {"src": "/work/projects/gallery/team-trainer.webp", "cap": "Edit trainer name, photo and email", "kind": "phone"}, {"src": "/work/projects/gallery/team-finances.webp", "cap": "Finances: team balance and invoices", "kind": "phone"}, {"src": "/work/projects/gallery/team-office.webp", "cap": "Office: finances, chat with the federation and league rules", "kind": "phone"}],
  },
  {
    cat: 'full', status: 'Live', title: 'Federation Admin Dashboard', image: '/work/projects/federation-admin-dashboard.webp', org: 'oekfb',
    text: 'Leagues, seasons, fixtures, referees, team applications, discipline, transfers, fees, content, email templates, push notifications and analytics.',
    tech: ['React', 'Ant Design', 'Redux', 'React Quill', 'ApexCharts', 'Swift'],
    when: 'ÖKFB · Since Nov 2023', link: '/work/oekfb-federation-platform.html#platform', linkLabel: 'Details',
    header: "/work/projects/federation-admin-dashboard-header.webp",
    headerAlt: "The admin dashboard home with all areas of league operations",
    about: ["The control centre for the whole league. Federation staff run every part of league operations from one place, with a global search across players, teams, referees and leagues.", "What used to be spreadsheets, emails and paper forms is now a set of screens that feed the team app, the referee app and the public website."],
    steps: [["Leagues and fixtures", "Create leagues, seasons and matchdays, manage stadiums and handle reschedule requests."], ["Referees", "Manage referees and assign them to games."], ["Teams and players", "Manage teams and logins, approve player eligibility and run transfers."], ["Registrations and discipline", "Review new team registrations and manage disciplinary cases."], ["Finance and messages", "Set fees, create invoices and answer teams in the shared inbox."], ["Content and notifications", "Edit homepage content, email templates and push notifications."]],
    stepsTitle: "What admins control",
    gallery: [{"src": "/work/projects/gallery/admin-home.webp", "cap": "Dashboard: every area of league operations, with global search", "kind": "wide"}, {"src": "/work/oekfb/admin-matchday.webp", "cap": "Matchday planning: dates, times, venues and referees for every game", "kind": "wide"}, {"src": "/work/oekfb/admin-seasons.webp", "cap": "League detail: seasons and matchdays", "kind": "wide"}, {"src": "/work/oekfb/admin-players.webp", "cap": "Player eligibility: approve or reject new players", "kind": "wide"}, {"src": "/work/oekfb/admin-invoice.webp", "cap": "Create invoices for teams", "kind": "wide"}, {"src": "/work/oekfb/admin-inbox.webp", "cap": "Inbox: conversations with teams by topic and status", "kind": "wide"}],
  },

  {
    cat: 'backend', status: 'Live', title: 'Payments & Team Onboarding', image: '/work/projects/payments-and-team-onboarding.webp', org: 'oekfb',
    text: 'Document-based team registration and Stripe payments with verified webhooks, idempotent credits, versioned fees, invoices and recovery after interruptions.',
    tech: ['Swift', 'Vapor', 'Stripe', 'Webhooks', 'Vapor Queues', 'SMTP'],
    about: ["Registering a new team used to mean the federation office processing every application by hand: emails, paper contracts, payment checks and data entry. Now the whole path from application to a live team account runs automatically, and an admin only verifies the submitted information.", "That saves more than two weeks of work per registration. Payments run through Stripe, and every step is designed for retries, interruptions and duplicates, so money and data stay correct."],
    stepsTitle: "From application to live team",
    steps: [["Apply", "The team applies and receives a welcome email with contract downloads and a protected upload link."], ["Verify email", "A signed, expiring email link confirms the applicant’s address."], ["Upload documents", "ID documents and signed contracts are uploaded. Partial submissions are allowed, but the set must be complete before the next step."], ["Review", "An admin verifies the information instead of processing it by hand."], ["Pay", "The fee is paid through Stripe. The balance is credited only after Stripe confirms the payment."], ["Go live", "The team is assigned to a league and created. The invoice and confirmation email are generated automatically."]],
    details: ["Document-based registration workflow with a protected upload link and required-document checks.", "Stripe Checkout and PaymentIntents with signed webhooks, so only verified payments are credited.", "Idempotency keys and durable receipts against double credits and debits.", "Versioned fees: every financial action stores the fee version it used.", "Automatic invoices and confirmation emails, with an invoice history per team.", "Background jobs on Vapor Queues that resume interrupted payment, accounting and email processing."],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#payments', linkLabel: 'Details',
  },

  {
    cat: 'delivery', status: 'Shipped', title: 'Release Pipeline Rebuild', image: '/work/projects/release-pipeline-rebuild.webp', org: 'adesso',
    text: 'Rebuilt CI/CD with Jenkins, GitHub workflows and cloned Kubernetes environments, halving deployment time across 28 releases.',
    tech: ['Jenkins', 'GitHub workflows', 'Kubernetes', 'Docker', 'Testing'],
    when: 'adesso · 2022 – 2023', link: '/work/adesso-release-pipeline.html', linkLabel: 'Details',
  },
  {
    cat: 'delivery', status: 'Shipped', title: 'Hotel Self-Check-in', image: '/work/projects/hotel-self-check-in.webp', org: 'bridge',
    text: 'Mobile self-check-in and an IT modernisation for a 200-room hotel, from front-desk analysis to go-live, with around 30% less front-desk effort.',
    tech: ['Self-service flows', 'Server migration', 'Vendor integration'],
    when: 'Bridge · 2025', link: '/work/bridge-hotel-self-checkin.html', linkLabel: 'Details',
  },
  {
    cat: 'mobile', status: 'Shipped', title: 'Onfido ID Verification', image: '/work/projects/onfido-id-verification.webp', org: 'twinformatics',
    text: 'Identity verification in the Losleben iOS app with the Onfido SDK: customers scan an ID document and take a selfie, and are verified before onboarding.',
    tech: ['Swift', 'iOS', 'Onfido SDK', 'Identity verification', 'REST APIs'],
    about: ["Before customers can use the Losleben app, they need to prove who they are. I implemented the identity check with the Onfido SDK: the customer scans an ID document and takes a selfie, and is verified before they get in.", "The verified identity does two jobs: it authenticates users for access to the app, and it secures issuing insurance claims, so only the real policyholder can file them."],
    steps: [["Scan the ID", "The customer photographs their ID document in the app."], ["Take a selfie", "A selfie is compared with the photo on the document."], ["Verify", "Onfido checks the document and the match and returns the result to the app."], ["Get access", "A verified customer gets into the app and can issue claims."]],
    details: ["Integrated the Onfido SDK into the native iOS app in Swift.", "Connected the verification result to the backend through REST APIs.", "Tested the flow and shipped it with the app’s regular releases."],
    when: 'twinformatics · 2020 – 2022', link: '/projects/onfido-id-verification.html', linkLabel: 'Details',
  },
  {
    cat: 'mobile', status: 'Shipped', title: 'Losleben iOS App', image: '/work/projects/losleben-ios-app.webp', org: 'twinformatics',
    live: 'https://apps.apple.com/cl/app/losleben-wiener-st%C3%A4dtische/id1466776300',
    stores: [
      { store: 'apple', label: 'App Store', sub: 'Download on the', href: 'https://apps.apple.com/cl/app/losleben-wiener-st%C3%A4dtische/id1466776300' },
      { store: 'google', label: 'Google Play', sub: 'Get it on', href: 'https://play.google.com/store/apps/details?id=com.vig.kvApp&hl=en' },
    ],
    text: 'Native iOS app of the Vienna Insurance Group with around 30,000 users: features, testing, CI/CD and App Store releases.',
    tech: ['Swift', 'iOS', 'Fastlane', 'CI/CD', 'Scrum'],
    about: ["losleben is the customer app of Wiener Städtische, part of the Vienna Insurance Group. Customers keep their policies and documents in one place, file claims and submit invoices from their phone with photos and uploads, and follow the status of every submission through push notifications.", "I was part of the app team at twinformatics, the IT company of the Vienna Insurance Group, from 2020 to 2022, working mainly on the iOS app. It is used by around 30,000 customers."],
    details: ["Developed, tested and released iOS features in a Scrum team, from ticket to App Store.", "Implemented identity verification with Onfido, so customers can register with an ID document and a selfie.", "Built the in-app car insurance check (Kfz-Versicherungscheck).", "Set up and maintained the iOS CI/CD pipeline with Fastlane and the App Store account.", "Handled support tickets and prioritised incoming issues with product stakeholders.", "Mentored junior developers and apprentices in iOS development."],
    when: 'twinformatics · 2020 – 2022', link: '/experience/twinformatics.html', linkLabel: 'Details',
  },
  {
    cat: 'mobile', status: 'Shipped', title: 'Product Scanner App', image: '/work/projects/product-scanner-app.webp', org: 'bergner',
    text: 'Scanner app for capturing products on site, part of a CMS and management system rollout across 12 locations worldwide.',
    tech: ['Barcode scanning', 'Inventory', 'Workflow automation'],
    about: ["A barcode scanner app for the sales team at Bergner, an international housewares group. Salespeople used it in customer meetings and in showrooms: scan a product to look up its information or create an offer on the spot.", "It was part of rolling out a central CMS and management system across 12 locations in Europe and Asia. I was on the transition team, replacing Excel processes with automated workflows and gathering requirements from the international business teams."],
    details: ["Built the scanner app for capturing and looking up products on site.", "Delivered barcode and inventory solutions around it.", "Started from how each sales team actually worked before deciding what to automate.", "Rolled it out with the central system to 12 locations worldwide."],
    when: 'Bergner Group · 2012 – 2019', link: '/experience/bergner.html', linkLabel: 'Details',
  },
];

/* Every project has its own page.
   - A project whose link is a full case study (/work/<name>.html) uses that page.
   - Every other project gets /projects/<slug>.html, generated by scripts/build-projects.mjs.
   Optional fields per project for its page: live (URL to try it), details (array of bullet points). */
export const projectSlug = (p) => p.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const isCaseStudy = (p) => /^\/work\/[^#]+\.html$/.test(p.link);
export const projectUrl = (p) => (isCaseStudy(p) ? p.link : `/projects/${projectSlug(p)}.html`);
