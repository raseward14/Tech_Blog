const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// post a comment
// /api/comment
router.post('/', async (req, res) => {
    try {
        const commentData = Comment.create({
            ...req.body,
            // where: {
            //     id: req.params.id,
            // }
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;