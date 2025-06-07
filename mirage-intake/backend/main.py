from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router

app = FastAPI()

# CORS設定（フロント連携用）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 本番は制限すべき
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Mirage backend running"}
