var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('./passport-config.js');

var mongoose = require('mongoose');
var User = mongoose.model("User");
var Media = mongoose.model("Media");
var Comments = mongoose.model("Comments");

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

router.get('/api/media/', function(req, res) {
	var mediaFilter = {};

	Media.find(mediaFilter, function(err, media, count) {
		res.json(media.map(function(ele) {
			return {
				"title":ele.title,
				"votes":ele.votes,
				"url":ele.url,
				"category":ele.category,
				"user":ele.user
			};
		}));
	});
});

router.get('/share', function(req, res, next) {
	res.render('share')
});

router.post('/share', function(req, res, next) {
	var newMedia = new Media({
		title: req.body.title,
		votes: 0,
		url: req.body.url,
		category: req.body.category,
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

router.get('/:slug', function(req, res, next) {
	User.findOne({slug:req.params.slug}, function(err, usr, count) {
		console.log(usr);
		res.render('user-page', {user:usr});
	})
});

router.get('/media/:slug', function(req, res, next) {
	Media.findOne({title:req.params.slug}, function(err, media, count) {
		console.log(media);
		res.render('expand-link', {media:media});
	})
});

router.post('/media/:slug', function(req, res, next) {

	var user;
	if (req.user === undefined) {
		user = publicUser = new User({
			username: "public"
		});
	}
	else {
		user = req.user;
	}
	var newComment = new Comments({
		comment:req.body.comment,
		user:user
	});

	Media.findOneAndUpdate({title:req.params.slug}, {$push:{comments:newComment}}, function(err, media, count) {
		console.log(media);
		res.redirect(req.get('referer'));
	});
})


module.exports = router;
