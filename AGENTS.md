# Repo Guidelines

The following rules consolidate all guidance found in `.windsurf/rules`.

## Code Style
- Indent with **2 spaces**; tabs are disallowed.
- Use **camelCase** for variables, functions and file names.
- Import internal modules using absolute paths beginning with `@/`.

## Code Quality
- Prioritise readability and maintainability over cleverness.
- Keep functions small and single-purpose.
- Leave edited files clearer than you found them.

## Test Driven Development
1. **Write a failing test first** in `__tests__/…` mirroring the code path.
2. Write only the code required to make the test pass.
3. Refactor while tests stay green.
- Every new logic or UI function requires at least one unit test before commit.
- Preferred stack: **Vitest + React Testing Library** (Jest if Vitest unavailable).

## Core Development Environment
- **NixOS** with flakes.
- Shell: **zsh**.
- Node.js **20.19.0**.
- Package manager: **pnpm 10.6.3** (npm and yarn are disallowed).
- **TypeScript strict** mode and **Tailwind CSS 4.0.14** enabled by default.
- Run `direnv reload` whenever `flake.nix` or `.envrc` changes.

### Nix Flake Guidance
- `flake.nix` tracks **nixos-unstable** using **flake-utils**.
- Key packages: `nodejs_20`, `pnpm`, `tailwindcss`.
- Tailwind is provided via Nix; avoid global npm installs.
- If the environment misbehaves, run `direnv reload`.

## Library Selection
When multiple libraries solve the same problem, choose the **most widely used and actively maintained** option unless you have a documented reason otherwise.

## Development Plans
Store design notes, spikes and architectural decisions as Markdown files in `docs/dev-plans/` — one file per initiative.

## Atomic Design Hierarchy
Component directory must follow Atomic Design tiers:
```
components/
  atoms/
  molecules/
  organisms/
  templates/
  pages/
```
Do not introduce ad‑hoc top-level component directories.

## Project Structure Reference
- `app/`          – Next.js routes, layouts and API handlers.
- `components/`   – atoms → pages per Atomic Design.
- `lib/`          – shared utilities (`api/`, `utils/`).
- `data/`         – static or generated data files.
- `docs/`         – documentation and dev‑plans.
- `public/`       – static assets.
- `__tests__/`    – mirrors component hierarchy.
- Root configs: `flake.nix`, `package.json`, `tsconfig.json`, `tailwind.config.js`.

## Responsive & Accessible UI
- Implement mobile‑first responsive layouts.
- Meet **WCAG AA** colour‑contrast, keyboard‑navigation and ARIA labelling standards.

