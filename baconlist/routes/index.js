var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('./passport-config.js');

var mongoose = require('mongoose');
var Media = mongoose.model("Media");

// GET home page.
router.get('/', function(req, res, next) {
  Media.find(function(err, media, count) {
  	for (var i = 1; i < media.length; i++) {
  		if (media[i].votes > media[i-1].votes) {
  			var temp = media[i];
  			media[i] = media[i-1];
  			media[i-1] = temp;
  		}
  	}
  	
  	res.render("index", {media: media, user:req.user});
  })
});

router.post('/', function(req, res, next) {
	Media.findOneAndUpdate({title:req.body.button}, {$inc:{votes:1}}, function(err, media, count) {
		console.log(media);
	});
	res.redirect('/');
});

router.get('/share', function(req, res, next) {
	res.render('share')
});

router.post('/share', function(req, res, next) {
	var newMedia = new Media({
		title: req.body.title,
		votes: 0,
		url: req.body.url,
		user: req.user
	});

	newMedia.save(function(err, media, count) {
		console.log(media);
	})
	
	res.redirect('/')
});

// GET login page.
router.get('/login', function(req, res) {
	res.render("login", {action: 'Log in', error: req.flash('error')});
});

// Handle Login POST
router.post('/login', passport.authenticate('login', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

// GET Signup Page
router.get('/signup', function(req, res){
	res.render('signup',{message: req.flash('message')});
});

// Handle Signup POST
router.post('/signup', passport.authenticate('signup', {
	successRedirect: '/',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("Logging out " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name;
});

module.exports = router;
