require("dotenv").config();
const Spotify = require("node-spotify-api");
const Twitter = require("twitter");
const request = require("request");
const fs = require("fs");

const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

var command = process.argv[2];

function runCode(command) {
  switch (command) {
    case "my-tweets":
      console.log("Showing tweets...");
      client.request('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=AliasNo1_mb&count=20', function (error, response, body) {
        var tweets = JSON.parse(body);
        console.log();
        console.log(tweets[4].text + ' (' + tweets[4].created_at + ')');
        console.log(tweets[3].text + ' (' + tweets[3].created_at + ')');
        console.log(tweets[2].text + ' (' + tweets[2].created_at + ')');
        console.log(tweets[1].text + ' (' + tweets[1].created_at + ')');
        console.log(tweets[0].text + ' (' + tweets[0].created_at + ')');
  
      });
      break;
  
    case "spotify-this-song":
      console.log("Searching for your song...");
      spotify.search({
        type: 'track',
        query: process.argv[3] || "The Sign",
        limit: 1
      })
        .then(function (response) {
          console.log();
          console.log(' Song:    ' + response.tracks.items[0].name);
          console.log(' Artist:  ' + response.tracks.items[0].artists[0].name);
          console.log(' Album:   ' + response.tracks.items[0].album.name);
          console.log(' URL:     ' + response.tracks.items[0].external_urls.spotify);
        })
        .catch(function (err) {
          console.log(err);
        });
      break;
  
    case "movie-this":
      console.log("Movie-ing your movie...");
      var input = process.argv[3] || "Mr. Nobody";
      input = input.split(" ").join("+");
      request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
  
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
  
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log();
          console.log(" Title: " + JSON.parse(body).Title);
          console.log(" Year: " + JSON.parse(body).Year);
          console.log(" Rating: " + JSON.parse(body).imdbRating);
          console.log(" Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
          console.log(" Country/Countries: " + JSON.parse(body).Country);
          console.log(" Language(s): " + JSON.parse(body).Language);
          console.log(" Plot: " + JSON.parse(body).Plot);
          console.log(" Actors: " + JSON.parse(body).Actors);
        }
      });
      break;
  
    case "do-what-it-says":
      console.log();
      var input = "";
      fs.readFile("random.txt", "utf8", function (error, data) {
  
        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
  
        var dataArr = data.split(",");

        runCode(dataArr[0]);

      });
  
      break;
  
    default:
      console.log("Invalid command. Try movie-this, spotify-this-song, or my-tweets");
  }
}

runCode(command);