# AI work

## In production
1. **Fact-grounded AI match previews and matchday reviews (ÖKFB, German)**
   - Backend computes facts: recent form, table position, head-to-head, scorers, discipline, confirmed absences, with a historical cutoff so a preview never uses results from after the match. Incomplete rounds and awarded results handled explicitly.
   - The model only selects and orders verified facts and title candidates through strict JSON Schema outputs; the backend renders the article. It can't invent results.
   - Persistent jobs: bounded concurrency across replicas, atomic claims, renewable leases, retries with backoff, idempotency keys.
   - Provenance: each article records source snapshot, model, prompt version, selected facts and token usage; revision-safe publishing.
   - Human in the loop: admins review, edit, publish or delete each article.
   - Provider behind an interface: currently an OpenAI-compatible adapter; football logic doesn't depend on it.
2. **Generated kit images (ÖKFB):** jersey + layout reference as image inputs; validates transparent PNG (structure, CRCs, visible pixels, transparent edges); preview before saving to Firebase; rejects stale saves.
3. **Vision card matching (THATSIT!):** DINOv2 embeddings + Qdrant vector search behind FastAPI; containerised; 2M listings vs 400k cards.

## Building now
- AI match analysis: YOLOv8 trained on my Label Studio annotations, connected to my backend; MCP server gives a vision stream model tools and match context. Events, positions and identity in progress.

## Planned
- Custom MCP server in front of the ÖKFB Vapor API, permission-scoped tools, any model provider. Football rules, accounting and permissions stay in the backend. Ideas: league assistant, registration assistant explaining missing documents, referee report drafts, postponement scheduling help, finance/analytics questions with sources, rules assistant with cited regulations.
- AI judge for trading card games (dream project).

## RAG
- This site's chat: question → BM25 retrieval over my knowledge base → top passages as context → model answers only from them → answer with sources. Without a model it shows the best passages. Same idea as the previews: retrieve or compute the facts first, let the model only phrase them.
- Embedding-based vector search (DINOv2 + Qdrant) at THATSIT!.

## AI-assisted engineering
- Claude Code daily: prototyping, test writing, refactoring. "Building faster without lowering the bar."

## Cost and reliability
- AI and cloud cost control (THATSIT! budget includes AI running costs; token usage recorded per article), matching quality checks, monitoring, documentation.

## Principles
- "A model is only useful once it runs reliably behind an API."
- "Compute what you can, let the model decide only what it must."
- "Packaging a model, giving it a clean API and keeping it reliable in operation is where most of the work in applied AI is."
