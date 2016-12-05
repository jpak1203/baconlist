var mongoose = require('mongoose');

//users
// our site requires authentication...
// users have a username and password
// users also have media prop so we see who shared what
var User = new mongoose.Schema({
	//username and password using plugin
	username: String,
	email: String,
    password: String,
    baconking:Number
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


mongoose.model("User", User);
mongoose.model("Media", Media);
mongoose.model("Comments", Comments);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV == 'PRODUCTION') {
	// if we're in PRODUCTION mode, then read the configration from a file
	// use blocking file io to do this...
	var fs = require('fs');
	var path = require('path');
	var fn = path.join(__dirname, 'config.json');
	var data = fs.readFileSync(fn);

	// our configuration file will be in json, so parse it and set the
	// conenction string appropriately!
	var conf = JSON.parse(data);
	var dbconf = conf.dbconf;
} else {
	 // if we're not in PRODUCTION mode, then use
	 dbconf = 'mongodb://localhost/jmp748';
}

mongoose.connect(dbconf);
