# AGENTS.md

## Project Context

This is a SignU app repository. Treat it as user-owned application code, keep changes focused on the user's request, and preserve existing project conventions.

Start with `README.md` for local setup, environment variables, and publish workflow.

## Key Files

- `src/`: frontend application source.
- `src/api/authClient.js`: frontend auth client.
- `vite.config.js`: Vite config setup.
- `.env.local`: local-only environment values; never commit secrets.

## Working Notes

- Use `npm run dev` for frontend development.
- `vite.config.js` handles Vite alias resolution and plugin setup.
- Run the relevant checks from `package.json` before finishing code changes.
