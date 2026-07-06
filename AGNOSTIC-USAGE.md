# Agnostic Usage (Cursor, Windsurf, v0, Bolt)

Claude Design Premium was originally designed for Anthropic's Claude Design Web canvas. However, the exact same rules, design restrictions, and anti-slop guidelines can be loaded into any modern IDE or AI agent (like Cursor, Windsurf, v0, or Bolt) as a **System Prompt**.

## How to port these rules to your IDE:

1. **System Prompt / `.cursorrules`**: 
   Instead of uploading a ZIP file to a web canvas, copy the contents of `CLAUDE.md` and `DESIGN.md` into your `.cursorrules` or `.windsurfrules` file at the root of your project.

2. **Skills as Markdown References**:
   Modern IDE agents can read markdown files automatically. Keep the `skills/` folder at your project root. In your system prompt, explicitly tell the agent: 
   *"Before generating UI or writing frontend code, read the relevant files in the `/skills` directory to understand the design constraints."*

3. **Ignore the `.mjs` Scripts**:
   The scripts in the `scripts/` folder are specifically to help Claude Design Web bootstrap itself. In a standard IDE, you don't need them because your IDE already understands your file system perfectly. Focus exclusively on the `.skill.md` files.

4. **The Anti-Slop Injection**:
   Make sure you always reference `skills/full-output-enforcement.skill.md` in your `.cursorrules` so the AI never truncates code with `// ... rest of the code`.

## Token Economy (Anthropic API / External IDEs)

If you are using Claude via API (e.g. Cursor, Windsurf) instead of the Claude Design Web interface, you need to manage token consumption strictly due to the massive size of a full Design System.

1. **Prompt Caching (Static Prefix Rule)**: 
   Anthropic models discount API pricing heavily for cached tokens. Cache only works if the **order of the prefix never changes**. 
   - **DO:** Put `CLAUDE.md`, `DESIGN.md`, `BOUND_DS.json` and all `.skill.md` files at the **absolute top** of your System Prompt or `.cursorrules`. 
   - **DON'T:** Re-upload or @mention the `BOUND_DS.json` in the middle of the chat. This changes the prefix and breaks the cache, forcing you to pay full price for thousands of tokens again.

2. **Context Flushing (Chat Reset)**:
   - When you finish generating `Screen_A.html`, **do not** ask the AI to generate `Screen_B.html` in the same chat.
   - The AI will drag the entire HTML of Screen A into the context window to build Screen B. This wastes thousands of dynamic tokens.
   - **Rule:** Start a new chat (clear context) for every new major component or screen. The Prompt Cache will handle the Design System cost, while your dynamic chat remains lean and cheap.
