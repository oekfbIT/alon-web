# Ways of working

## The route through every project
1. **Problem:** start from the people who will use it (a referee entering a score on a phone, a receptionist checking in a guest, a collector listing a card). Write the problem down in their words.
2. Workflow · 3. Architecture · 4. Build · 5. Test · 6. Release · 7. Operate · 8. Improve

## Engineering principles (from my case studies)
- When people rely on a tool live, on a pitch, reliability is the feature.
- When releasing is boring, teams release more often and with less risk.
- The best automation is invisible to the guest and obvious to the staff.
- Packaging a model, giving it a clean API and keeping it reliable is where most of applied AI is.
- Compute what you can, let the model decide only what it must.
- Design for the unglamorous parts first: correct data, idempotent money, recoverable jobs, documentation someone else can follow.
- Buy, integrate, then build.
- Quality as a gate, not a phase.

## Lessons learned
- adesso: being engineer and interim PO showed me how much of delivery is the bridge between users and the team; a clear specification saves more time than any pipeline.
- Bridge: in an operation that never closes, half the work is agreement on what changes, when, and who owns it.
- ÖKFB: owning a platform from board meeting to production incident changes how you build.
- THATSIT!: the interesting problems in applied AI are often data, interfaces, cost and behaviour when the model isn't sure.
- Mentoring: explaining my work to someone new is the fastest way to find its weak parts.
- Design background: start from the person holding the thing, and leave out what they don't need.
