# Western Engineering AutoPilot (WEAP) Website

## Tech Stack

* **Frontend**: React 18, TypeScript, Vite
* **Routing**: React Router (v7)
* **Icons**: Lucide Icons
* **Hosting & Deployment**: Vercel

---

## Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

---

## Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with hot module reloading. |
| `npm run build` | Compiles TypeScript and builds optimized production bundles into `dist/`. |
| `npm run preview` | Runs a local web server to preview the production build in `dist/`. |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues. |

---

## Project Structure

```
.
├── public/                 # Static assets (images, logos, favicon)
├── src/
│   ├── assets/             # Team portrait WebP images and graphics
│   ├── components/         # React page and UI components
│   │   └── design-system/  # Reusable design system components
│   ├── hooks/              # Custom React hooks
│   ├── styles/             # Global CSS design tokens and theme variables
│   ├── stylesheets/        # Component-level stylesheets
│   ├── types/              # TypeScript interface definitions
│   ├── utils/              # Utility helpers, animations, and analytics
│   ├── App.tsx             # Main router and route definitions
│   └── main.tsx            # React application entry point
├── docs/
│   └── deployment.md       # Vercel deployment and domain guide
├── index.html              # HTML entry template
├── vite.config.ts          # Vite build configuration
└── vercel.json             # Vercel SPA routing rewrite rules
```

---

## Deployment

The website is continuously deployed on **Vercel**. For deployment details, SPA rewrite configuration, and custom domain setup, see [`docs/deployment.md`](./docs/deployment.md).

