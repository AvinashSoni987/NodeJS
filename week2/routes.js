const router = require("express").Router();
const passport = require('passport');

const { body } = require("express-validator");

const {
    homePage,
    register,
    registerPage,
    login,
    loginPage,
} = require("./controllers/userController");

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.userID){
        return res.redirect('/login');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.userID){
        return res.redirect('/');
    }
    next();
}

router.get('/', ifNotLoggedin, homePage);

router.get("/login", ifLoggedin, loginPage);
router.post("/login",
ifLoggedin,
    [
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    login
);

router.get("/signup", ifLoggedin, registerPage);
router.post(
    "/signup",
    ifLoggedin,
    [
        body("_name", "The name must be of minimum 3 characters length")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("_email", "Invalid email address")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "The Password must be of minimum 4 characters length")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    register
);

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        next(err);
    });
    res.redirect('/login');
});

/*  PASSPORT SETUP  */

const { profile } = require('console');
var userProfile;



passport.serializeUser(function(user, cd) {
    cd(null, user);
});

passport.deserializeUser(function(obj, cd) {
    cd(null, obj);
});
router.get('/success', (req, res) => res.send(userProfile));
router.get('/error', (req, res) => res.send("error logging in"));

// Google Auth
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '489375616625-lel90tds6f5ht7vg8r8dhj8o4t9uej0b.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      userProfile=profile;
      return done(null, userProfile);
  }
));
router.get('/auth/google', 
  passport.authenticate('google', { scope : ['profile', 'email'] }));
  
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  });

module.exports = router;