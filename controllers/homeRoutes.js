const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// render homepage
router.get('/', withAuth, async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['name', 'ASC']],
          });
        // Serialize data so the template can read it
        const users = userData.map((user) => user.get(
            { plain: true }
        ));
        // Pass serialized data and session flag into template
        res.render('homepage', {
            users,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

// render single post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ]
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// render dashboard, use withAuth middleware to prevent access to route
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

// render login
router.get('/login', async (req, res) => {
    // if user already logged in, redirect request to another route
    if (req.session.logged_in) {
        res.redirect('profile');
        return;
    }
    res.render('login');
});

// render signup
router.get('/signup', async (req, res) => {
    // if user already logged in, redirect request to another route
    if (req.session.logged_in) {
        res.redirect('profile');
        return;
    }
    res.render('signup');
});

module.exports = router;