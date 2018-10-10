// Read and set any environment variables with the dotenv package
require("dotenv").config();
var request = require("request");

// Require moment
var moment = require("moment");
moment().format();

// Require Spotify
var Spotify = require("node-spotify-api");

// Import keys.js file and store it in a variable
var keys = require("./keys.js");

// link FS
var fs = require("fs");

// Set process.argv variables

// variable for the function chosen
var theFunction = process.argv[2];

// variable for the thing being searched
var nodeArgs = process.argv;
var theThing = "";

// var events = new BandsInTownEvents();

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    theThing = theThing + "+" + nodeArgs[i];
  } else {
    theThing += nodeArgs[i];
  }
}

// If concert-this is the function....
if (theFunction == "concert-this") {
  // Run bands function to display resul;ts
  bands();
}

// If movie-this is the function....
if (theFunction == "movie-this") {
  // Run movie function to display results
  movie();
}

// If spotify-this-song is the function....
if (theFunction == "spotify-this-song") {
  // Run spotify function to display results
  spotify();
}

// If do-what-it-says is the function....
if (theFunction == "do-what-it-says") {
  // Reads file random.txt
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If there was an error reading the file, we log it and return immediately
    if (error) {
      return console.log(error);
    }

    // Puts data from random.txt into an array
    var data = data.split(",");
    console.log(data);

    // If this first item of the data array is "spotify this song"....
    if (data[0] === "spotify-this-song") {
      // set theThing to the second item of the data array
      theThing = data[1];
      // run the spotify function to return search results
      spotify();
    }
  });
}

//  FUNCTION FOR THE SPOTIFY CALL
function spotify() {
  // Create spotify variable to hold new spotify object w/ keys
  var spotify = new Spotify(keys.spotify);

  // Search spotify for the track....
  spotify.search(
    {
      type: "track",
      query: theThing,
      limit: 5
    },
    function(error, data) {
      if (error) {
        console.log(error);
        return;
      }

      // If there is no name included, search for "The Sign"
      if (!theThing) {
        theThing = "The Sign";
      }

      // Returns up to 5 results
      for (var i = 0; i < 5; i++) {
        console.log(
          "-------------------------------------------------------------------------------------------"
        );
        console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
        console.log("Song: " + data.tracks.items[i].name);
        console.log(
          "Preview link: " + data.tracks.items[i].external_urls.spotify
        );
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log(
          "-------------------------------------------------------------------------------------------"
        );
      }
    }
  );
}

function bands() {

  // Run a request to the Bands in Town API with the band specified

  // construct the queryURL
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    theThing +
    "/events?app_id=codingbootcamp";
  console.log(queryUrl);

  // The request is made to the queryUrl
  request(queryUrl, function(error, response, body) {
    // If the request was successful...
    if (!error && response.statusCode === 200) {
      // Store JSON response in variable
      var concertData = JSON.parse(body);

      //   Use for loop to go through each upcoming concert & display info
      for (i = 0; i < concertData.length; i++) {
        console.log("Venue: " + concertData[i].venue.name);
        console.log(
          "City: " +
            concertData[i].venue.city +
            ", " +
            concertData[i].venue.country
        );
        console.log(
          "Date: " + moment(concertData[i].datetime).format("MM/DD/YY")
        );
        console.log("--------------------------------");
      }
    }
  });
}

function movie() {
  // Run a request to the Open Movie Database API with the movie specified

  // Construct queryUrl
  var queryUrl =
    "http://www.omdbapi.com/?t=" + theThing + "&y=&plot=short&apikey=trilogy";


  // Send request to the URL constructed 
  request(queryUrl, function(error, response, body) {
    // If the request was successful...
    if (!error && response.statusCode === 200) {
      // Store JSON response in variable called movieData
      var movieData = JSON.parse(body);

      // This will display the movie data.....
      console.log("--------------------------------");

      console.log("The movie's title is: " + movieData.Title);
      console.log("The movie was released in: " + movieData.Year);
      console.log("The movie's IMDB rating is: " + movieData.imdbRating);
      console.log(
        "The movie's Rotten Tomatoes score is: " + movieData.Ratings[1].Value
      );
      console.log("The movie was released in: " + movieData.Country);
      console.log("The language of the movie is: " + movieData.Language);
      console.log("The movie's plot is: " + movieData.Plot);
      console.log("The stars of the show are: " + movieData.Actors);
      console.log("--------------------------------");
    }
  });
}
