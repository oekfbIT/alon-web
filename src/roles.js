/* =========================================================
   Experience: one entry per position, newest first.
   This file drives:
   - the role pages in /experience/<id>.html (run `npm run roles`;
     it also runs automatically before `npm run dev` and `npm run build`)
   - the logo + "role" links on project cards and case studies.
   Projects are attached via `org` in projects-data.js;
   case studies via `caseStudies` below.
   Logos live in /public/logos/<id>.png (a letter tile is shown if missing).
   ========================================================= */
export const roles = [
  {
    id: 'thatsit', short: 'THATSIT!', org: 'THATSIT!', mono: 'T',
    title: 'Co-founder · Technical Product Lead', dates: 'Nov 2025 – Present', type: 'Founder',
    summary: 'Collector marketplace with over 400,000 cards and 2 million listings. The web marketplace runs at thatsit.cards; the app launches in mid-December 2026.',
    did: [
      'Built AI card matching in Python with FastAPI, PyTorch and Transformers: DINOv2 image embeddings and Qdrant vector search link each listing to the right card.',
      'Run it as containerised services next to a React Native app and a Swift backend.',
      'Own product vision, roadmap and launch plan; lead sprint planning and retrospectives.',
      'Keep the budget in check, including the running costs of AI tools, cloud services and infrastructure.',
    ],
    learned: 'The interesting problems in applied AI are often not about the model. They are about data, interfaces, cost and how the rest of the system behaves when the model isn’t sure.',
    tags: ['Python', 'FastAPI', 'PyTorch', 'DINOv2', 'Qdrant', 'Docker', 'React Native', 'Swift'],
    links: [{ label: 'thatsit.cards', href: 'https://thatsit.cards/' }],
    demo: { title: 'Try the card scanner', text: 'Upload or photograph a card and see the match.', href: 'https://api.thatsit.cards/scanner', password: '1nvit3-0nly' },
    // Optional extras, shown only on this role page.
    showcase: {
      intro: 'Buy, sell and swap trading and sports cards in one place: Pokémon, One Piece, Magic, Yu-Gi-Oh!, sports cards and more, graded or raw, with protected payments. Card-for-card swaps carry no commission.',
      web: [
        { label: 'Home', src: '/work/thatsit/web-home.webp', alt: 'The thatsit.cards homepage: “The vault is open.” with a card search and a fan of graded cards' },
        { label: 'Marketplace', src: '/work/thatsit/web-market.webp', alt: 'The thatsit.cards marketplace with filters and a grid of Pokémon card listings' },
      ],
      appNote: 'iOS and Android app · launching mid-December 2026',
      app: [
        { label: 'Market', src: '/work/thatsit/app-market.webp', alt: 'App market screen with games, latest set releases and top listings' },
        { label: 'Scan a card', src: '/work/thatsit/app-scan.webp', alt: 'App camera scanner recognising a One Piece Monkey.D.Luffy card and showing its price' },
        { label: 'Search by photo', src: '/work/thatsit/app-search.webp', alt: 'App search with a camera button to find a card from a photo' },
        { label: 'Card & market value', src: '/work/thatsit/app-card.webp', alt: 'App card page with market value chart and graded versions' },
        { label: 'Collection', src: '/work/thatsit/app-collection.webp', alt: 'App collection screen with collection value and insights' },
        { label: 'Cart', src: '/work/thatsit/app-cart.webp', alt: 'App cart grouped by vendor with a subtotal' },
        { label: 'Checkout & delivery', src: '/work/thatsit/app-checkout.webp', alt: 'App checkout with tracked Austrian Post delivery options and carrier coverage per vendor' },
        { label: 'Feed', src: '/work/thatsit/app-feed.webp', alt: 'App feed with a post from a card shop' },
      ],
      features: [
        { title: 'Scan to identify', text: 'Point the camera at a card and the app recognises it and shows its value, one card after another.' },
        { title: 'One cart, one payment', text: 'Buy from several vendors at once: one payment at checkout, separate orders per vendor.' },
        { title: 'Logistics handled', text: 'A built-in logistics service takes the headache out of shipping: delivery options, carrier coverage and tracking are worked out at checkout, so sellers only have to drop the parcel off.' },
      ],
      event: {
        photo: '/work/thatsit/fair-2026.webp',
        alt: 'The THATSIT! stand at a trading card fair, with “Scan. Collect. Trade.” and “We buy cards” banners and visitors at the display cases',
        title: 'First public showing',
        text: 'We showed THATSIT! for the first time in September 2026 at Austria’s biggest trading card collector fair: scanning cards live at the stand, buying cards and letting collectors try the app.',
      },
    },
    team: {
      photo: '/work/thatsit/team.webp',
      alt: 'The five THATSIT! co-founders in THATSIT! shirts in front of the brand’s posters',
      intro: 'I build THATSIT! with four co-founders. Eden Biniaurishvili is one of my best friends and closest colleagues, and one of Austria’s up-and-coming startup founders. Eden and Danell Daral, who built their previous company together, are both Forbes 30 Under 30 listmakers.',
      members: [
        { name: 'Eden Biniaurishvili', role: 'Co-CEO', badge: 'Forbes 30 Under 30', href: 'https://biniaurishvili.com/' },
        { name: 'Coral Biniaurishvili', role: 'Co-CEO' },
        { name: 'Danell Daral', role: 'CMO', badge: 'Forbes 30 Under 30' },
        { name: 'Alon Yakoby', role: 'CTO', me: true },
        { name: 'Moritz Scheer', role: 'COO' },
      ],
    },
    press: [
      { outlet: 'Forbes Austria', date: 'June 2026', title: 'Under 30 Update: Eden Biniaurishvili und Thats It', href: 'https://www.forbes.at/artikel/under-30-update-eden-biniaurishvili-und-thats-it' },
      { outlet: 'Forbes Austria', date: 'November 2021', title: 'Eden Biniaurishvili · 30 Under 30 profile', href: 'https://www.forbes.at/artikel/eden-biniaurishvili' },
    ],
    caseStudies: [
      { href: '/work/thatsit-vision-matching.html', title: 'Matching Two Million Listings to the Right Card with Vision AI', text: 'Turning a vision model into a deployed Python service that recognises which card a listing shows, using DINOv2 embeddings and Qdrant.' },
    ],
  },
  {
    id: 'oekfb', short: 'ÖKFB', org: 'Austrian Small-Field Football Federation (ÖKFB)', mono: 'Ö',
    title: 'Board Member · Head of Technology (volunteer)', dates: 'Nov 2023 – Present', type: 'Volunteer, alongside my job',
    summary: 'Designed, built and run the platform behind a federation of around 200 clubs and 8,000 registered players.',
    did: [
      'Built five connected applications on one Swift/Vapor and MongoDB backend: public website, admin dashboard, team portal, referee portal and mobile app.',
      'Live scoring for around 150 matches every Sunday, flowing straight into tables, leaderboards and suspensions.',
      'Stripe payments with verified webhooks, idempotent credits, versioned fees and invoices; document-based team onboarding.',
      'AI match previews and matchday reviews grounded in computed facts, running as durable background jobs.',
      'More than 80% of routine admin work automated; I set the roadmap, coordinate external partners and advise the board.',
    ],
    learned: 'Owning a platform completely, from the board meeting to the production incident, changes how you build. Every shortcut eventually turns into a Sunday-morning phone call, so I design for the unglamorous parts first: correct data, idempotent money, recoverable jobs and documentation someone else can follow. That same discipline is what made the AI features trustworthy enough to publish.',
    tags: ['Swift', 'Vapor', 'MongoDB', 'React', 'TypeScript', 'Stripe', 'Firebase', 'GA4', 'Docker'],
    links: [{ label: 'oekfb.eu', href: 'https://www.oekfb.eu/' }, { label: 'Team portal', href: 'https://team.oekfb.eu/' }],
    showcase: {
      title: 'The platform',
      intro: 'One Swift/Vapor API serves every part of the federation: the public website, the iOS and Android app, the team and referee portals and the admin dashboard the office runs on.',
      diagram: 'oekfb-platform',
      screens: [
        { name: 'Public website', url: 'oekfb.eu', items: [
          { label: 'Home', src: '/work/oekfb/web-home.webp', alt: 'The oekfb.eu homepage with region and league pickers, navigation and a partnership banner' },
          { label: 'Table', src: '/work/oekfb/web-table.webp', alt: 'The league table on oekfb.eu for the Wiener Premier League 2026/2027' },
          { label: 'Fixtures', src: '/work/oekfb/web-fixtures.webp', alt: 'Fixtures for matchday 9 on oekfb.eu with venues, kick-off times and match previews' },
        ] },
        { name: 'Admin dashboard', url: 'ÖKFB admin', items: [
          { label: 'Overview', src: '/work/oekfb/admin-dashboard.webp', alt: 'Admin dashboard home with sections for users, teams, referees, discipline, leagues, registrations, messages, finance, email templates, homepage and events' },
          { label: 'Seasons', src: '/work/oekfb/admin-seasons.webp', alt: 'Admin league page for the Wiener Championship with three seasons and controls to add matchdays' },
          { label: 'Matchday', src: '/work/oekfb/admin-matchday.webp', alt: 'Admin matchday view with six fixtures, dates, venues, referee assignment and buttons for AI previews and the weekly report' },
          { label: 'Player approvals', src: '/work/oekfb/admin-players.webp', alt: 'Admin player approvals: a player ready for approval once photo, email, ID, birth date and name are present (personal data redacted)' },
          { label: 'Inbox', src: '/work/oekfb/admin-inbox.webp', alt: 'Admin inbox with conversations from teams by topic, open or closed (message content redacted)' },
          { label: 'Invoices', src: '/work/oekfb/admin-invoice.webp', alt: 'Admin invoice editor with the federation letterhead, PDF download and invoice creation' },
          { label: 'Login', src: '/work/oekfb/admin-login.webp', alt: 'Admin login page with an ÖKFB billboard image' },
        ] },
      ],
      appTitle: 'The app',
      appNote: 'Live on iOS and Android · free download',
      appLinks: [
        { store: 'apple', label: 'App Store', sub: 'Download on the', href: 'https://apps.apple.com/cl/app/%C3%B6kfb/id6756211638' },
        { store: 'google', label: 'Google Play', sub: 'Get it on', href: 'https://play.google.com/store/apps/details?id=com.oekfb.app&hl=en' },
      ],
      app: [
        { label: 'Fixtures', src: '/work/oekfb/app-fixtures.webp', alt: 'App fixtures for 15 November 2026 in the Innsbrucker Championship' },
        { label: 'All leagues', src: '/work/oekfb/app-leagues.webp', alt: 'App list of leagues by region with follow buttons' },
        { label: 'Table', src: '/work/oekfb/app-table.webp', alt: 'App league table for the Wiener Premier League' },
        { label: 'Team', src: '/work/oekfb/app-team.webp', alt: 'App team page for Bida United with next match and key stats' },
        { label: 'Player', src: '/work/oekfb/app-player.webp', alt: 'App player page with next match, games played, goals and cards (name and photo redacted)' },
      ],
    },
    caseStudies: [
      { href: '/work/oekfb-federation-platform.html', title: 'Running a Football Federation on Five Connected Platforms', text: 'A public website, admin dashboard, team and referee portals and an app on one Swift/Vapor backend: live scoring for 150 matches every Sunday, Stripe payments and AI match previews.' },
      { href: '/work/match-vision.html', title: 'Turning Match Video into Events, Positions and Players', text: 'From any recording or stream to shots, player movement and player identity, with YOLOv8, my own Label Studio data and an MCP-connected vision model.' },
    ],
  },
  {
    id: 'bridge', short: 'Bridge', org: 'Bridge Development GmbH', mono: 'B',
    title: 'Project-based Technical Lead', dates: 'Jan 2025 – Nov 2025', type: 'Fixed-term project',
    summary: 'Technical takeover and modernisation of a 200-room hotel.',
    did: [
      'Introduced mobile self-check-in from concept to go-live, cutting front-desk effort by around 30%.',
      'Documented the existing IT systems and planned the server migration and infrastructure modernisation.',
      'Selected and integrated external service and technology partners.',
      'Wrote pitches and decision papers for management and led an interdisciplinary project team.',
    ],
    learned: 'In an operation that never closes, the technical work is only half of it. The other half is getting management, staff and partners to agree on what changes, when, and who owns it afterwards.',
    tags: ['Self-service flows', 'Server migration', 'Vendor integration', 'Stakeholder management'],
    links: [],
    caseStudies: [
      { href: '/work/bridge-hotel-self-checkin.html', title: 'Taking a 200-Room Hotel to Mobile Self-Check-in', text: 'Leading a hotel’s move to self-check-in and a modernised IT setup, from front-desk analysis to go-live, with around 30% less front-desk effort.' },
    ],
  },
  {
    id: 'adesso', short: 'adesso', org: 'adesso Austria GmbH', mono: 'a',
    title: 'Senior Full-Stack Software Engineer', dates: 'May 2022 – Nov 2023', type: 'Full-time',
    summary: 'Client projects for banking, health insurance, insurance and building services, in teams of 8 to 12 developers.',
    did: [
      'Built client applications for Deutsche Bank, Bitmarck and B&O Gruppe, with code reviews and at least 70% test coverage.',
      'Rebuilt the CI/CD pipeline with Jenkins, GitHub workflows and cloned Kubernetes environments, cutting deployment time by more than half.',
      'As interim Product Owner, planned sprints and releases months ahead: 28 releases, 4 of them major.',
      'Ran client workshops, wrote technical concepts and took over interim project leadership for one launch.',
    ],
    learned: 'Being both an engineer and the interim Product Owner taught me how much of delivery is about the bridge between users and the team: a clear specification saves more time than any pipeline.',
    tags: ['TypeScript', 'React', 'Jenkins', 'GitHub workflows', 'Kubernetes', 'Docker'],
    links: [],
    caseStudies: [
      { href: '/work/adesso-release-pipeline.html', title: 'Rebuilding a Release Pipeline and Halving Deployment Time', text: 'Rebuilding CI/CD with Jenkins, GitHub workflows and cloned Kubernetes environments, and running 28 releases as interim Product Owner.' },
    ],
  },
  {
    id: 'twinformatics', short: 'twinformatics', org: 'twinformatics GmbH · Vienna Insurance Group', mono: 't',
    title: 'Senior iOS Engineer · Losleben app', dates: 'Sep 2020 – Apr 2022', type: 'Full-time',
    summary: 'Native iOS app of the Vienna Insurance Group with around 30,000 users.',
    did: [
      'Developed, tested and released features in a Scrum team, from requirement to App Store.',
      'Set up and maintained the iOS CI/CD pipeline and the App Store account.',
      'Helped prioritise features and plan the roadmap with product stakeholders.',
      'Mentored seven junior developers and five apprentices.',
    ],
    // DRAFT: written from the CV facts above. Rewrite in your own words.
    learned: 'Mentoring seven junior developers and five apprentices taught me that explaining my work to someone new is the fastest way to find its weak parts, and that a reliable release pipeline is what lets a small team ship to 30,000 users with confidence.',
    tags: ['Swift', 'iOS', 'Fastlane', 'CI/CD', 'Scrum'],
    links: [],
    caseStudies: [],
  },
  {
    id: 'freelance', short: 'Freelance', org: 'Freelance projects', mono: 'F',
    title: 'Tech Lead', dates: 'Sep 2019 – Apr 2020', type: 'Projects',
    summary: 'Two tech-lead projects with partner agencies.',
    did: [
      'Globex Trade SICAF: designed a banking platform prototype and REST API architecture, and ran stakeholder workshops.',
      'Wiener Rotes Kreuz Handel GmbH: built backend services, CI/CD automation and automated operational processes.',
    ],
    // DRAFT: written from the CV facts above. Rewrite in your own words.
    learned: 'Leading projects for clients through partner agencies taught me to turn workshops into a clear architecture early, because a prototype everyone has agreed on saves weeks of rework later.',
    tags: ['REST APIs', 'Backend services', 'CI/CD'],
    links: [],
    caseStudies: [],
  },
  {
    id: 'bergner', short: 'Bergner', org: 'Bergner Group', mono: 'B',
    title: 'Project Lead · Business & Technology Lead', dates: 'Nov 2012 – Nov 2019', type: 'Full-time',
    summary: 'International housewares group with over 400 employees across 12 locations.',
    did: [
      'Part of the transition team that rolled out a central CMS and management system across 12 locations worldwide.',
      'Replaced Excel processes with automated, department- and region-based workflows.',
      'Built a scanner app for capturing products on site and delivered barcode and inventory solutions.',
      'Gathered requirements from international business teams and coordinated projects in Europe and Asia.',
    ],
    // DRAFT: written from the CV facts above. Rewrite in your own words.
    learned: 'Rolling out one system across 12 locations in Europe and Asia taught me that software only works once the people using it trust it, so I start from how each team actually works before deciding what to automate.',
    tags: ['Workflow automation', 'Barcode & inventory', 'International rollouts'],
    links: [],
    caseStudies: [],
  },
];

export const roleById = Object.fromEntries(roles.map((r) => [r.id, r]));
export const roleUrl = (id) => `/experience/${id}.html`;
export const logoUrl = (id) => `/logos/${id}.png`;
