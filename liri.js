// add code required to read and set any environment variables with the dotenv package
require('dotenv').config()

// add code required to import the keys.js file and store it in a variable
var keys = require('./keys.js')

// should be able to access keys like:
// var spotify = new Spotify(keys.spotify)

// make it so liri.js can take in one of the following commands:
// --------------------
// `concert-this`
// `spotify-this-song`
// `movie-this`
// `do-what-it-says`
// --------------------

// command line should do the following:

// `node liri.js concert-this <artist name>`
// ^^^ this should:
// **search bands in town API for an artist and render the {name of venue, venue location, date of event (using moment)}

// `node liri.js spotify-this-song <song name>`
// ^^^ this should:
// **shows info from spotify API {artist, song name, preview link of song, album}

// `node liri.js movie-this <movie name>`
// ^^^ this should:
// ***output to terminal window {movie title, year, IMDB rating, rotten tomatoes rating, production country, language, plot, actors}

// `node liri.js do-what-it-says`
// ^^^ this should:
// ***using 'fs' node package, takes text in random.txt and uses it to call LIRI's commands {it should run `spotify-this-song` for 'i want it that way' in random.txt}
