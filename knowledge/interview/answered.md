# Interview questions: answered from my CV and projects

Draft answers, first person, using only facts from the knowledge files. Read them aloud, tighten the
wording, and fix anything that doesn't sound like me. Weak spots are in `to-review.md`.

---

## 1. Introduction and motivation

**A1. Tell me about yourself.**
I'm a full-stack engineer in Vienna with 8+ years of building, shipping and running software, with a backend focus in Swift, Python and TypeScript. I designed, built and run the platform behind Austria's small-field football federation, where around 150 matches are scored live every Sunday. I co-founded the collector marketplace THATSIT!, where I built the vision AI that matches listings to cards. Before that I shipped software for Deutsche Bank, the Vienna Insurance Group and a 200-room hotel. Now I'm moving fully into AI engineering.

**A2. Walk me through your CV.**
I started at Bergner Group, an international housewares company, as a business and technology lead: rolling out a central CMS across 12 locations and replacing Excel processes with automated workflows. In 2019–2020 I led two freelance tech projects, then spent 2020–2022 as a senior iOS engineer on the Vienna Insurance Group's Losleben app. At adesso (2022–2023) I was a senior full-stack engineer on banking and health-insurance projects and interim Product Owner. Since November 2023 I've run technology for the ÖKFB as a volunteer board member, in 2025 I was technical lead for a hotel modernisation at Bridge, and since November 2025 I've been co-founder and technical product lead at THATSIT!.

**A3. Why do you want to move into AI engineering?**
I already put AI into products, and I use it every day to build them. I have AI features running in production: grounded match previews, generated kit images and vision-based card matching. What I enjoy most is the engineering around the model: structured outputs, durable jobs, cost control and keeping AI from inventing facts. That's where I want to spend all of my time.

**A4. What kind of role are you looking for?**
A full-stack or AI engineering role where I build AI features that real people rely on, ideally owning a feature from the problem through to running it in production.

**A5. When can you start?**
December 2026.

**A6. Where are you based?**
In Vienna, Austria.

**A7. Give me a one-minute summary of your AI experience.**
Three things in production and one in progress. At the football federation, the backend computes the facts and an LLM only selects among them through strict JSON Schema outputs, so match previews can't invent results. They run as durable jobs with recorded model, prompt version and token usage. Also at the federation, an image pipeline turns an uploaded jersey into a standardised kit illustration. At THATSIT! I deployed DINOv2 embeddings with Qdrant vector search to match 2 million listings to 400,000 cards. Right now I'm building match analysis from video with YOLOv8 trained on my own labelled data, plus an MCP-connected vision model.

**A8. What are you most proud of?**
The ÖKFB platform. I designed and built it on my own as a volunteer, it runs five applications on one backend, and it automated more than 80% of the federation's routine admin work. Around 200 clubs and 8,000 players go through it, and it has to work every Sunday morning on a referee's phone.

**A9. What's the biggest project you've built?**
The ÖKFB platform: a public website, admin dashboard, team portal, referee portal and mobile app on one Swift/Vapor and MongoDB backend, with live scoring, Stripe payments, document-based onboarding, analytics and AI previews.

**A10. What makes you different from other candidates?**
I've owned systems end to end, from the board meeting to the production incident, so I build for the unglamorous parts: correct data, idempotent money, recoverable jobs. I bring that discipline to AI, which is why my AI features are trustworthy enough to publish. I also studied industrial design, so I start from the person using the thing.

**A11. Why should we hire you?**
I ship things that keep working. My platform scores 150 matches live every Sunday, I halved deployment time at adesso, and I cut front-desk effort by about 30% at a hotel. I also have AI already running in production, built with the reliability habits most AI prototypes lack.

**A12. What are your strengths?**
Turning complex requirements into scalable systems on my own, and owning them in production. My federation reference highlights exceptional technical expertise, entrepreneurial thinking and the ability to build scalable, economically sustainable solutions independently. Bridge highlighted initiative and a structured, independent way of working.

**A13. How would previous employers describe you?**
The ÖKFB president wrote that I stand out for exceptional technical expertise and entrepreneurial thinking, and that I set clear priorities through structured processes, delegation and transparent communication. Bridge Group wrote about my initiative, analytical thinking, and that I was the central interface between management, departments and external partners.

**A14. What are you working on right now?**
AI match analysis for our league: from any recording or live stream to shots, player positions and player identity. Detection, labelling, backend integration and the MCP server are in place. Events, positions and identity are what I'm building now. I'm also launching THATSIT! in December 2026.

**A15. Why sports tech?**
Amateur sport only works because people give their evenings and weekends to it, and I like being one of them. It's also a great engineering environment: when people rely on a tool live, on a pitch, reliability is the feature.

---

## 2. Backend and architecture

**A16. What's your main stack?**
Backend: Swift with Vapor, Python with FastAPI, and TypeScript, on MongoDB and PostgreSQL. AI: PyTorch, Transformers, DINOv2, Qdrant, structured LLM outputs, YOLOv8. Frontend and mobile: React, React Native, native iOS. Infrastructure: Docker, Kubernetes, Jenkins, GitHub workflows, DigitalOcean.

**A17. Which languages are you strongest in?**
Swift is my longest-running language: native iOS since 2020 and server-side Swift for the federation. TypeScript for React frontends, and Python for AI services.

**A18. Walk me through the ÖKFB architecture.**
One Swift/Vapor 4 API on MongoDB, with five clients: a public website, admin dashboard, team portal and referee portal in React with TypeScript, plus a mobile app on iOS and Android. The backend owns business rules, payments, email, storage, scheduled jobs, the GA4 import and AI services. Background work runs on Vapor Queues and persisted jobs with distributed leases. Integrations are Stripe, Firebase Storage and Cloud Messaging, Expo push, SMTP and GA4. It's deployed with Docker on DigitalOcean.

**A19. How do you design background jobs that survive failure?**
Jobs are persisted, not in memory. Workers claim them atomically and hold renewable leases, so a crashed replica's job gets picked up again. Retries use backoff, idempotency keys make re-running safe, and concurrency is bounded across replicas. I track separate steps (payment, accounting, email) so interrupted work resumes where it stopped.

**A20. Explain idempotency and where you've used it.**
An operation is idempotent if doing it twice has the same effect as doing it once. In the federation's payments, idempotency keys and durable receipts stop double credits and double debits, for example when a postponement approval is retried. I use the same idea for AI jobs, so a retried generation doesn't publish twice.

**A21. How did you build payments?**
Stripe Checkout and PaymentIntents. Every team has an account balance, and it's credited only after Stripe confirms the payment through a signed webhook. Idempotency keys prevent duplicates, interrupted processing resumes from persisted jobs, and paid invoices and confirmation emails are generated automatically.

**A22. How do you handle webhooks safely?**
Verify the signature, treat the webhook as the source of truth for money (not the browser redirect), and make processing idempotent, because providers retry. Then record the effect durably before sending side effects like emails.

**A23. How do you handle pricing that changes over time?**
Fees are configured centrally and versioned, and every financial action stores the fee version it used. That way old charges stay explainable after prices change. Registrations, cancellations, deposits, overdraft and postponement fees all run on it.

**A24. How do you handle concurrency across multiple replicas?**
Shared leases and atomic claims. For example, the GA4 importer takes hourly snapshots exactly once across all replicas via a shared lease, and AI jobs use atomic claims with renewable leases. On the request side I cache and coalesce concurrent identical requests.

**A25. How do you secure a multi-user platform?**
Granular admin permissions, team ownership checks on every team resource, signed and expiring links, upload signature and size checks, idempotency keys and stale-write protection. Signed email links let people confirm a registration or transfer from their inbox without a login.

**A26. Tell me about a workflow you modelled as a state machine.**
The referee portal: Assigned → Match sheet → Kick-off → Half-time → Second half → Full time → Report → Complete. Each state has clear correction paths: delete wrong events, adjust the score, reset a half, handle abandoned matches and no-shows. Results flow straight into tables, leaderboards and suspensions.

**A27. How did you design team onboarding?**
As a tracked workflow: application, email verification, documents, review, league assignment, payment, team creation. Partial submissions are allowed, but a team can't be assigned to a league until ID documents and signed contracts are complete. Failed emails are visible and resendable, and older records can be repaired explicitly.

**A28. What's your experience with REST APIs and OpenAPI?**
I design REST APIs as the contract between services. The federation backend serves five clients through one API documented with OpenAPI. At THATSIT! the matching model sits behind FastAPI so the Swift backend uses it like any other API. As a freelancer I designed the REST API architecture for a banking platform prototype.

**A29. Tell me about integrating a third-party API that was tricky.**
GA4. I wrote a native Swift importer for the reporting and realtime APIs. The trap was that summing daily users gives wrong period totals, so I query proper period totals. It takes hourly snapshots once across replicas, caches and coalesces requests, and shows freshness, empty and failure states in the dashboard.

**A30. Which databases have you used?**
MongoDB most (the federation platform), PostgreSQL, and Qdrant as a vector database at THATSIT!.

**A31. How do you make a system maintainable by someone else?**
I document it and run it on clear processes. The federation platforms keep running and improving whether or not I'm in the room. I also put safeguards into code instead of tribal knowledge: migrations, indexes, ownership checks and tests with mocked external services.

---

## 3. Frontend and mobile

**A32. What's your frontend experience?**
React and TypeScript. All four federation web apps are React 18 with Redux, React Router, Ant Design, Material UI and Storybook. For newer work I use Vite and Tailwind, with Vitest.

**A33. What's your mobile experience?**
I shipped the Vienna Insurance Group's Losleben iOS app (around 30,000 users) in Swift, including its CI/CD and App Store releases. Today I work with React Native at THATSIT!, and the federation app runs on iOS and Android.

**A34. Tell me about the Losleben app.**
It's a native iOS app of the Vienna Insurance Group with about 30,000 users. In a Scrum team I developed, tested and released features from requirement to App Store, set up and maintained the iOS CI/CD pipeline and App Store account, helped plan the roadmap, and mentored seven junior developers and five apprentices.

---

## 4. DevOps, releases and quality

**A35. What's your CI/CD experience?**
I set up the iOS pipeline with Fastlane at twinformatics, rebuilt the release pipeline at adesso with Jenkins, GitHub workflows and cloned Kubernetes environments, and built CI/CD automation as a freelancer. I've been doing CI/CD since 2020.

**A36. Tell me about the release pipeline rebuild.**
At adesso, releasing for a white-label health-insurance app was slower than it needed to be. I made environments reproducible with cloned Kubernetes environments, so what was tested was what went live. I automated the path to production with Jenkins and GitHub workflows, and made reviews and 70%+ coverage a gate. Deployment time dropped by more than half across 28 releases.

**A37. How do you make releases less risky?**
Make them boring. Use reproducible environments, an automated path to production and quality gates in the pipeline, then release often. Plan releases months ahead, so clients and teams know what's coming.

**A38. Docker and Kubernetes experience?**
I run my own services in Docker and Docker Compose. That covers the federation backend on DigitalOcean and the THATSIT! matching service next to the app and backend. At adesso I worked with cloned Kubernetes environments as part of the release pipeline.

**A39. Which cloud providers have you used?**
I've deployed to DigitalOcean, and worked with Azure and AWS.

**A40. How do you approach testing?**
Code reviews and automated tests as a habit, with tests in the pipeline as a gate. At adesso we kept at least 70% coverage. The federation backend has XCTest/XCTVapor suites with mocked external services, and the frontends use Jest, React Testing Library and Vitest.

**A41. How do you test code that depends on external services?**
I mock them. In the federation backend, Stripe, email, storage and AI providers are mocked in XCTVapor tests, so tests are fast and deterministic. The AI provider also sits behind an interface, which makes swapping in a test double easy.

---

## 5. AI and machine learning

**A42. What AI have you shipped to production?**
Grounded German match previews and matchday reviews and a jersey-to-kit image generator for the football federation, plus vision-based card matching at THATSIT!.

**A43. How do you stop an LLM from hallucinating?**
Don't let it produce facts. In my match previews, the backend computes every fact (form, table position, head-to-head, scorers, discipline, absences) with a historical cutoff. The model only selects and orders those facts through strict JSON Schema outputs, and the backend writes the article. Admins review before publishing. Football fans notice a wrong number immediately, so this matters.

**A44. Walk me through the AI match preview system end to end.**
A scheduled job picks upcoming fixtures. The backend builds a fact snapshot with a cutoff, so it never uses results from after the match, and handles incomplete rounds and awarded results explicitly. A persistent job calls the model through a provider interface, with strict JSON Schema output: which facts to use, in what order, and title candidates. The backend renders the German article and records the source snapshot, model, prompt version, selected facts and token usage. An admin reviews, edits, publishes or deletes it, and publishing is revision-safe.

**A45. What are structured outputs and why use them?**
Structured outputs force the model to answer in a defined JSON Schema instead of free text. That makes the output machine-checkable, and it lets me restrict the model to choices instead of claims: in my previews it can only pick from verified facts.

**A46. How do you make AI pipelines reliable?**
I treat generation like any other critical background work: persistent jobs, bounded concurrency, atomic claims, renewable leases, retries with backoff and idempotency keys. Each output records the model, prompt version, inputs and token usage, so I can trace and reproduce it.

**A47. How do you version prompts and track model usage?**
Every generated article stores the prompt version, model, source snapshot, selected facts and token usage. That gives provenance for every published piece and cost data per article.

**A48. How do you avoid vendor lock-in with model providers?**
The inference provider sits behind an interface. Today it's an OpenAI-compatible adapter, but the football logic doesn't depend on it. The planned MCP server follows the same principle: any model provider.

**A49. How do you control AI costs?**
I track them as part of the product, not as an afterthought. At THATSIT! I own the budget, including AI and cloud running costs, which grow with every listing. In the federation, every article records its token usage. I also keep the model's job small: compute what you can, let the model decide only what it must.

**A50. How do you keep a human in the loop?**
For the match previews, admins review, edit, publish or delete each article. For generated kit images, admins see a preview before anything is saved.

**A51. What are embeddings and how have you used them?**
An embedding turns an input, here a card image, into a vector that captures how it looks, so similar images end up close together. At THATSIT! DINOv2 embeds each listing image, and Qdrant finds the closest catalogue cards among 400,000.

**A52. Why did you frame card matching as search, not classification?**
With hundreds of thousands of near-identical cards, a classifier with 400,000 classes isn't practical. Embeddings let me compare a listing against the whole catalogue and return the closest matches, and new cards just need embedding, not retraining.

**A53. Why DINOv2?**
It gives strong general-purpose image embeddings out of the box, which avoided training a custom model from scratch.

**A54. Why a dedicated vector database?**
Fast similarity search across the full catalogue. Qdrant handles that, so I don't have to build nearest-neighbour search myself.

**A55. How do you turn a model into a production service?**
I give it a clean API, predictable behaviour and a deployment the rest of the platform can rely on. At THATSIT! the matching runs as a separate Python service behind FastAPI in its own container, so the React Native app and Swift backend use it like any other API. A good model isn't a product yet.

**A56. What's the most important thing you've learned about applied AI?**
The interesting problems are often not about the model. They're about data, interfaces, cost, and how the rest of the system behaves when the model isn't sure.

**A57. What image generation have you done?**
Generated kit images for the federation. An admin uploads a club's jersey, and the pipeline uses the jersey and a layout reference as image inputs to produce a standardised home or away kit. It validates the transparent PNG (structure, CRCs, visible pixels, transparent edges), shows a preview before saving to Firebase, and rejects stale saves.

**A58. What computer vision experience do you have?**
Vision embeddings and vector search at THATSIT!, and YOLOv8 detection for football video. I trained the detector on my own Label Studio annotations of amateur match footage.

**A59. How did you create training data?**
I annotate amateur match footage in Label Studio with six classes: player, goalkeeper, referee, ball, goal and blank. A full match is close to 100,000 frames. I train on our own pitches, kits and camera angles instead of relying on generic sports datasets.

**A60. What's hard about detecting a football?**
It's small, fast and often hidden. It's the hardest class in my dataset. I also made the referee its own class, so officials never get counted as players.

**A61. How would you identify players in match video?**
Use the data we already have. The federation stores every squad, jersey number and fixture, so identity becomes a matching problem against known players, not open-ended face recognition.

**A62. How do you combine specialised models with LLMs?**
Specialised models first, a general model on top. YOLOv8 does the fast, frame-level detection. A vision model, reached through MCP, gets tools and match context for judgement. It's the same split as my previews: compute what you can, let the model decide only what it must.

**A63. What is MCP and how have you used it?**
The Model Context Protocol is a standard way to give AI models tools and context. In my match analysis, an MCP server gives a vision stream model access to tools and match context, so it can reason about what's happening, not just what's visible.

**A64. How would you expose an existing backend to AI assistants?**
That's my plan for the federation: a custom MCP server in front of the authenticated Vapor API, with permission-scoped tools for standings, fixtures, registrations, invoices and analytics. Football rules, accounting and permission checks stay in the backend, never in the model. Use cases include a league assistant, a registration assistant that explains missing documents, referee report drafts and a rules assistant with cited regulations.

**A65. What is RAG, and have you built it?**
Retrieval-augmented generation: retrieve relevant passages first, then let the model answer only from them. The chat on my portfolio does this: BM25 retrieval over a knowledge base I wrote, the top passages as context, and the model answers only from them, with source links. Without a model configured, it shows the best passages directly.

**A66. Why BM25 rather than embeddings for your site chat?**
The knowledge base is small and written by me, so keyword search works well, needs no infrastructure, and can run in the browser as a fallback. I've used embedding search where it matters, for images at THATSIT!.

**A67. How do you use AI tools in your own engineering?**
Daily, with Claude Code: prototyping, test writing and refactoring. I built my portfolio site with it as a pair programmer. The goal is building faster without lowering the bar.

**A68. How do you make a model's output safe to publish?**
Restrict what it can say (structured outputs over verified facts), record provenance, have a human review it, and validate generated artifacts mechanically, like my PNG checks on kit images.

---

## 6. Leadership, product and stakeholders

**A69. What's your leadership experience?**
I've been interim Product Owner at adesso, technical lead at Bridge leading an interdisciplinary team, and Head of Technology on the federation's board, coordinating external partners and advising the board. At THATSIT! I lead sprint planning and retrospectives. At twinformatics I mentored seven juniors and five apprentices.

**A70. Tell me about mentoring.**
At twinformatics I mentored seven junior developers and five apprentices in iOS development. Explaining my work to someone new is still the fastest way I know to find its weak parts.

**A71. Have you worked as a Product Owner?**
Yes, as interim Product Owner at adesso. I planned sprints and releases months ahead, 28 releases with 4 of them major, and turned user needs into specifications developers could build from. At THATSIT! I own the product vision, roadmap and launch plan.

**A72. How do you translate business needs into technical specs?**
Start from the people who will use it, and write the problem down in their words. Then turn it into a clear specification. At adesso I learned that a clear specification saves more time than any pipeline.

**A73. Tell me about a project you led end to end.**
The hotel self-check-in at Bridge. I analysed how check-in actually worked at the front desk, worked out the concept with management, documented the existing IT, selected and integrated external partners, planned the server migration, and led the team to go-live. Front-desk effort dropped by about 30%.

**A74. How do you decide between building and buying?**
Buy, integrate, then build. At the hotel I evaluated and selected external technology partners and integrated them into the existing landscape instead of building everything from scratch. At THATSIT! I used a pre-trained DINOv2 and an existing vector database instead of training and building my own.

**A75. How do you get management to make a decision?**
Put it on paper. I wrote pitches, technical solution architectures and decision papers that gave management a clear basis for each choice, including its technical and commercial risks.

**A76. How do you work with stakeholders who aren't technical?**
I've been the central interface between management, departments and external partners at Bridge, ran client workshops at adesso, and advise a volunteer board at the federation. I start from their problem in their words and give them decisions with clear trade-offs.

**A77. How do you manage change in an operation that can't stop?**
At the hotel, the technical work was only half of it. The other half was getting management, staff and partners to agree on what changes, when, and who owns it afterwards. We modernised the infrastructure alongside the new workflows, so we weren't building new tools on old systems.

**A78. Experience with Scrum or Kanban?**
Both. I worked in Scrum teams at twinformatics and adesso, planned sprints as interim PO, and lead sprint planning and retrospectives at THATSIT!.

**A79. Have you worked with international teams?**
Yes. At Bergner I gathered requirements from international business teams and coordinated projects in Europe and Asia, across 12 locations. I speak German, English, Hebrew and some Chinese.

**A80. Have you managed a budget?**
At THATSIT! I keep the budget in check, including the running costs of AI tools, cloud services and infrastructure.

**A81. How do you work with external partners and vendors?**
At Bridge I selected and onboarded technology partners and integrated them. At the federation I coordinate external partners as Head of Technology.

---

## 7. Impact and behavioural (positive stories)

**A82. Tell me about a time you automated a manual process.**
The federation ran on forms, emails, spreadsheets and phone calls. I built team onboarding, live scoring, payments and invoicing into one platform, and more than 80% of routine admin is now automated. Earlier, at Bergner, I replaced Excel processes with automated, department- and region-based workflows.

**A83. Tell me about a time you significantly improved a process.**
At adesso I rebuilt the release pipeline and cut deployment time by more than half, while keeping 70%+ test coverage as a gate.

**A84. Tell me about measurable business impact you delivered.**
Hotel self-check-in: around 30% less front-desk effort. Federation: 80%+ of admin automated. adesso: deployments more than twice as fast.

**A85. Tell me about a time you took initiative.**
I joined the federation's board as a volunteer and designed and built the entire platform that now runs it, on my own. Bridge's reference specifically highlights my high level of initiative.

**A86. Tell me about working under pressure or with something critical.**
Match day. Around 150 matches are scored live every Sunday from referees' phones at the side of a pitch. I designed the referee workflow with clear correction paths, because every shortcut eventually turns into a Sunday-morning phone call.

**A87. Tell me about a time you had to handle money correctly.**
Federation payments. I designed for retries, interruptions and duplicates from the start: credit only after Stripe confirms, idempotency keys, durable receipts, resumable jobs and versioned fees.

**A88. Tell me about a technical trade-off you made.**
At THATSIT! I chose a pre-trained DINOv2 with vector search over training a custom classifier. It's faster to ship and scales to new cards without retraining. In return, quality depends on general-purpose embeddings, which I check with matching quality checks.

**A89. Have you worked in regulated industries?**
Yes: banking (Deutsche Bank, a banking platform prototype), health insurance (Bitmarck, the IT provider for German statutory health insurers) and insurance (Vienna Insurance Group).

**A90. Which domains have you worked in?**
Sports, marketplaces, banking, health insurance and insurance, hospitality, and international retail/housewares.

---

## 8. Approach and values

**A91. How do you approach a new project?**
I follow the same route every time: problem, workflow, architecture, build, test, release, operate, improve. It starts with the people who will use it: a referee entering a score on a phone, a receptionist checking in a guest. I write the problem down in their words.

**A92. How does your design background affect how you build?**
I studied industrial design before I wrote software for a living. It still shapes how I build: start from the person holding the thing, and leave out what they don't need.

**A93. What engineering principles do you follow?**
Reliability is the feature when people rely on a tool live. Boring releases are safe releases. Design for the unglamorous parts first: correct data, idempotent money, recoverable jobs, docs. And for AI: compute what you can, let the model decide only what it must.

**A94. How do you handle operating what you build?**
I own it. At the federation I'm responsible from the board meeting to the production incident, which is why I build safeguards and recovery paths in from the start.

---

## 9. Background facts

**A95. What's your education?**
A Bachelor of Industrial Design from Raffles Design Institute (2014–2016), and micro- and macroeconomics at the South China University of Technology in Guangzhou (2012–2014).

**A96. Which languages do you speak?**
German and English natively, Hebrew fluently, and conversational Chinese.

**A97. Tell me about THATSIT!.**
A collector marketplace I co-founded, with over 400,000 cards and 2 million listings, launching in December 2026. I'm Technical Product Lead: I built the AI matching service and own the product vision, roadmap, launch plan and budget.

**A98. Tell me about Goodfield.**
A side project: an all-in-one booking and management platform for padel, tennis and other sports clubs. Each club gets a branded public booking site plus a back office for bookings, events, finance and teams, instead of renting space on a marketplace.

**A99. What would you build if you had unlimited time?**
An AI judge for trading card games: an iPhone camera follows the match, an agent checks whether plays are legal, keeps score and talks to the players.

**A100. What do you do outside work?**
Grassroots football: I volunteer on the ÖKFB board. I also build side projects like Goodfield and AI match analysis for our league.

**A101. How can we reach you / see your work?**
Email alon.yakoby@gmail.com or LinkedIn (linkedin.com/in/alon-yakoby). The federation platform is live at oekfb.eu, and my case studies are on my site.
