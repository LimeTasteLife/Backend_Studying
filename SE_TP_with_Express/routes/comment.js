const express = require('express');
const { Post, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { post_id } = req.query;

    const findCommentwithPost = await Comment.findAll({
      where: { id: post_id },
      attributes: ['user_id', 'content', 'created_at'],
      order: [['created_at', 'DESC']],
    });

    res.status(200).json(findCommentwithPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'failure',
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { post_id, content, user_id } = req.body;
    if (
      !Post.findOne({
        id: post_id,
      })
    ) {
      res.status(400).json({
        log: 'no post found',
      });
    } else {
      const createComment = await Comment.create({
        post_id: post_id,
        content: content,
        user_id: user_id,
      });
      if (!createComment) {
      } else {
        res.status(200).json({
          log: 'creating comment success',
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'failure',
    });
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { comment_id } = req.body;

    const findComment = await Comment.findOne({
      where: { id: comment_id },
    });

    if (!findComment) {
      res.status(400).json({
        log: 'no comment found',
      });
    } else {
      const destroyComment = await Comment.destroy({
        where: { id: comment_id },
      });
      res.status(200).json({
        log: 'comment delete success',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'comment delete failure',
    });
  }
});

module.exports = router;
