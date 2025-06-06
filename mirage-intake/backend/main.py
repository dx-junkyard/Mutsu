from fastapi import FastAPI
from .routes import router
from .database import init_db

app = FastAPI()
app.include_router(router, prefix="/api")

@app.on_event("startup")
def on_startup():
    init_db()
