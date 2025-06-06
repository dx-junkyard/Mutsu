import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import random
import json
import httpx

app = FastAPI()

# CORSミドルウェア設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = Path(__file__).parent / "data"
SECOND_LIST_FILE = DATA_DIR / "second_list.json"
KOKORO_LOG_FILE = DATA_DIR / "kokoro_log.json"

# 環境変数からURLやモデル名を取得。なければデフォルト値
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL_NAME = os.getenv("MODEL_NAME", "llama3")

class ChatRequest(BaseModel):
    user_input: str
    character_id: int

class ChatResponse(BaseModel):
    response: str
    emotion: str

class LogRequest(BaseModel):
    character_id: int
    text: str

@app.get("/summon")
async def summon():
    with SECOND_LIST_FILE.open() as f:
        data = json.load(f)
    if not data:
        raise HTTPException(status_code=404, detail="No characters available")
    return random.choice(data)

async def call_llm(prompt: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(OLLAMA_URL, json=payload)
        resp.raise_for_status()
        result = resp.json()
        return result.get("response", "")
