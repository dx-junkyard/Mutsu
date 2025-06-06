# Second - AI Persona Chat System

This repository contains a minimal implementation of the "Second" web application described in the requirements. It is split into a FastAPI backend and a Next.js frontend.

## Backend

* Located in `backend/`
* Run with `uvicorn backend.main:app --reload`
* Endpoints:
  * `GET /summon` - return a random character from `data/second_list.json`
  * `POST /chat` - echo chat endpoint accepting `{character_id, message}`

## Frontend

* Located in `frontend/`
* Standard Next.js project structure in the `pages` directory
* API route in `pages/api/chat.ts` proxies requests to the backend

This implementation is intentionally lightweight and uses placeholder images. It is meant as a starting point for further development.
