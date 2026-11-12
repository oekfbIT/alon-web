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
- My answer:

**R2. 🔴 Tell me about a time you failed.**
- Why tricky: no failure story documented. Every case study reads as a success.
- Could draw on: something on ÖKFB that broke on a Sunday, an early version of previews or matching that didn't work, a launch that slipped.
- My answer:

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
- My answer:

**R7. 🟡 Tell me about a time you got critical feedback.**
- My answer:

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
- Could draw on: Bridge was a fixed-term project by design; reasons for leaving twinformatics and adesso aren't on file.
- My answer:

**R17. 🔴 Between adesso (Nov 2023) and Bridge (Jan 2025), what was your paid work?**
- Why tricky: only the volunteer ÖKFB role is listed for those ~14 months. Expect this question.
- My answer:

**R18. 🔴 Why are you looking for a job now?**
- My answer:

**R19. 🔴 THATSIT! launches in December 2026, the same month you're available. Will you stay involved? How much time will it take?**
- Why tricky: founders are often seen as flight risks or part-time.
- My answer:

**R20. 🔴 You also volunteer as Head of Technology at ÖKFB and build Goodfield. How will you fit a full-time job around that?**
- Could draw on: the platform is documented and runs without me in the room (A31).
- My answer:

**R21. 🟡 In 2025 you had Bridge, ÖKFB and THATSIT! at the same time. How did you manage that?**
- My answer:

**R22. 🟡 Why did you leave adesso?**
- My answer:

**R23. 🟡 Why did you leave twinformatics?**
- My answer:

**R24. 🟡 Why not keep building your own startup instead of joining us?**
- My answer:

**R25. 🔴 What are your salary expectations?**
- Prepare a range for Vienna (gross per year, 14 salaries) and know the KV minimum for the role.
- My answer:

**R26. 🔴 Remote, hybrid or on-site? Would you relocate?**
- My answer:

**R27. 🟡 Where do you see yourself in five years?**
- My answer:

**R28. ⚪ Why do you want to work here?** (company-specific: prepare per application)
- My answer:

**R29. 🟡 What would you do in your first 90 days?**
- My answer:

---

## 3. AI / ML depth: likely gaps for AI engineer roles

**R30. 🔴 How do you evaluate LLM output quality? Do you have an eval set?**
- Why tricky: no evals, metrics or test sets are documented for the previews. Admin review is the only check on file.
- My answer:

**R31. 🔴 How accurate is the card matching? What are your precision/recall or top-k numbers?**
- Why tricky: "matching quality checks" is mentioned, but there are no numbers.
- My answer:

**R32. 🔴 What mAP does your YOLOv8 model reach? How much data have you labelled?**
- Why tricky: work in progress, no metrics on file.
- My answer:

**R33. 🔴 Have you built a production RAG system? Chunking, hybrid search, reranking, evaluation?**
- Why tricky: RAG is rated 1 in my toolbox. The only RAG on file is this site's BM25 chat.
- My answer:

**R34. 🔴 Have you built agents? Tool-calling loops, planning, LangChain/LangGraph or similar?**
- Why tricky: the MCP server for ÖKFB is planned, not built, and the card-game judge is a dream project. The MCP + vision stream setup is the closest.
- My answer:

**R35. 🔴 Have you fine-tuned an LLM (LoRA, SFT, DPO)?**
- Why tricky: none on file. YOLOv8 training on my own data is the closest.
- My answer:

**R36. 🟡 Explain how transformers and attention work.**
- Why tricky: theory isn't covered anywhere in the knowledge base. Prepare a clear 2-minute explanation.
- My answer:

**R37. 🟡 Explain how DINOv2 was trained, and why its embeddings work for your use case.**
- My answer:

**R38. 🟡 How would you fine-tune DINOv2 or improve matching when it fails on near-identical cards?**
- My answer:

**R39. 🔴 How do you defend against prompt injection?**
- Could draw on: the system prompt in `api/ask.js`, structured outputs (the model can only choose among facts), permission checks staying in the backend for MCP.
- My answer:

**R40. 🟡 How do you handle LLM latency? Streaming, caching, model choice?**
- My answer:

**R41. 🟡 Have you served models on GPUs? Batching, quantisation, inference cost per request?**
- My answer:

**R42. 🟡 MLOps: experiment tracking, model registry, drift monitoring?**
- My answer:

**R43. 🟡 How many users read the AI previews? What's the cost per article?**
- Why tricky: scale and cost of the AI features aren't quantified anywhere.
- My answer:

**R44. 🟡 When would you use embeddings vs BM25 vs hybrid search?**
- My answer:

**R45. 🟡 Python has only been a production language for you since 2025 (THATSIT!). How deep is your Python?**
- My answer:

**R46. 🟡 How do you keep up with AI developments?**
- My answer:

---

## 4. Engineering depth

**R47. 🔴 Design a system for millions of users / high traffic.**
- Why tricky: the largest documented scale is 8,000 players, 30,000 app users and 2M listings. No high-traffic system on file.
- My answer:

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
- My answer:

**R52. 🟡 Why Swift/Vapor for the backend? Would you choose it again?**
- Why tricky: a niche server choice, and the reasons aren't documented.
- My answer:

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
- My answer:

**R58. 🟡 SQL depth: query optimisation, indexing, transactions?**
- Why tricky: PostgreSQL is rated 2, and MongoDB is the main database.
- My answer:

**R59. ⚪ Security: authentication, OWASP, secrets management, GDPR?**
- Could draw on: signed links, permissions, not publishing references with personal data.
- My answer:
