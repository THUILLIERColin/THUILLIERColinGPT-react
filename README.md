This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- OpenAI API key (get it from [OpenAI Platform](https://platform.openai.com/api-keys))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/THUILLIERColin/THUILLIERColinGPT-react.git
cd THUILLIERColinGPT-react
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and fill in your environment variables:
- `DATABASE_URL`: Database connection string
- `OPENAI_API_KEY`: Your OpenAI API key
- `JWT_SECRET`: A secure random string for JWT signing

4. Initialize the database:
```bash
npm run db:init
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

#### Steps:

1. **Push your code to GitHub** (if not already done)

2. **Go to [Vercel](https://vercel.com)** and sign in with your GitHub account

3. **Import your repository:**
   - Click "Add New Project"
   - Select your repository
   - Vercel will automatically detect Next.js

4. **Configure environment variables:**
   Add the following environment variables in Vercel project settings:
   - `DATABASE_URL`: PostgreSQL database URL (use Vercel Postgres, Neon, or another PostgreSQL provider)
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `JWT_SECRET`: A secure random string (generate with: `openssl rand -base64 32`)

5. **Add a PostgreSQL Database:**
   - Option A: Use [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
     - Go to your project → Storage → Create Database → Postgres
     - This will automatically set the `DATABASE_URL` environment variable
   
   - Option B: Use [Neon](https://neon.tech/) or [Supabase](https://supabase.com/)
     - Create a PostgreSQL database
     - Copy the connection string and add it as `DATABASE_URL` in Vercel

6. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - The build command is already configured in `package.json` as `vercel-build`

7. **Migration:**
   - The first deployment will automatically run database migrations
   - For subsequent schema changes, migrations will run automatically on each deployment

### Deploy on Railway

[Railway](https://railway.app/) is another excellent platform for deploying full-stack applications with integrated databases.

#### Steps:

1. **Push your code to GitHub** (if not already done)

2. **Go to [Railway](https://railway.app)** and sign in with your GitHub account

3. **Create a new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

4. **Add a PostgreSQL Database:**
   - In your project, click "New"
   - Select "Database" → "Add PostgreSQL"
   - Railway will create a PostgreSQL instance and provide the connection string

5. **Configure environment variables:**
   - Click on your service (web application)
   - Go to "Variables" tab
   - Add the following variables:
     - `DATABASE_URL`: Copy from the PostgreSQL service (click on Postgres → Connect → Copy `DATABASE_URL`)
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `JWT_SECRET`: A secure random string (generate with: `openssl rand -base64 32`)

6. **Configure build settings (optional):**
   - Railway automatically detects Next.js
   - The `railway.json` file in the repository contains optimized build settings
   - Build command: `prisma generate && prisma migrate deploy && next build` (via `npm run vercel-build`)
   - Start command: `npm start`

7. **Deploy:**
   - Railway will automatically build and deploy your application
   - Database migrations will run automatically during the build process

8. **Get your deployment URL:**
   - Go to "Settings" tab
   - Under "Domains", Railway provides a default domain
   - You can also add a custom domain

### Environment Variables Reference

Required environment variables for both platforms:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` |
| `JWT_SECRET` | Secret for JWT signing | `your-secure-random-string` |

### Database Migrations

Both Vercel and Railway will automatically run database migrations during deployment using:
```bash
prisma migrate deploy
```

For local development with SQLite, use:
```bash
npm run db:migrate
```

### Troubleshooting

**Build fails with Prisma errors:**
- Ensure `DATABASE_URL` is set correctly
- Verify your database is accessible from the deployment platform
- Check that Prisma schema is valid

**OpenAI API errors:**
- Verify `OPENAI_API_KEY` is set and valid
- Check your OpenAI API usage limits and billing

**Authentication errors:**
- Ensure `JWT_SECRET` is set and consistent across deployments
- Secret should be a long, random string

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
