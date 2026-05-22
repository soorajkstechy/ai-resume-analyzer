# AI Resume Analyzer

An AI-powered REST API that analyzes resumes against job descriptions, calculates ATS scores, and provides actionable improvement suggestions.

## Tech Stack
Node.js · Express.js · REST API · JavaScript · CORS · Multer · LLM-ready Architecture

## Features
- ATS score calculation (keyword match percentage)
- Shortlist probability estimation (High / Medium / Low)
- Top keyword extraction from job descriptions
- Missing keyword detection with improvement suggestions
- Clean REST API architecture — LLM API integration ready

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/analyze | Analyze resume against job description |
| POST | /api/keywords | Extract top keywords from JD |
| GET | /api/health | Health check |

## Sample Request
```json
POST /api/analyze
{
  "resumeText": "Node.js developer with React and MongoDB experience...",
  "jobDescription": "Looking for Node.js developer with REST API and cloud experience..."
}
```

## Sample Response
```json
{
  "success": true,
  "analysis": {
    "atsScore": 87,
    "shortlistProbability": "High (85-95%)",
    "keywordsMatched": ["node", "react", "mongodb", "rest", "api"],
    "keywordsMissing": ["cloud", "typescript"],
    "suggestions": ["Add quantified achievements with percentages"],
    "summary": "Resume matched 18 of 21 keywords from the job description."
  }
}
```

## Setup
```bash
git clone https://github.com/soorajkstechy/ai-resume-analyzer
npm install
node server.js
```

## Architecture
