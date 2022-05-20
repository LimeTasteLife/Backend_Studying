const express = require('express');
const { reset } = require('nodemon');
const User = require('../models/user');

const router = express.Router();

// user page loading
router.get('/:id', async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    const findUser = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!findUser) {
      res.status(400).json({
        log: 'no user found',
      });
    } else {
      res.status(200).json({
        user: [
          {
            name: findUser.name,
            point: findUser.point,
          },
        ],
        log: 'user page load success',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: 'user page load failure',
    });
  }
});

// user point deposit
router.patch('/:id/dpst', async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    const point = req.query.point;
    const findUser = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!findUser) {
      res.status(400).json({
        log: 'no user found',
      });
    } else {
      findUser.update({ point: findUser.point + point });
      res.status(200).json({
        log: `${user_id} user point deposit success`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: `${user_id} user point deposit failure`,
    });
  }
});

// user point withdraw
router.patch('/:id/wtdr', async (req, res, next) => {
  try {
    const user_id = req.query.user_id;
    const point = req.query.point;
    const findUser = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (!findUser) {
      res.status(400).json({
        log: 'no user found',
      });
    } else {
      if (findUser.point < point) {
        reset.status(400).json({
          log: 'too much to withdraw',
        });
      } else {
        findUser.update({ point: findUser.point - point });
        res.status(200).json({
          log: `${user_id} user point withdraw success`,
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      log: `${user_id} user point withdraw failure`,
    });
  }
});

module.exports = router;
