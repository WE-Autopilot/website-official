# Deployment Guide (Vercel)

This project is deployed as a static Single-Page Application (SPA) on [Vercel](https://vercel.com).

## 1. Architecture & Build Setup

* **Framework**: React 18 + TypeScript + Vite
* **Hosting**: Vercel (Global Edge Network)
* **Build Command**: `npm run build`
* **Output Directory**: `dist`

## 2. Vercel Configuration (`vercel.json`)

Because this application uses client-side routing via React Router, [`vercel.json`](../vercel.json) routes all URL requests to `index.html`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

> **Note**: This prevents 404 errors when visitors directly refresh or navigate to deep links such as `/join`, `/team`, or `/sponsors`.

## 3. Continuous Deployment (CI/CD)

1. **Production Branch**: Any push or merge into the `main` branch automatically triggers a production deployment on Vercel.
2. **Preview Deployments**: Opening a Pull Request automatically generates an isolated preview URL for testing changes before merging.

If you need the Vercel instance managed for any reason that CD doesn't already handle please reach out to the website codeowner.

## 4. Local Production Preview

To test the exact production build locally before committing:

```bash
# 1. Build the production bundle
npm run build

# 2. Preview the built dist/ folder locally
npm run preview
```
