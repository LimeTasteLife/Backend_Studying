const express = require('express');
const { Post } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'post load failed',
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      delivery_fee,
      title,
      content,
      mem_count,
      rest_id,
      user_id,
      lat,
      long,
    } = req.body;
    const creatingNewPost = await Post.create({
      delivery_fee: parseInt(delivery_fee),
      title: title,
      content: content,
      mem_count: parseInt(mem_count),
      rest_id: parseInt(rest_id),
      user_id: parseInt(user_id),
      lat: parseFloat(lat),
      long: parseFloat(long),
    });
    await creatingNewPost.addUser(parseInt(user_id));
    res.status(200).json({
      log: 'post insert succeeded',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'post insert failed',
    });
  }
});

module.exports = router;
