const express = require('express');
const parsingData = require('./insertTestData2');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Test Router');
  parsingData();
  console.log('parsing finished');
  next();
});

module.exports = router;
