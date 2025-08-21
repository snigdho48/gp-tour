const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set proper MIME types
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  } else if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  } else if (req.url.endsWith('.otf') || req.url.endsWith('.ttf') || req.url.endsWith('.woff') || req.url.endsWith('.woff2')) {
    res.setHeader('Content-Type', 'application/font-sfnt');
  }
  next();
});

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Production server running on http://localhost:${PORT}`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'dist')}`);
  console.log(`🔧 MIME types properly configured for JavaScript modules`);
});
