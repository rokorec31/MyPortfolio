# MyPortfolio

A modern personal portfolio website with a protected admin CMS. Public visitors browse projects on a dark, animated landing site; the site owner signs in with Google to manage project content through an admin panel backed by Firebase.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4, custom dark theme (`#000103` base, `#7796ff` primary) |
| Auth | Firebase Authentication (Google SSO only) |
| Database | Cloud Firestore |
| File storage | Firebase Storage (project images) |
| Markdown | react-markdown |
| Hosting | Firebase App Hosting |

## Features

### Public site
- **Home** — full-viewport hero: aurora background blobs, grid overlay, glowing particles, gradient name, animated stat cards with count-up, dual skill-tag marquees, scroll indicator.
- **Projects** (`/projects`) — responsive card grid (1/2/3 columns) fetched live from Firestore; glass-morphism cards with hover glow and image zoom. Cards without an image show a styled placeholder.
- **Project detail** (`/projects/[id]`) — year/tech tags, hero image (hidden when absent), Markdown-rendered content.
- **About** (`/about`) — intro glass card with contact links, categorized skill badges.
- Entrance animations (blur + translate fade-in), scroll-triggered reveals (IntersectionObserver), floating pill navbar that turns glassy on scroll. `prefers-reduced-motion` respected.

### Admin CMS (`/admin`)
- **Google SSO only** — email/password disabled.
- **Hard-coded admin whitelist** — only the email in `src/lib/admin.ts` may enter; other accounts are redirected to `/unauthorized`. Client checks gate the UI; Firestore/Storage security rules enforce the same whitelist server-side.
- **Project CRUD** — list with edit/delete, create/edit form: title, year, short description, Markdown content, comma-separated tech tags, cover image.
- **Image upload** — upload to Firebase Storage (≤5 MB, image types only) with progress bar, or paste an external URL. Images are optional and can be cleared; replaced/cleared uploads are garbage-collected from Storage.
- **One-click seeding** of sample projects when the database is empty.

## Getting Started

### Prerequisites
- Node.js 20+
- A Firebase project on the **Blaze** plan (required for Storage and App Hosting; free-tier quotas apply)

### 1. Install

```bash
npm install
```

### 2. Configure Firebase

In the [Firebase Console](https://console.firebase.google.com):

1. **Authentication** → enable the **Google** sign-in provider.
2. **Firestore Database** → create a database (production mode).
3. **Storage** → enable the default bucket.
4. **Project settings → General → Your apps** → register a Web app and copy the config.

### 3. Environment variables

```bash
cp .env.local.example .env.local
```

Fill in the six `NEXT_PUBLIC_FIREBASE_*` values from your web app config. These values are public by design (they ship in the client bundle); data protection comes from security rules.

### 4. Security rules

Paste the contents of the repo's rule files into the console and publish:

- `firestore.rules` → **Firestore Database → Rules** — public read on `projects`, writes only for the verified admin email.
- `storage.rules` → **Storage → Rules** — public read under `projects/`, admin-only writes limited to images under 5 MB.

> **Changing the admin:** update the email in `src/lib/admin.ts`, `firestore.rules`, and `storage.rules` (all three places).

### 5. Run

```bash
npm run dev
```

Open http://localhost:3000. Visit `/admin`, sign in with the whitelisted Google account, and use **Seed sample data** to populate the database.

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home (hero + featured projects)
│   ├── about/page.tsx            # About page
│   ├── projects/page.tsx         # Project grid (Firestore-backed)
│   ├── projects/[id]/page.tsx    # Project detail with Markdown
│   ├── login/page.tsx            # Google SSO login
│   ├── unauthorized/page.tsx     # Access-denied page
│   └── admin/
│       ├── layout.tsx            # Auth guard (redirects non-admins)
│       ├── page.tsx              # Dashboard: project table, delete, seed
│       └── projects/
│           ├── new/page.tsx      # Create form
│           └── [id]/edit/page.tsx# Edit form
├── components/
│   ├── Navbar.tsx                # Floating pill nav, scroll-aware
│   ├── Hero.tsx                  # Animated hero section
│   ├── ProjectCard.tsx           # Glass card with placeholder fallback
│   ├── ProjectForm.tsx           # Admin create/edit form + image upload
│   ├── FeaturedProjects.tsx      # Home page featured grid
│   └── Reveal.tsx                # Scroll-reveal wrapper (IntersectionObserver)
├── context/AuthContext.tsx       # Firebase auth state provider
└── lib/
    ├── firebase.ts               # Firebase app/auth/db/storage init
    ├── admin.ts                  # Admin email whitelist
    ├── projects.ts               # Project type + sample seed data
    ├── projectsRepo.ts           # Firestore CRUD
    └── uploadImage.ts            # Storage upload/delete helpers
firestore.rules                   # Firestore security rules
storage.rules                     # Storage security rules
apphosting.yaml                   # Firebase App Hosting config + env vars
```

## Deployment

Deployed with **Firebase App Hosting** (native Next.js support, auto-deploy on push):

1. Push the repo to GitHub.
2. Firebase Console → **App Hosting → Get started** → connect the repo, set live branch to `main`, enable automatic rollouts.
3. Environment variables are provided by `apphosting.yaml` — no console configuration needed.
4. After the first deploy, add the generated `*.hosted.app` domain (and any custom domain) to **Authentication → Settings → Authorized domains**, or Google sign-in will fail with `auth/unauthorized-domain`.

Subsequent deploys: just `git push` — App Hosting rebuilds and rolls out automatically.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
