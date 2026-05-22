const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const analyzeResume = (resumeText, jobDescription) => {
  const jdWords = jobDescription.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  const resumeWords = resumeText.toLowerCase();

  const matched = [...new Set(jdWords.filter(word => resumeWords.includes(word)))];
  const missing = [...new Set(jdWords.filter(word => !resumeWords.includes(word)))];

  const score = Math.round((matched.length / jdWords.length) * 100);

  const suggestions = [];
  if (score < 70) suggestions.push('Add more keywords from the job description');
  if (!resumeText.includes('github')) suggestions.push('Add your GitHub profile link');
  if (!resumeText.match(/\d+%/)) suggestions.push('Add quantified achievements with percentages');
  if (resumeText.length < 500) suggestions.push('Resume is too short — add more detail');

  return {
    atsScore: score,
    shortlistProbability: score > 85 ? 'High (85-95%)' : score > 70 ? 'Medium (60-80%)' : 'Low (below 60%)',
    keywordsMatched: matched.slice(0, 20),
    keywordsMissing: missing.slice(0, 10),
    suggestions,
    summary: `Resume matched ${matched.length} of ${jdWords.length} keywords from the job description.`
  };
};

app.post('/api/analyze', (req, res) => {
  const { resumeText, jobDescription } = req.body;
  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'resumeText and jobDescription are required' });
  }
  const result = analyzeResume(resumeText, jobDescription);
  res.json({ success: true, analysis: result });
});

app.post('/api/keywords', (req, res) => {
  const { jobDescription } = req.body;
  if (!jobDescription) {
    return res.status(400).json({ error: 'jobDescription is required' });
  }
  const words = jobDescription.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  const frequency = {};
  words.forEach(w => { frequency[w] = (frequency[w] || 0) + 1; });
  const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]).slice(0, 15);
  res.json({ success: true, topKeywords: sorted.map(([word, count]) => ({ word, count })) });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'AI Resume Analyzer API', version: '1.0.0' });
});

app.get('/', (req, res) => {
  res.json({
    message: 'AI Resume Analyzer API',
    endpoints: {
      analyze: 'POST /api/analyze',
      keywords: 'POST /api/keywords',
      health: 'GET /api/health'
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI Resume Analyzer running on port ${PORT}`));
