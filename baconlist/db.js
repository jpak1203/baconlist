var mongoose = require('mongoose'),
	URLSlugs = require('mongoose-url-slugs');

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

//users
// our site requires authentication...
// users have a username and password
// users also have media prop so we see who shared what
var Users = new mongoose.Schema({
	//username and password using plugin
	baconking: Number,
	media: [Media]
});

//media file
// stores votes to determine baconking
// url link for media file
var Media = new mongoose.Schema({
	votes: Number,
	url: String,
});

mongoose.connect(dbconf);
