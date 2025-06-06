from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

class ChatRequest(BaseModel):
    character_id: str
    message: str

class ChatResponse(BaseModel):
    reply: str

def load_seconds():
    with open('backend/data/second_list.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.get('/summon')
def summon():
    seconds = load_seconds()
    if not seconds:
        raise HTTPException(status_code=500, detail='No seconds available')
    return random.choice(seconds)

@app.post('/chat', response_model=ChatResponse)
def chat(req: ChatRequest):
    # For MVP, respond with a simple echo using the selected character name
    seconds = {s['id']: s for s in load_seconds()}
    second = seconds.get(req.character_id)
    if not second:
        raise HTTPException(status_code=404, detail='Character not found')
    reply = f"{second['name']} says: {req.message}"
    return ChatResponse(reply=reply)
