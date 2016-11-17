var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('./passport-config.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/share', function(req, res, next) {
	res.render('share')
})

/* GET login page. */
router.get('/login', function(req, res) {
	// Display the Login page with any flash message, if any
	res.render('login');
});

/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
	successRedirect: '/',
	failureRedirect: '/login',
}));

/* GET Registration Page */
router.get('/signup', function(req, res){
	res.render('signup',{message: req.flash('message')});
});

/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/',
	failureRedirect: '/signup',
}));

module.exports = router;
