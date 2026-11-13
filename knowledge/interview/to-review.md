# Interview questions: to review

These are the questions where my CV and projects don't give a good answer yet, or where an interviewer
may see a weakness. For each one: why it's tricky, what I can draw on, and space for my own answer.
Once an answer is written and true, move it to `answered.md` (and into the chat's knowledge).

Priority: 🔴 = likely to be asked and currently weak · 🟡 = may come up · ⚪ = role-specific

---

## 1. Classic behavioural: no stories on file yet

**R1. 🔴 What's your biggest weakness?**
- Why tricky: nothing on file. Avoid fake weaknesses ("I work too hard").
- Could draw on: taking on a lot at once (ÖKFB + THATSIT! + Bridge in 2025), owning everything myself vs delegating, depth in ML theory vs engineering.
- My answer: When generative AI took off, I stayed in my traditional engineering lane for longer than I should have, and by the time I went all in, jumping back into the pool was harder than it would have been a year earlier. I've closed that gap deliberately: I now have AI running in production, from fact-grounded match previews to vision-based card matching, and I'm building match analysis with YOLOv8 and an MCP-connected vision model. What I took from it is to try new tools early, while the current stack still works, instead of waiting until the shift is obvious.

**R2. 🔴 Tell me about a time you failed.**
- Keywords: failed failure mistake wrong
- Why tricky: no failure story documented. Every case study reads as a success.
- Could draw on: something on ÖKFB that broke on a Sunday, an early version of previews or matching that didn't work, a launch that slipped.
- My answer: My clearest failure was a release of the Vienna Insurance Group's Losleben iOS app at twinformatics. I was responsible for maintaining the app's CI/CD pipeline, and because we didn't confirm certain details before shipping, a version went out that crashed. We had to fix it immediately, and since every iOS fix has to pass Apple's review again, it took about two days until a confirmed build was live. We ran a postmortem and a dev jour fixe on what not to do and why tests are the base of any development that reaches production. It changed how I run releases: quality is a gate, not a phase, which is how I later rebuilt the release pipeline at adesso.

**R3. 🔴 Tell me about a project that didn't go to plan.**
- Could draw on: hotel migration surprises, THATSIT! launch timeline, match analysis scope.
- My answer:

**R4. 🔴 Tell me about a conflict with a teammate and how you resolved it.**
- Why tricky: no conflict story on file.
- Could draw on: adesso teams of 8–12, Bridge interdisciplinary team, external partners at ÖKFB.
- My answer:

**R5. 🔴 Tell me about a time you disagreed with your manager or a stakeholder.**
- Could draw on: board decisions at ÖKFB, client requirements at adesso, hotel management.
- My answer:

**R6. 🔴 Tell me about a production incident you caused or handled.**
- Why tricky: the site mentions "Sunday-morning phone calls" but no concrete incident.
- My answer: At twinformatics I maintained the CI/CD pipeline for the Vienna Insurance Group's Losleben iOS app, used by around 30,000 people. On one release we didn't confirm certain details before shipping, and a version went out that crashed. We fixed it immediately, but because the fix had to go through Apple's review again, it took about two days until a confirmed build was live. Afterwards we held a postmortem and a dev jour fixe on what went wrong and why tests are the base of anything that reaches production. Since then I treat automated checks as a hard gate in every pipeline I own.

**R7. 🟡 Tell me about a time you got critical feedback.**
- My answer: At twinformatics, in my early years as a developer, I took on more than I could chew, mostly to prove myself, and some team members experienced me as too dominant. It was uncomfortable to hear, but fair: taking everything on myself left less room for others. Today delegation is something I'm deliberate about. The ÖKFB president's reference specifically mentions targeted delegation and transparent communication, and the federation platform now runs with a team that handles the day-to-day without me.

**R8. 🟡 Tell me about a missed deadline.**
- My answer:

**R9. 🟡 Tell me about a time you had to say no to a stakeholder.**
- My answer:

**R10. 🟡 What's the hardest bug you've debugged?**
- Could draw on: GA4 period totals vs summed daily users, double credits on retried approvals, lease/claim races across replicas.
- My answer:

**R11. 🟡 What decision would you make differently today?**
- Could draw on: MongoDB vs Postgres for payments, Swift/Vapor choice, scope of THATSIT!.
- My answer:

**R12. 🟡 How did you handle an underperforming team member?**
- My answer:

**R13. 🟡 Tell me about a time you had to learn something fast.**
- Could draw on: Python/PyTorch/DINOv2 for THATSIT! in 2025, YOLOv8 and Label Studio in 2026.
- My answer:

---

## 2. Career path: things an interviewer will notice

**R14. 🔴 Your degree is in Industrial Design, not Computer Science. How do you cover the fundamentals?**
- Could draw on: 8+ years shipping, self-taught path, design as a strength (A92).
- My answer:

**R15. 🔴 Bergner Group (2012–2019) was a business and technology lead role. How much of your "8+ years" is hands-on software?**
- Why tricky: full-time software engineering on the CV starts around 2019–2020.
- Could draw on: scanner app, workflow automation, CMS rollout. Be precise about what I coded.
- My answer:

**R16. 🔴 Your tenures are short: twinformatics 19 months, adesso 18 months, Bridge fixed-term. Why?**
- Keywords: job hopping change jobs often lot moves short stays tenure
- Could draw on: Bridge was a fixed-term project by design; reasons for leaving twinformatics and adesso aren't on file.
- My answer: Each move had a clear reason. Going from twinformatics to adesso took me from native iOS into senior full-stack work for enterprise clients like Deutsche Bank and Bitmarck. I left adesso because I needed shoulder surgery, and taking the time off wasn't possible in that setup, so I put my health first. Bridge was a fixed-term project by design: the technical takeover of a hotel, with a natural end once self-check-in was live. And the ÖKFB platform, which I've run since 2023, shows how I work when I can own something for the long term.

**R17. 🔴 Between adesso (Nov 2023) and Bridge (Jan 2025), what was your paid work?**
- Keywords: gap career break 2024 time off injury surgery health recovery cv
- Why tricky: only the volunteer ÖKFB role is listed for those ~14 months. Expect this question.
- My answer: In late 2023 I had a serious shoulder injury: I couldn't raise my arm without dislocating it. Surgery, healing and physiotherapy took a little over 11 months, and for the first six I couldn't type properly. As I recovered, the ÖKFB approached me, and I designed and built the platform that now runs the federation. Alongside that, I'm a silent investor in a few startups and occasionally consult for them. I'm fully back to myself now.

**R18. 🔴 Why are you looking for a job now?**
- My answer: The two things I've been building have reached a natural handover point. The ÖKFB platform is essentially done: a team handles the day-to-day, and new features are outsourced or built in my spare time. At THATSIT! I laid the groundwork through the initial investment, and the US-based team is taking it from there, with me involved as a co-founder and shareholder. That frees me for what I want next: a full-time AI engineering role in a team where I can keep growing.

**R19. 🔴 THATSIT! launches in December 2026, the same month you're available. Will you stay involved? How much time will it take?**
- Why tricky: founders are often seen as flight risks or part-time.
- My answer: No, it won't compete. THATSIT! is a US company. I laid the groundwork for the initial investment and built the AI card matching, and the team is taking it from there. My role now is giving input as a co-founder and shareholder, not day-to-day work.

**R20. 🔴 You also volunteer as Head of Technology at ÖKFB and build Goodfield. How will you fit a full-time job around that?**
- Could draw on: the platform is documented and runs without me in the room (A31).
- My answer: No. The ÖKFB platform is pretty much done and documented, and there's a team that deals with the day-to-day. New features are either outsourced or something I build in my spare time. I receive some compensation, but honestly I do it as a volunteer, for my love of the game.

**R21. 🟡 In 2025 you had Bridge, ÖKFB and THATSIT! at the same time. How did you manage that?**
- My answer:

**R22. 🟡 Why did you leave adesso?**
- My answer: Toward the end of my time at adesso, the working relationship with the project's Product Owner, who had previously been our Scrum Master, became increasingly difficult. At the same time I needed shoulder surgery, and taking the time off wasn't possible in that setup, so I made my health the priority and left.

**R23. 🟡 Why did you leave twinformatics?**
- My answer: I left twinformatics for adesso. It moved me from native iOS into senior full-stack work on enterprise projects, for clients like Deutsche Bank, Bitmarck and B&O Gruppe.

**R24. 🟡 Why not keep building your own startup instead of joining us?**
- My answer: I've done the founder side, and it's in good hands: THATSIT! has a strong team in the US, and the ÖKFB platform runs on its own. What I want now is different: a team that pushes itself, room to grow toward leading a department, and the stability that matters to me as someone who's married and family-focused.

**R25. 🔴 What are your salary expectations?**
- Keywords: salary pay money compensation expectations
- Prepare a range for Vienna (gross per year, 14 salaries) and know the KV minimum for the role.
- My answer: I'm looking for €65,000 to €75,000 gross per year, depending on the role and the overall package.

**R26. 🔴 Remote, hybrid or on-site? Would you relocate?**
- Keywords: remote hybrid office onsite location work from home
- My answer: I'm flexible: remote, hybrid or on-site all work for me, and I find a mix is nice. I'm based in Vienna.

**R27. 🟡 Where do you see yourself in five years?**
- My answer: In five years I want to be leading an engineering department, with AI at the core of what it builds. Personally, I'm married and family-focused, and I'm looking forward to having kids, so stability matters to me: I want a place where I can grow for the long term.

**R28. ⚪ Why do you want to work here?** (company-specific: prepare per application)
- My answer:

**R29. 🟡 What would you do in your first 90 days?**
- My answer:

---

## 3. AI / ML depth: likely gaps for AI engineer roles

**R30. 🔴 How do you evaluate LLM output quality? Do you have an eval set?**
- Why tricky: no evals, metrics or test sets are documented for the previews. Admin review is the only check on file.
- How to get it: pick 30–50 published previews, write down per article whether every fact is correct and the wording is publishable; that's your baseline. Admin edits per article are a second signal.
- My answer:

**R31. 🔴 How accurate is the card matching? What are your precision/recall or top-k numbers?**
- Why tricky: "matching quality checks" is mentioned, but there are no numbers.
- How to get it: take ~200 listings where the right card is known, run them through the matcher and count top-1 and top-5 hits.
- My answer:

**R32. 🔴 What mAP does your YOLOv8 model reach? How much data have you labelled?**
- Why tricky: work in progress, no metrics on file.
- How to get it: Ultralytics prints mAP50 and mAP50-95 at the end of training (or run `yolo val model=best.pt data=your.yaml`); count labelled frames in Label Studio.
- My answer:

**R33. 🔴 Have you built a production RAG system? Chunking, hybrid search, reranking, evaluation?**
- Why tricky: RAG is rated 1 in my toolbox. The only RAG on file is this site's BM25 chat.
- My answer: I'd call myself intermediate. I've built a small RAG system end to end: the chat on my portfolio retrieves passages with BM25, gives the best ones to a model that may only answer from them, and links its sources. I've also run embedding search in production with DINOv2 and Qdrant at THATSIT!. For production RAG at scale I know the next steps: chunking tuned to the documents, hybrid keyword and vector search, a reranker, metadata and permission filters, and an evaluation set to measure retrieval and answer quality before changing anything. The habit I bring from my match previews applies directly: retrieve or compute the facts first, and let the model only phrase them.

**R34. 🔴 Have you built agents? Tool-calling loops, planning, LangChain/LangGraph or similar?**
- Why tricky: the MCP server for ÖKFB is planned, not built, and the card-game judge is a dream project. The MCP + vision stream setup is the closest.
- My answer: I'm at an intermediate level with agents. The closest I've built is my match analysis, where an MCP server gives a vision stream model tools and match context, so it can reason about what's happening on the pitch. I'm also planning an MCP server for the federation's backend with permission-scoped tools. To me the hard parts of agents are engineering ones: narrow, well-defined tools, permissions and business rules kept in the backend, durable execution with retries, and a log of every step so you can trace what the agent did. I haven't shipped a multi-step autonomous agent to production yet, and it's one of the things I want to do next.

**R35. 🔴 Have you fine-tuned an LLM (LoRA, SFT, DPO)?**
- Why tricky: none on file. YOLOv8 training on my own data is the closest.
- My answer: I haven't fine-tuned an LLM in production. My hands-on training experience is in vision: I train YOLOv8 on my own Label Studio annotations of amateur football footage. For language and image understanding I've reached for cheaper, more controllable tools first: pre-trained DINOv2 embeddings at THATSIT!, and structured outputs over computed facts for the match previews. I'd consider fine-tuning, for example with LoRA, when prompting and retrieval can't reach the quality, format or cost I need, and when I have enough good examples to both train and evaluate on.

**R36. 🟡 Explain how transformers and attention work.**
- Why tricky: theory isn't covered anywhere in the knowledge base. Prepare a clear 2-minute explanation.
- My answer: A transformer turns its input, words or image patches, into tokens with embeddings, then runs them through layers of self-attention. In each layer, every token builds a weighted mix of all the other tokens, with the weights coming from how well its query matches their keys, and the mix made from their values. Several attention heads run in parallel to pick up different relationships, followed by feed-forward layers, with residual connections and normalisation in between. Language models are trained to predict the next token. I use one in practice: DINOv2, which powers the matching at THATSIT!, is a vision transformer that learned its image representations through self-supervised training.

**R37. 🟡 Explain how DINOv2 was trained, and why its embeddings work for your use case.**
- My answer:

**R38. 🟡 How would you fine-tune DINOv2 or improve matching when it fails on near-identical cards?**
- My answer:

**R39. 🔴 How do you defend against prompt injection?**
- Could draw on: the system prompt in `api/ask.js`, structured outputs (the model can only choose among facts), permission checks staying in the backend for MCP.
- My answer: I assume anything that reaches the model can be hostile, so the defence lives outside the model. In my match previews the model can only choose among facts the backend computed, through a strict JSON Schema, so an injected instruction has nothing to act on, and an admin reviews every article. On my site's chat the system prompt tells the model to ignore instructions in the question, input is length- and rate-limited, and only user and assistant turns are accepted from the browser. For tools and MCP the rule is least privilege: permission checks and business rules stay in the backend, so a manipulated model can't do more than the user could. For anything with real access I'd add output checks and red-team tests.

**R40. 🟡 How do you handle LLM latency? Streaming, caching, model choice?**
- My answer:

**R41. 🟡 Have you served models on GPUs? Batching, quantisation, inference cost per request?**
- My answer:

**R42. 🟡 MLOps: experiment tracking, model registry, drift monitoring?**
- My answer:

**R43. 🟡 How many users read the AI previews? What's the cost per article?**
- Why tricky: scale and cost of the AI features aren't quantified anywhere.
- How to get it: each article already stores its token usage; sum input and output tokens over a month and multiply by the model's price. Page views per preview are in GA4.
- My answer:

**R44. 🟡 When would you use embeddings vs BM25 vs hybrid search?**
- My answer: BM25 when the text is small, curated and keyword-heavy, like the knowledge base behind my portfolio chat: it's fast, needs no infrastructure and is easy to debug. Embeddings when meaning matters more than exact words, or when the data isn't text at all, like the card images I match with DINOv2 and Qdrant at THATSIT!. In production I'd usually go hybrid: combine both scores, then rerank the top results, and measure which mix works on a real evaluation set.

**R45. 🟡 Python has only been a production language for you since 2025 (THATSIT!). How deep is your Python?**
- My answer:

**R46. 🟡 How do you keep up with AI developments?**
- My answer:

---

## 4. Engineering depth

**R47. 🔴 Design a system for millions of users / high traffic.**
- Why tricky: the largest documented scale is 8,000 players, 30,000 app users and 2M listings. No high-traffic system on file.
- My answer: My largest systems are the federation platform, with around 8,000 players and 150 matches scored live every Sunday, and THATSIT!, with 2 million listings matched against 400,000 cards. I haven't run a system with millions of daily users, but the patterns I use are the ones that scale: API replicas with durable background jobs and leases so work runs exactly once, idempotency for anything that touches money, caching and coalescing of repeated requests, and a separate service with a vector database for the heavy AI workload. In a design interview I'd start from load estimates, then talk through caching, queues, database indexing and partitioning, and how the system degrades gracefully.

**R48. 🟡 Algorithms and data structures / live coding.**
- Practice: arrays, hashing, trees, graphs, Big-O. Nothing on file.
- My answer:

**R49. 🟡 How deep is your AWS / Azure experience?**
- Why tricky: both are rated 1. DigitalOcean is what I deploy to.
- My answer:

**R50. 🟡 Have you run Kubernetes in production yourself (not just used team clusters)?**
- My answer:

**R51. 🔴 Observability: logging, metrics, tracing, alerting, on-call?**
- Why tricky: "monitoring" is mentioned once, with no tools named.
- My answer: Today my observability is built into the product: background jobs are persisted with their state, failed or pending emails are visible and can be resent, every AI article records its model, prompt version and token usage, and the analytics dashboards show freshness and failure states. In a larger setup I'd add structured logs, metrics and alerts on what users actually feel, like job backlog, error rates and payment webhook failures, plus tracing across services. I'm solid on the principles, and I'd grow into the tooling side with the team's stack.

**R52. 🟡 Why Swift/Vapor for the backend? Would you choose it again?**
- Why tricky: a niche server choice, and the reasons aren't documented.
- My answer: I come from native iOS development, and Swift on the server lets me share the same Swift packages, especially the data structures, across the backend and the apps. That means one definition of the models instead of keeping two in sync. It's a choice, not a limitation: I've also worked with PostgreSQL, FastAPI and Express, and I picked Python for the THATSIT! matching service because that's where the AI ecosystem is.

**R53. 🟡 Why MongoDB for a system with payments and balances, not PostgreSQL?**
- My answer:

**R54. 🟡 What tech debt is in the ÖKFB platform? What would you refactor?**
- My answer:

**R55. 🟡 Have you worked on a large codebase with many teams contributing?**
- Could draw on: adesso (8–12 devs, enterprise clients). Big-org experience is thin.
- My answer:

**R56. 🟡 Have you managed people directly (hiring, reviews, 1:1s)?**
- Why tricky: I have mentoring and leads but no formal line management on file.
- My answer:

**R57. 🟡 Node.js / TypeScript on the backend?**
- Why tricky: TypeScript on file is frontend. Backends are Swift and Python.
- My answer: Yes, I've worked with Express, though most of my backends are Swift with Vapor and Python with FastAPI. On the frontend, TypeScript is my everyday language.

**R58. 🟡 SQL depth: query optimisation, indexing, transactions?**
- Why tricky: PostgreSQL is rated 2, and MongoDB is the main database.
- My answer:

**R59. ⚪ Security: authentication, OWASP, secrets management, GDPR?**
- Could draw on: signed links, permissions, not publishing references with personal data.
- My answer:

---

## 5. Added from my notes

**R60. 🔴 Tell me about another weakness.**
- My answer: In earlier positions I didn't read the politics of the company well, and I could be too rigid about how I thought things should be done. On occasion that meant more responsibility didn't come my way, even when the work itself was good. I've learned that how a decision is made, and who is part of it, matters as much as whether the technical answer is right. That's why at Bridge I put every major choice on paper, with pitches and decision papers for management.

**R61. 🟡 What kind of team do you want to work in?**
- My answer: A team that pushes itself to do more, but forgives mistakes and works as a collective to improve. I do my best work where standards are high and a mistake leads to a better process rather than blame, the way the postmortem after the iOS crash at twinformatics led to better release rules.

**R62. 🔴 How senior are you as an AI engineer?**
- Keywords: level good rate experience skills ai engineer how strong
- My answer: I'd describe myself as a senior software engineer and an intermediate AI engineer. The engineering around models is my strength: I have AI running in production with structured outputs, durable jobs, provenance and cost tracking, plus vision embeddings and vector search, and I'm training YOLOv8 on my own data. Where I'm still growing is the depth side, like production-scale RAG, autonomous agents and fine-tuning, which is exactly why I want a full-time AI role now.

**R63. 🟡 Do you have other commitments or investments?**
- My answer: I'm a silent investor in a few startups and occasionally consult for them. I'm a co-founder and shareholder of THATSIT!, and I volunteer on the ÖKFB board. None of it needs day-to-day time.
