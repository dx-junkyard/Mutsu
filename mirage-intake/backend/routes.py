from fastapi import APIRouter
from .models import Question, Answer, Analysis
from .database import get_connection

router = APIRouter()

QUESTIONS = [
    {"id": 1, "text": "How do you feel today?"},
    {"id": 2, "text": "What motivates you?"},
    {"id": 3, "text": "What is your biggest challenge?"},
    {"id": 4, "text": "How do you handle stress?"},
    {"id": 5, "text": "What are your goals?"},
]

@router.get("/questions", response_model=list[Question])
def get_questions():
    return QUESTIONS

@router.post("/answers")
def save_answer(ans: Answer):
    conn = get_connection()
    cur = conn.cursor()
    question_text = next((q["text"] for q in QUESTIONS if q["id"] == ans.question_id), "")
    cur.execute(
        "INSERT INTO answers (question, answer) VALUES (?, ?)",
        (question_text, ans.answer),
    )
    conn.commit()
    conn.close()
    return {"status": "ok"}

@router.get("/analysis", response_model=Analysis)
def analysis():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT answer FROM answers")
    answers = [row["answer"] for row in cur.fetchall()]
    conn.close()
    summary = " ".join(answers)
    return Analysis(summary=summary)
