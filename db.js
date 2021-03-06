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

/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
var options = {
	useNewUrlParser: true,
	socketTimeoutMS: 30000,
	keepAlive: true,
	reconnectTries: 30
 }

var mongodbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/baconlist';

console.log(mongodbUri)
mongoose.connect(mongodbUri, options);

var conn = mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));  
conn.once('open', function() {
// Wait for the database connection to establish, then start the app.                         
});