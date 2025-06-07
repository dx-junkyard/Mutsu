import { useEffect, useState } from 'react';
import api from '../api';

function QuestionPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    api.get('/questions').then(res => setQuestions(res.data.map((q: any) => q.text)));
  }, []);

  const submit = () => {
    api.post('/answers', { question_id: index + 1, answer: answers[index] }).then(() => {
      if (index + 1 < questions.length) {
        setIndex(index + 1);
      } else {
        window.location.href = '/result';
      }
    });
  };

  return (
    <div>
      {questions.length > 0 && (
        <div>
          <p>{questions[index]}</p>
          <input
            value={answers[index] || ''}
            onChange={e => {
              const newAns = [...answers];
              newAns[index] = e.target.value;
              setAnswers(newAns);
            }}
          />
          <button onClick={submit}>Next</button>
        </div>
      )}
    </div>
  );
}

export default QuestionPage;
