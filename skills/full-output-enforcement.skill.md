# full-output-enforcement.skill.md

## Name

Full-Output Enforcement

## Purpose

Overrides default LLM truncation behavior and "laziness". Enforces complete code generation, bans placeholder patterns, and handles token-limit splits cleanly. Ensures Claude always delivers complete, executable UI files.

## When to use

- ALWAYS active during "Any UI generation, modification, or review".
- When delivering any code snippet, HTML structure, or configuration file.
- Automatically enforced by `CLAUDE.md`.

## Procedure

1. **Baseline**: Treat every task as production-critical. A partial output is a broken output. Do not optimize for brevity — optimize for completeness. If the user asks for a full file, deliver the full file. 
2. **Scope the deliverables**: Count how many distinct deliverables are expected (files, functions, sections). Lock that number.
3. **Build completely**: Generate every deliverable completely. No partial drafts, no "you can extend this later."
4. **Cross-check before output**: Verify your response contains NO BANNED PATTERNS. If it does, rewrite it completely before sending.

### Banned Output Patterns (Never produce these)

- **In code blocks**: `// ...`, `// rest of code`, `// implement here`, `// TODO`, `/* ... */`, `// similar to above`, `// continue pattern`, `// add more as needed`, bare `...` standing in for omitted code.
- **In prose**: "Let me know if you want me to continue", "I can provide more details if needed", "for brevity", "the rest follows the same pattern", "similarly for the remaining".
- **Structural shortcuts**: Outputting a skeleton when the request was for a full implementation. Describing what code should do instead of writing it.

### Handling Long Outputs (Approaching Token Limit)

When a response approaches the maximum token limit:
- Do NOT compress remaining sections to squeeze them in.
- Write at full quality up to a clean breakpoint (end of a function, end of a file).
- End the message explicitly with: `[PAUSED — Send "continue" to resume from: <next section name>]`
- On "continue", pick up exactly where you stopped. No recap, no repetition.

## Output contract

- 100% complete, un-truncated code blocks.
- Explicit verification: "Full output generated without truncation."

## Example invocation

```text
Run full-output-enforcement on this UI modification to ensure no HTML or CSS is truncated.
```
