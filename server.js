const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const issues = require('./repos/issues.json');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());


app.get('/api/random-issue', (req, res) => {
  const randomIssue = issues[Math.floor(Math.random() * issues.length)];
  res.json(randomIssue);
});

app.post('/api/execute', (req, res) => {
  const executionResult = Math.random() > 0.50 ? "success" : "error";
  res.json({ result: executionResult });
});

app.post('/api/save-recording', (req, res) => {
  const recordingData = req.body;
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = path.join(__dirname, 'recordings', `recording-${timestamp}.json`);

  fs.writeFile(filename, JSON.stringify(recordingData, null, 2), (err) => {
    if (err) {
      console.error("Error saving recording:", err);
      res.status(500).json({ message: "Failed to save recording" });
    } else {
      res.json({ message: "Recording saved successfully", filename });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
