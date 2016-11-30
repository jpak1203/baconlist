var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('./passport-config.js');

var mongoose = require('mongoose');
var Media = mongoose.model("Media");

// GET home page.
router.get('/', function(req, res, next) {
  Media.find(function(err, media, count) {
  	res.render("index", {media, media});
  })
});

router.post('/', function(req, res, next) {
	Media.findOneAndUpdate({title:req.body.button}, {$inc:{votes:1}});
	res.redirect('/');
});

router.get('/share', function(req, res, next) {
	res.render('share')
});

router.post('/share', function(req, res, next) {
	var newMedia = new Media({
		title: req.body.title,
		votes: 0,
		url: req.body.url
	});

	newMedia.save(function(err, media, count) {
		console.log(media);
	})
	
	res.redirect('/')
});

// GET login page.
router.get('/login', function(req, res) {
	res.render('login');
});

// Handle Login POST
router.post('/login', passport.authenticate('login', {
	successRedirect: '/',
	failureRedirect: '/login',
}));

// GET Signup Page
router.get('/signup', function(req, res){
	res.render('signup',{message: req.flash('message')});
});

// Handle Signup POST
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/',
	failureRedirect: '/signup',
}));

module.exports = router;
