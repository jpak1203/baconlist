# BaconList - User Voting Application

## Overview
Sick and tired of those large news corporations telling you what to read/watch with their "Top Stories"? BaconList is a social media application, where users share stories, videos, gags, and more, where other users can vote to declare the Bacon King.

Users can register and log in, where they can upload any type of media on to the site. There will be categories, such as news, sneakers, sports, and more, where users can choose to upload their media to. In those categories, users vote for their favorite stories, and the website will declare a Bacon King (which will be the media that was voted for the most). Users will be rewarded for the amount of Bacon King titles they have earned.

## Data Model
For now, we would have to store Users and Media.

```
//users
// our site requires authentication...
// users have a username and password
// users also have media prop so we see who shared what
var Users = new mongoose.Schema({
	//username and password using plugin
	baconking: Number
});

//media file
// stores votes to determine baconking
// url link for media file
// category to determine what category media file goes to
var Media = new mongoose.Schema({
	votes: Number,
	url: String,
	category: String
});
```

## Wireframes

## Site map

## User stories
1. as a user, I can post new links to media
2. as a user, I can view other links other users share
3. as a user, I can vote on media link
4. as a user, I can be crowned a Bacon King
5. as a user, I can go through different categories

## Research Topics
- (6 points) User Authentication
  - I will use Passportjs for user authentication
- (4 points) Perform client side form validation using a JavaScript library
- (2 points) Tracking User Activity
  - I will use D3.js to create a chart for user activity
  - I have never used D3.js
- (1 points) Mobile Compatibility
  - I will be using Boostrap to make my web application mobile compatible
  - Have had some experience with Bootsrap
- (1 point) AngularJS
  - Will research Angular 2 and try to implement it in my website
