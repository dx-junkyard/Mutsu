# KOKORO

A simple AI persona chat service using FastAPI and Next.js.

## Backend

Run the FastAPI server:

```bash
uvicorn backend.main:app --reload
```

## Frontend

Run the Next.js development server inside `frontend` directory:

```bash
npm install
npm run dev
```

The frontend proxies API requests to the backend.
