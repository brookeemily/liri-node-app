// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Import keys.js file and store it in a variable
var keys = require("./keys.js");
var request = require("request");

// Require moment
var moment = require("moment");
moment().format();
// var spotify = new Spotify(keys.spotify);

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

// BANDS IN TOWN

if (theFunction == "concert-this") {
  // Then run a request to the Bands in Town API with the band specified
  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    theThing +
    "/events?app_id=codingbootcamp";
  console.log(queryUrl);

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

// OMDB DATABASE

if (theFunction == "movie-this") {
  // Then run a request to the Bands in Town API with the band specified
  var queryUrl =
    "http://www.omdbapi.com/?t=" + theThing + "&y=&plot=short&apikey=trilogy";
  // console.log(queryUrl);

  request(queryUrl, function(error, response, body) {
    // If the request was successful...
    if (!error && response.statusCode === 200) {
      // Store JSON response in variable
      var movieData = JSON.parse(body);

      //   Use for loop to go through each upcoming concert & display info
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
