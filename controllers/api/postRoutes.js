const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// /api/posts
// find all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      // include users and comments with posts
      include: [{ model: User }, { model: Comment }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/posts/:id
// find one post by its id
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Comment },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    // const post = postData.get({ plain: true });

    // res.render('post', {
    //   ...post,
    //   logged_in: true,
    // });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/posts
// adding a new post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// /api/posts/:id
// deleting a post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
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

// editing a post a post
router.put('/comment', async (req, res) => {});

module.exports = router;
