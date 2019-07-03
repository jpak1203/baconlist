# BaconList - User Voting Social Media Application

https://bacon-list.herokuapp.com

## Overview
Sick and tired of those large news corporations telling you what to read/watch with their "Top Stories"? BaconList is a social media application, where users share stories, videos, gags, and more, where other users can vote for their favorite media links shared.

Users can register and log in, where they can upload any type of media on to the site. There will be categories, such as news, sneakers, sports, and more, where users can choose to upload their media to. In those categories, users vote for their favorite stories.

## Data Model
For now, we would have to store Users, Comments, and Media.

```
//users
// our site requires authentication...
// users have a username and password
// users also have media prop so we see who shared what
var Users = new mongoose.Schema({
	username: String,
	email: String,
    	password: String,
});

//media file
// stores votes to determine baconking
// url link for media file
// category to determine what category media file goes to
var Media = new mongoose.Schema({
	title: String,
	votes: Number,
	url: String,
	category: String,
	user: User,
	comments: [Comments]
});

//comments
// stores comments for each media url shared
var Comments = new mongoose.Schema({
	comment:String,
	user: User
});

```

## Wireframes
/ - homepage (shows media files that were shared)

![home](/documentation/1-Home.png)

/register - registering users

![register](/documentation/2-Register.png)

/login - login users (user authentication)

![login](/documentation/3-Login.png)

/share - used to share media files

![share](/documentation/4-Share.png)

## Site map

![sitemap](/documentation/Baconlist.png)

## User stories
1. as a user, I can post new links to media
2. as a user, I can view other links other users share
3. as a user, I can vote on media link
4. as a user, I can go through different categories
5. as a user, I can comment on media links
