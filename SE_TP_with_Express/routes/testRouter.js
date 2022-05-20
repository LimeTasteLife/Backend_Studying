const express = require('express');
const parsingData = require('./testData');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Test Router');
  parsingData();
  next();
});

module.exports = router;
