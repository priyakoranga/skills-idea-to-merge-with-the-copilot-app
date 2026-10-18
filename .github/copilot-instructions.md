# Copilot instructions

Project context Copilot should apply to every session in this repository.

## Stack

- Framework: Astro (static output).
- Language: TypeScript.
- Styling: plain CSS in the base layout.

## Conventions

- Keep components small and focused.
- Prefer semantic HTML and accessible markup.
- Do not close, or add closing keywords for, the exercise walkthrough issue (issue #1) in any pull request. The exercise's GitHub Actions workflows manage that issue. When you open a pull request for app work, link only the specific app work-item issue you are implementing.

## Persistence and hydration rules

- Bookmarks are persisted in the browser with `localStorage`, so saved state survives page reloads without server-side storage.
- Browser-only code must run behind a `client:load` boundary (or other client-only Astro execution path). Do not access `localStorage` or other browser APIs during SSR/static generation, because the static build must never touch browser-only code.
