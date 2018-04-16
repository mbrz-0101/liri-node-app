require("dotenv").config();
require("node-spotify-api");
require("twitter");

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var arg1 = process.argv[2];

switch (arg1) {
  case "my-tweets": 
    console.log("Showing tweets...");
    break;

  case "spotify-this-song": 
    if (typeof process.argv[3] === string) {
      console.log("Spotify-ing your song...");
    } else {
      console.log("You must give me a song to Spotify.");
    }
    break;

  default:  
    console.log("Invalid command. See help for instructions on how to use Liri");
}