var mongoose = require('mongoose');
var URLSlugs = require('mongoose-url-slugs');

//users
// our site requires authentication...
// users have a username and password
// users also have media prop so we see who shared what
var User = new mongoose.Schema({
	//username and password using plugin
	username: String,
	email: String,
    password: String,
});

var Comments = new mongoose.Schema({
	comment:String,
	user: User
});

//media file
// stores votes to determine baconking
// url link for media file
var Media = new mongoose.Schema({
	title: String,
	votes: Number,
	url: String,
	category: String,
	user: User,
	comments: [Comments]
});

Media.plugin(URLSlugs('title'));

mongoose.model("User", User);
mongoose.model("Media", Media);
mongoose.model("Comments", Comments);

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/baconlist';

mongoose.connect(uristring, function (err, res) {
	if (err) {
		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log ('Succeeded connected to: ' + uristring);
	}
});
