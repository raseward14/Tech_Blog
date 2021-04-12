const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// render homepage with exhisting posts
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                },
                {
                    model: Comment,
                    attributes: ['comment']
                }
            ]
          });
        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get(
            { plain: true }
        ));
        console.log(posts);
        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

// render dashboard, withAuth middleware prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // find logged in user based on session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });
        // serialize data so template can read it
        const user = userData.get({ plain: true });
        // pass serialized data and session flag into template
        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// render login with username and password page
router.get('/login', async (req, res) => {
    // if user already logged in, redirect request to another route
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('login');
});

// render signup page
router.get('/signup', async (req, res) => {
    // if user already logged in, redirect request to another route
    if (req.session.logged_in) {
        res.redirect('dashboard');
        return;
    }
    res.render('signup');
});

module.exports = router;