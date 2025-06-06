import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import random
import json
import httpx

app = FastAPI()
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

@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    with SECOND_LIST_FILE.open() as f:
        chars = {c["id"]: c for c in json.load(f)}
    if req.character_id not in chars:
        raise HTTPException(status_code=404, detail="Character not found")
    char = chars[req.character_id]
    prompt = (
        f"You are {char['name']} with attribute {char['attribute']}. Motto: {char['motto']}\n"
        f"User: {req.user_input}\nAI:"
    )
    llm_output = await call_llm(prompt)
    # Simple emotion tag extraction placeholder
    emotion = "neutral"
    return ChatResponse(response=llm_output.strip(), emotion=emotion)

@app.post("/mylog")
async def mylog(log: LogRequest):
    KOKORO_LOG_FILE.touch(exist_ok=True)
    with KOKORO_LOG_FILE.open() as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            data = []
    data.append(log.dict())
    with KOKORO_LOG_FILE.open("w") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return {"status": "ok"}

@app.get("/mylog")
async def get_logs():
    KOKORO_LOG_FILE.touch(exist_ok=True)
    with KOKORO_LOG_FILE.open() as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            data = []
    return data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
