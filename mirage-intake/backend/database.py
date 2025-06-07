import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "app.db"

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer TEXT)"
    )
    conn.commit()
    conn.close()
