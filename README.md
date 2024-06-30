# 📷 `EXIF` Photo Blog
Candid Canvas is a photo blog platform that allows users to upload, organize, and share photos with their original camera data (EXIF). It features built-in authentication, photo organization by tags, infinite scroll, light/dark mode, automatic OG image generation, and more.

Demo App
-
https://candid-canvas.vercel.app/

Features
-
- Built-in auth
- Photo upload with EXIF extraction
- Organize photos by tag
- Infinite scroll
- Light/dark mode
- Automatic OG image generation
- CMD-K menu with photo search
<!-- - Experimental support for AI-generated descriptions -->
<!-- - Support for Fujifilm simulations -->

<img src="/readme/og-image-share.png" alt="OG Image Preview" width=600 />

Installation
-
### 1. Deploy to Vercel

1. Clone and deploy this repo with vercel.
2. Add required storage ([Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart#create-a-postgres-database) + [Vercel Blob](https://vercel.com/docs/storage/vercel-blob/quickstart#create-a-blob-store)) as part of template installation
3. Configure environment variables from project settings:
   - `NEXT_PUBLIC_SITE_TITLE` (e.g., My Photos)
   - `NEXT_PUBLIC_SITE_DOMAIN` (e.g., photos.domain.com)
   - `NEXT_PUBLIC_SITE_DESCRIPTION` (optional—mainly used for OG metadata)

### 2. Setup Auth

1. [Generate auth secret](https://generate-secret.vercel.app/32) and add to environment variables:
   - `AUTH_SECRET`
2. Add admin user to environment variables:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
3. Trigger redeploy
   - Visit project on Vercel, navigate to "Deployments" tab, click ••• button next to most recent deployment, and select "Redeploy"

### 3. Upload your first photo 🎉
1. Visit `/admin`
2. Sign in with credentials supplied in Step 2
2. Click "Upload Photos"
3. Add optional title
4. Click "Create"

Develop locally
-
1. Clone code
2. Run `pnpm i` to install dependencies
3. If necessary, install [Vercel CLI](https://vercel.com/docs/cli#installing-vercel-cli) and authenticate by running `vercel login`
4. Run `vercel link` to connect the CLI to your project
5. Run `vercel dev` to start dev server with Vercel-managed environment variables
