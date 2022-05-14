const express = require('express');

const router = express.Router();

// GET Router
router.get('/', (req, res) => {
  res.send('Hello, User');
});

module.exports = router;
