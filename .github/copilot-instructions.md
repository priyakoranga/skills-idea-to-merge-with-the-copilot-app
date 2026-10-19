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

- Persist bookmarks in the browser's `localStorage` under the `mona-bookmarks` key as validated `{ url, slug }` records. Treat stored data as untrusted and recover gracefully from malformed or legacy values.
- Access browser-only APIs such as `localStorage` only from an Astro inline `<script>` or a `client:load` island. Never access them in frontmatter or code that runs during static rendering/build.
