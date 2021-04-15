const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// /
// render homepage with exhisting posts
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
        { model: Comment },
      ],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    console.log(posts);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      logged_in: req.session.logged_in,
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// /dashboard
// render dashboard, withAuth middleware prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // find logged in user based on session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });
    // serialize data so template can read it
    const user = userData.get({ plain: true });
    // pass serialized data and session flag into template
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// /login
// render login with username and password page
router.get('/login', async (req, res) => {
  // if user already logged in, redirect request to another route
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('login');
});

// /signup
// render signup page
router.get('/signup', async (req, res) => {
  // if user already logged in, redirect request to another route
  if (req.session.logged_in) {
    res.redirect('dashboard');
    return;
  }
  res.render('signup');
});

// posts/:id
// find one post by its id
router.get('/comment/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment }],
    });

    const post = postData.get({ plain: true });

    res.render('comment', {
      ...post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one post by its id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
          include: [{ model: User }, { model: Comment }],
        });
    
        const post = postData.get({ plain: true });
    
        res.render('post', {
          ...post,
        });
      } catch (err) {
        res.status(500).json(err);
      }
});

// edit one post by its id
router.get('/edit/:id', async (req, res) => {
  try {
      const postData = await Post.findByPk(req.params.id, {
        include: [{ model: User }, { model: Comment }],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('edit', {
        ...post,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
