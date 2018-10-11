# liri-node-app

### What is LIRI?
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

### How does LIRI Work?
LIRI has four commands that you can use in the command line...

##### concert-this
The concert-this command uses the Bands In Town API to pull concert data for artists.
> ``` node liri.js concert-this <band name> ```

If the artist has upcoming concerts, the date and location will be displayed. If the artist does not have any upcoming events, LIRI will let you know.

#### movie-this
The movie-this command uses the Open Movie Database API to pull information on movies.
> ``` node liri.js movie-this <movie name> ```

#### spotify-this-song
The spotify-this-song command uses the Spotify API to pull information on the song input by the user .
> ``` node liri.js spotify-this-song <song name> ```

If there is more than one song with the title searched, LIRI will return the 5 top results.


#### do-what-it-says
The do-what-it-says command references a text file, called "random.txt", which contains a spotify-this-song command

> ``` node liri.js do-what-it-says ```

The file currently returns information for the song "I Want It That Way"
