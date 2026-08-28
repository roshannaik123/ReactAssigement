# React Assignment

A React and Vite application containing two multi-step workflows:

- **Project creation wizard** at `/` with four steps for project details, billing, notifications, and access settings.
- **Account creation wizard** at `/task2` with three steps for profile, business information, and additional users.

Form drafts are automatically saved in the browser. Completed projects and accounts are stored in `localStorage`, so no backend or database is required to run the application locally.

## Requirements

- Node.js 18 or newer
- npm

## Getting started

1. Install dependencies:

	```bash
	npm install
	```

2. Start the development server:

	```bash
	npm run dev
	```

3. Open the URL printed by Vite, usually `http://localhost:5173`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |

## Project structure

```text
src/
  components/       Shared form and layout components
  hooks/            Reusable React hooks
  layout/           Wizard layouts
  pages/Task1/      Project creation wizard
  pages/Task2/      Account creation wizard
```

## Data storage

The app uses browser `localStorage` for client-side persistence:

- `projectDraft` and `accountDraft` store incomplete form data.
- `projects` and `accounts` store completed submissions.

To clear saved data, remove the site data for the local development URL in your browser.
