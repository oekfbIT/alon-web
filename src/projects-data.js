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
    cat: 'ai', status: 'Live', title: 'AI Match Previews & Reviews', image: '/work/oekfb/oekfb-preview.webp', org: 'oekfb',
    text: 'German match previews and matchday reviews on oekfb.eu. The backend computes the football facts; the model only chooses which verified facts to use, and the backend writes the article.',
    tech: ['Swift', 'Vapor', 'JSON Schema outputs', 'OpenAI-compatible API', 'MongoDB', 'Durable jobs'],
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
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#ai', linkLabel: 'Details',
  },
  {
    cat: 'ai', status: 'In progress', title: 'AI Judge for Card Games', org: null,
    text: 'An iPhone camera follows a trading card game, an AI agent checks whether plays are legal, keeps score and talks to the players.',
    tech: ['Vision AI', 'Real-time video', 'Voice', 'Agents', 'iOS'],
    when: 'Personal project', link: '/index.html#resume', linkLabel: 'More',
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
    when: 'twinformatics · 2020 – 2022', link: '/experience/twinformatics.html', linkLabel: 'Details',
  },
  {
    cat: 'mobile', status: 'Shipped', title: 'Product Scanner App', image: '/work/projects/product-scanner-app.webp', org: 'bergner',
    text: 'Scanner app for capturing products on site, part of a CMS and management system rollout across 12 locations worldwide.',
    tech: ['Barcode scanning', 'Inventory', 'Workflow automation'],
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
