<p align="center">
  <img src="public/logo.svg" alt="UpTask" width="380">
</p>

<p align="center">
  <strong>Collaborative project and task management for small teams.</strong>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white">
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white">
  <img alt="Drizzle ORM" src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?logo=drizzle&logoColor=black">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-blue">
</p>

---

## Overview

UpTask lets a team plan work as **projects**, break each project into **tasks**, move those tasks across a kanban board, and discuss them through **notes**. Every project has a manager who owns it and a set of collaborators who work on it, with permissions enforced on the server.

> [!NOTE]
> **Project status: early development.** The application shell is scaffolded and the stack decisions below are settled. Feature work is in progress — see the [Roadmap](#roadmap) for what is and isn't built yet.

## Features

**Accounts**
- Registration with email confirmation, plus resend of the confirmation email
- Login, logout, and session management
- Forgot-password and reset-password flows
- Profile editing and password change

**Projects**
- Create, edit, and delete projects (name, client, description)
- Dashboard listing every project the user manages or collaborates on
- Deleting a project cascades to its tasks and their notes

**Tasks**
- Kanban board across five columns: Pending, On Hold, In Progress, Under Review, Completed
- Drag and drop to change status
- Task detail with description and full edit
- Change history — who moved the task to which status, and when

**Team**
- Look up users by email and add them to a project
- List and remove collaborators
- Manager-only actions (edit/delete project, create/edit/delete tasks) enforced server-side; collaborators can move tasks and write notes

**Notes**
- Threaded notes per task
- Authors can delete their own notes

## Tech stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) | Server Components, Route Handlers, Server Actions |
| UI | [React 19](https://react.dev) + [Tailwind CSS 4](https://tailwindcss.com) | CSS-first Tailwind config in `app/globals.css` |
| Forms | [React Hook Form](https://react-hook-form.com) | Paired with Zod via `@hookform/resolvers` |
| Validation | [Zod](https://zod.dev) | Single schema per operation, reused client and server |
| Auth | [Better Auth](https://better-auth.com) | Email/password, verification, reset, sessions |
| ORM | [Drizzle ORM](https://orm.drizzle.team) | Typed schema, SQL-first, `drizzle-kit` migrations |
| Database | [PostgreSQL](https://www.postgresql.org) | Foreign keys and cascades enforced in the DB |
| Language | [TypeScript](https://www.typescriptlang.org) | `strict` mode |
| Linting | [ESLint 9](https://eslint.org) + `@stylistic` | Flat config; double quotes, semicolons required |
| Package manager | [pnpm](https://pnpm.io) | Enforced by a `preinstall` hook |

## Data model

```mermaid
erDiagram
    USER ||--o{ PROJECT : manages
    USER ||--o{ MEMBERSHIP : "collaborates via"
    PROJECT ||--o{ MEMBERSHIP : has
    PROJECT ||--o{ TASK : contains
    TASK ||--o{ NOTE : has
    TASK ||--o{ STATUS_CHANGE : "records"
    USER ||--o{ NOTE : writes
    USER ||--o{ STATUS_CHANGE : "triggers"

    USER {
        uuid id PK
        text name
        text email UK
        bool email_verified
    }
    PROJECT {
        uuid id PK
        text project_name
        text client_name
        text description
        uuid manager_id FK
    }
    MEMBERSHIP {
        uuid project_id FK
        uuid user_id FK
    }
    TASK {
        uuid id PK
        uuid project_id FK
        text name
        text description
        enum status
    }
    NOTE {
        uuid id PK
        uuid task_id FK
        uuid created_by FK
        text content
    }
    STATUS_CHANGE {
        uuid id PK
        uuid task_id FK
        uuid user_id FK
        enum status
    }
```

Project membership and task status history are modelled as join tables rather than embedded lists, so both are enforced by foreign keys. Deleting a project cascades to its tasks, and deleting a task cascades to its notes and status history.

## Getting started

### Prerequisites

- **Node.js 20+** (developed on 24)
- **pnpm 11+** — `npm install -g pnpm`
- **PostgreSQL 15+** — a local instance, a Docker container, or a hosted database (Neon, Supabase, Railway)
- An **SMTP account** for transactional email (Resend, Mailtrap, or any SMTP provider)

### Installation

```bash
git clone <your-repo-url> uptask
cd uptask
pnpm install
```

> This repository only allows pnpm. `npm install` and `yarn` are blocked by the `preinstall` hook.

### Environment variables

Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string, e.g. `postgresql://user:pass@localhost:5432/uptask` |
| `BETTER_AUTH_SECRET` | Random 32+ character secret. Generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Base URL of the app — `http://localhost:3000` in development |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port, typically `587` |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password |
| `EMAIL_FROM` | From address on outgoing mail, e.g. `UpTask <no-reply@uptask.dev>` |

### Database setup

```bash
pnpm db:push       # push the Drizzle schema to your database (development)
pnpm db:studio     # optional: browse the data in Drizzle Studio
```

For anything deployed, generate and apply versioned migrations instead:

```bash
pnpm db:generate   # write a migration from schema changes
pnpm db:migrate    # apply pending migrations
```

### Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint and apply fixes |
| `pnpm db:push` | Sync the Drizzle schema to the database |
| `pnpm db:generate` | Generate a migration from schema changes |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:studio` | Open Drizzle Studio |

> Scripts prefixed with `db:` land with the Drizzle setup — see the [Roadmap](#roadmap).

## Project structure

```
app/
  globals.css          Tailwind entry point and design tokens
  icon.svg             App icon (favicon)
  layout.tsx           Root layout
  page.tsx             Landing page
public/
  logo.svg             Full logo (mark + wordmark)
eslint.config.mjs      Flat ESLint config
```

The structure grows as features land — expect `app/(auth)` and `app/(app)` route groups, a `db/` directory for the Drizzle schema and client, `lib/` for the Better Auth setup, `schemas/` for shared Zod schemas, and `components/` for the UI.

## Code style

Enforced by ESLint, not by convention:

- **Double quotes** — `@stylistic/quotes` (`avoidEscape` is on, so `'He said "hi"'` is fine)
- **Semicolons required** — `@stylistic/semi`
- Double quotes in JSX attributes — `@stylistic/jsx-quotes`

Both rules are auto-fixable; run `pnpm lint:fix` before committing.

## Roadmap

- [x] Next.js 16 + Tailwind CSS 4 scaffold
- [x] Branding — logo, app icon, color tokens
- [x] ESLint flat config with enforced formatting rules
- [ ] Drizzle schema, database client, and migrations
- [ ] Better Auth — registration, email verification, login, password reset
- [ ] Shared Zod schemas and React Hook Form integration
- [ ] Transactional email templates
- [ ] Projects — CRUD and dashboard
- [ ] Team management and server-side authorization policies
- [ ] Tasks — CRUD, kanban board, drag and drop
- [ ] Task status history
- [ ] Notes
- [ ] Profile and password management
- [ ] Deployment

## License

[MIT](LICENSE)
