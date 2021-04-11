const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/post
// posting a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// deleting a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// commenting on a post
router.put('/comment', async (req, res) => {
    
});

module.exports = router;