const express = require('express');
const app = express();
const banRoutes = require('./routes/baninfo');

// Enable CORS for all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());
app.use('/', banRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`Free Fire Ban Checker API running on http://localhost:${PORT}`);
    console.log(`Test endpoint: http://localhost:${PORT}/check?uid=1171436371`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
