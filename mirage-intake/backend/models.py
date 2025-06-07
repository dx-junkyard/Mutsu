from pydantic import BaseModel

class Question(BaseModel):
    id: int
    text: str

class Answer(BaseModel):
    question_id: int
    answer: str

class Analysis(BaseModel):
    summary: str
