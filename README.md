KOKORO

A simple AI persona chat service using FastAPI and Next.js.

Backend

Run the FastAPI server locally:

uvicorn backend.main:app --reload
Deploy the backend to your favourite PaaS (e.g. Render or Railway).
A simple Dockerfile is provided so the service can be containerised easily:

docker build -t kokoro-backend ./backend
docker run -p 8000:8000 kokoro-backend
When deployed you will obtain a URL such as
https://your-backend-service.onrender.com.
Use this value for BACKEND_URL on Vercel.

Frontend

Run the Next.js development server inside frontend directory:

npm install
npm run dev
Tailwind CSS is preconfigured.
Global styles are located in frontend/styles/globals.css and loaded via pages/_app.tsx.

Set the environment variable BACKEND_URL in .env.local during development
and in the Vercel dashboard for deployments.
All API requests will be proxied to $BACKEND_URL via the Next.js API routes.

The frontend proxies API requests to the backend.