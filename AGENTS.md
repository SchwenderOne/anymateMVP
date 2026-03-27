# AGENTS.md

This file defines repo-specific rules for future agents working on this MVP.

## Project Context

- Stack: Vite + React + TypeScript + Tailwind CSS v4.
- Main screen shell lives in:
  - `src/App.tsx`
  - `src/components/Header.tsx`
  - `src/components/Sidebar.tsx`
  - `src/components/CanvasArea.tsx`
- Shared first-screen values live in `src/constants/firstScreenTokens.ts`.
- Local first-screen assets live in `src/constants/firstScreenAssets.ts` and `src/assets/first-screen/`.

## Source Of Truth

- Figma is the visual source of truth for the current MVP screen.
- Match the relevant Figma node visually when asked to refine the screen.
- Preserve the rendered look unless the task explicitly asks for a visual change.

## Asset Rules

- Never leave runtime dependencies on temporary asset sources.
- Forbidden:
  - `localhost:3845`
  - `figma.com/api/mcp/asset`
  - any remote runtime image/icon dependency for core UI assets
- Required:
  - download/export visible Figma assets
  - check them into `src/assets/...`
  - reference them through a local typed asset module
- Remove dead generated asset entries instead of keeping broad Figma export dumps.

## Styling Rules

- Prefer extending `src/constants/firstScreenTokens.ts` before adding repeated one-off values.
- Keep simple geometry in code/CSS where practical.
- Use local SVG assets when the exact Figma silhouette materially affects the UI.
- Do not replace precise local assets with approximate icon-library substitutes unless explicitly requested.

## Typography

- Use bundled Aeonik Pro from the local `fonts/` folder.
- Do not assume the font is installed on the machine.
- Keep `src/index.css` as the font-loading source of truth.

## Refactor Expectations

- Keep components small and presentational where possible.
- Avoid reintroducing a single monolithic generated component.
- Preserve the current screen shell and route structure unless the task requires a broader rework.

## Validation Before Finishing

- Run:
  - `npm run build`
  - `npm run lint`
- Scan for forbidden asset URLs:
  - `rg -n "localhost:3845|figma.com/api/mcp/asset" src dist`
- If assets or layout changed, do a quick visual sanity check against the relevant Figma node.

## Notes For Future Sessions

- `package.json` is intentionally small.
- `package-lock.json` is large because npm stores the fully resolved dependency tree there.
