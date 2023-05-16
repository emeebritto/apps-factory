const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const appsDirectory = path.join(__dirname, 'dist');
const PORT = 3010 || process.env.PORT;

app.use(cors()); // Apply CORS middleware to all API paths

app.use((req, res, next) => {
  console.log(`
    ----------------------------
    NEW REQUEST: ${req.url};
    DATE: ${new Date()};
    ----------------------------
  `);
  next();
});

app.get('/app/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(appsDirectory, filename);

  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}/`);
});
