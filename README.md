# KOKORO

A simple AI persona chat service using FastAPI and Next.js.

## Backend

Run the FastAPI server locally:

```bash
uvicorn backend.main:app --reload
```

Deploy the backend to your favourite PaaS (e.g. Render or Railway). The
`backend/Dockerfile` can be used to containerise the service:

```bash
docker build -t kokoro-backend ./backend
docker run -p 8000:8000 kokoro-backend
```

When deployed you will obtain a URL such as
`https://your-backend-service.onrender.com`. Set this URL as the value of the
`BACKEND_URL` environment variable in Vercel and in `.env.local` for local
development.

## Frontend

Run the Next.js development server inside `frontend` directory:

```bash
npm install
npm run dev
```

Tailwind CSS is preconfigured. Global styles are located in `frontend/styles/globals.css` and loaded via `pages/_app.tsx`.

Set the environment variable `BACKEND_URL` in `.env.local` during development
and in the Vercel dashboard for deployments. All API requests will be proxied to
`$BACKEND_URL` via the Next.js API routes.

The frontend proxies API requests to the backend.

Example `.env.local`:

```
BACKEND_URL=http://localhost:8000
```

### Deploying to Vercel

1. Create a new Vercel project and set **Root Directory** to `frontend`.
2. In the Vercel dashboard add an environment variable `BACKEND_URL` pointing
   to the URL where the FastAPI backend is deployed.
3. Deploy using the default build command (`npm run build`).

All API calls from the frontend will be proxied via the Next.js API routes to
`BACKEND_URL`.
