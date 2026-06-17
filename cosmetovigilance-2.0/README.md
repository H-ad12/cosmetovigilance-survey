# Cosmetovigilance 2.0 Backend & Survey Platform

A high-performance, containerized medical survey platform designed to study and log cosmetic safety, medical symptoms, and adverse effects. This platform is powered by a modern, full-stack Postgres + Express + React architecture.

## Architecture Architecture

This application has been migrated from Google Sheets to a robust, persistent relational database architecture:

*   **Frontend**: Built on React 19, TypeScript, and Tailwind CSS. Animated transitions are powered by `motion/react`.
*   **Database**: PostgreSQL hosted on Google Cloud SQL, organized and queried through **Drizzle ORM** for full type-safety and robust schema migrations.
*   **Backend Server**: A lightweight Node/Express server running on Vite middleware during development and compiled to standard CommonJS format (`dist/server.cjs`) for low-latency Cloud Run containers in production.
*   **Authentication & Security**: Replaced Firebase Auth dependencies with high-performance, in-memory active session tokens mapped dynamically via `/api/admin/login` and secure LocalStorage handling to bypass any starter-tier permission issues.

---

## Technical Specifications

### Multi-tier Database Schemas (`/src/db/schema.ts`)
The relational architecture features two collections:
1.  **Response Records**: Stores participant demographics (age, gender, study year, department, name) alongside JSONB-mapped multi-choice questions (`answers`), and a server-verified database timestamp.
2.  **Administrator Identity List**: Holds administrative accounts if needed, though login authentication uses secure backend environment settings with a default account backup.

```typescript
export const responses = pgTable('responses', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  department: text('department').notNull(),
  studyYear: text('study_year').notNull(),
  gender: text('gender').notNull(),
  age: text('age').notNull(),
  answers: jsonb('answers').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Admin Dashboard (`/admin`)

An elegant, protected administrator panel sits at `/admin`. It interacts with the backend over authenticated RPC queries `Bearer {token}` and remains isolated from standard users.

### Core Dashboard Capabilities:
*   **Aggregated Analytics**: Shows at-a-glance active survey user counts.
*   **Search & Dynamic Filters**: Fully filterable search matching any participant's full name or university department in real-time.
*   **Bilingual Answers Modal**: Maps dynamic question IDs to their human-friendly English titles with correct mappings of multi-checkbox selections.
*   **Universal CSV Exporter**: Client-side compiled exporter to instantly download clinical study spreadsheets containing all answers aligned perfectly into correct columns.

### Access Credentials
*   **Standard Username / Email**: `admin@survey.app` (or user's signed-in email address)
*   **Default Password**: `AdminSecure2026!`

*(Credentials can be customized by defining `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your secret environment configuration.)*

---

## Local Development & Setup

### 1. Requirements
Ensure you define standard Cloud SQL connection variables in your environment or local `.env`:
*   `SQL_HOST` (e.g. host IP or proxy connection string)
*   `SQL_USER`
*   `SQL_PASSWORD`
*   `SQL_DB_NAME`

### 2. Run Scripts
```bash
# Start Vite + Express development server
npm run dev

# Generate & bundle static client code + backend package
npm run build

# Standalone start (for Cloud Run host container)
npm run start
```
