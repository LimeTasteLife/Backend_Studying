const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

// POST /user/1/follow
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    console.log('여기까진 진입하니?');
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        console.log('여기까진 진입하니?2');
        if (user) {
            await user.addFollowings([parseInt(req.params.id, 10)]);
            // setFollowings 새로 설정  , removeFollowings 팔로잉 관계 삭제
            res.send('success');
        } else {
            console.log('여기까진 진입하니?3');
            res.status(404).send('no user');
        }
    } catch (error) {
        console.log('에러가 나나?')
        console.error(error);
        next(error);
    }
})

module.exports = router;