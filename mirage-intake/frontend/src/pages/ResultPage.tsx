import { useEffect, useState } from 'react';
import api from '../api';

function ResultPage() {
  const [summary, setSummary] = useState('');

  useEffect(() => {
    api.get('/analysis').then(res => setSummary(res.data.summary));
  }, []);

  return (
    <div>
      <h1>Result</h1>
      <p>{summary}</p>
    </div>
  );
}

export default ResultPage;
