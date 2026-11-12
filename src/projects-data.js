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
    cat: 'ai', status: 'Live', title: 'Generated Kit Images', org: 'oekfb',
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
    cat: 'full', status: 'Live', title: 'Football League Website', image: '/work/oekfb/oekfb-site.webp', org: 'oekfb',
    text: 'Public site for leagues across Austria: fixtures, live scores, tables, leaderboards, team and player pages, AI previews, transfers, suspensions and search.',
    tech: ['React 18', 'TypeScript', 'Parcel', 'Storybook', 'Swift', 'Vapor'],
    when: 'ÖKFB · Since Nov 2023', link: 'https://www.oekfb.eu/', linkLabel: 'Live site',
  },
  {
    cat: 'full', status: 'Live', title: 'Referee Match Portal', org: 'oekfb',
    text: 'Referees run matches from their phone: match sheets, kick-off to full time, goals and cards, corrections, no-shows and the match report.',
    tech: ['React', 'Material UI', 'Swift', 'Vapor', 'MongoDB'],
    when: 'ÖKFB · Since Nov 2023', link: '/work/oekfb-federation-platform.html#matchday', linkLabel: 'Details',
  },
  {
    cat: 'full', status: 'Live', title: 'Team Self-Service Portal', org: 'oekfb',
    text: 'Teams manage their squad, register players and trainers, upload photos, follow contracts and finances, request transfers and message the office.',
    tech: ['React', 'Material UI', 'Redux', 'Firebase', 'Swift', 'Vapor'],
    when: 'ÖKFB · Since Nov 2023', link: 'https://team.oekfb.eu/', linkLabel: 'Live site',
  },
  {
    cat: 'full', status: 'Live', title: 'Federation Admin Dashboard', org: 'oekfb',
    text: 'Leagues, seasons, fixtures, referees, team applications, discipline, transfers, fees, content, email templates, push notifications and analytics.',
    tech: ['React', 'Ant Design', 'Redux', 'React Quill', 'ApexCharts', 'Swift'],
    when: 'ÖKFB · Since Nov 2023', link: '/work/oekfb-federation-platform.html#platform', linkLabel: 'Details',
  },

  {
    cat: 'backend', status: 'Live', title: 'Payments & Team Onboarding', image: '/work/projects/payments-and-team-onboarding.webp', org: 'oekfb',
    text: 'Document-based team registration and Stripe payments with verified webhooks, idempotent credits, versioned fees, invoices and recovery after interruptions.',
    tech: ['Swift', 'Vapor', 'Stripe', 'Webhooks', 'Vapor Queues', 'SMTP'],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#payments', linkLabel: 'Details',
  },
  {
    cat: 'backend', status: 'Live', title: 'GA4 Analytics Importer', org: 'oekfb',
    text: 'Native Swift importer for Google Analytics 4 with hourly snapshots, shared leases across replicas, caching and historical and realtime dashboards.',
    tech: ['Swift', 'GA4 APIs', 'MongoDB', 'Leases', 'React'],
    when: 'ÖKFB', link: '/work/oekfb-federation-platform.html#analytics', linkLabel: 'Details',
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
