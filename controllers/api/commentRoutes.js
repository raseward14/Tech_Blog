const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// post a comment
// /api/comment
router.post('/', async (req, res) => {
    try {
        const commentData = Comment.create({ ...req.body });
        res.status(200).json(commentData);
    } catch (err) {

    }
});

module.exports = router;