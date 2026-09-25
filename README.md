# Codewatch

A production-grade issue tracker for engineering teams. Built to practice a modern Next.js 14 App Router stack end to end: typed forms, server-side data fetching, protected routes, and instrumented production error reporting.

## What it does

- **Issue lifecycle** — create, edit, delete issues with status (`OPEN`, `IN_PROGRESS`, `CLOSED`).
- **Rich descriptions** — Markdown editor (SimpleMDE) with server-rendered Markdown preview.
- **Assignment** — assign an issue to a specific developer from the authenticated user pool.
- **Dashboard** — at-a-glance issue counts and status breakdown, rendered with Recharts.
- **Authentication** — NextAuth with Google OAuth; sessions persisted through the Prisma adapter.
- **Access control** — issue create/edit/delete routes are auth-gated at the middleware layer.
- **Instrumented in production** — Sentry captures runtime errors across client, server, and edge.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | MySQL via Prisma |
| Auth | NextAuth + Prisma adapter (Google OAuth) |
| UI | Radix UI + Tailwind CSS |
| Forms | React Hook Form + Zod validation |
| Data fetching | TanStack Query |
| Markdown | react-simplemde-editor + react-markdown |
| Charts | Recharts |
| Error monitoring | Sentry (client, server, edge configs) |

## Data model

Four Prisma models — `Issue`, `User`, `Account`, `Session` — with issue-to-developer as a nullable one-to-many. Status is an enum (`OPEN`, `IN_PROGRESS`, `CLOSED`), and timestamps are auto-managed by Prisma.

## Getting started

```bash
git clone https://github.com/pratyushkr9420/codewatch.git
cd codewatch
npm install

# Configure environment
cp .env.sample .env
# Fill in: DATABASE_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
#         NEXT_PUBLIC_SENTRY_DSN

# Push schema to the database
npx prisma migrate deploy

# Run the dev server
npm run dev
```

Open http://localhost:3000.

## Project layout

```
app/
  ├── api/            # Route handlers (NextAuth, issues CRUD)
  ├── auth/           # Sign-in / sign-out flows
  ├── issues/         # List, detail, new, edit pages
  ├── components/     # Shared UI
  └── validationSchemas.ts  # Zod schemas shared client + server
prisma/
  ├── schema.prisma
  └── migrations/
middleware.ts         # Route-level auth guards
sentry.*.config.ts    # Error reporting boot for each runtime
```

## Why it exists

Codewatch is a study project — a personal reference implementation of a full-stack Next.js 14 App Router application with authentication, typed data access, form validation, and production instrumentation wired end-to-end. The scope is intentionally focused on the plumbing rather than the domain.
