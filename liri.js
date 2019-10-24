// make it so liri.js can take in one of the following commands:
// --------------------
// `concertThis`
// `spotifyThis`
// `movieThis`
// `doWhatItSays`
// --------------------

// command line should do the following:

// `node liri.js concertThis <artist name>`
// ^^^ this should:
// **search bands in town API for an artist and render the {name of venue, venue location, date of event (using moment)}

// `node liri.js spotifyThis <song name>`
// ^^^ this should:
// **shows info from spotify API {artist, song name, preview link of song, album}

// `node liri.js movieThis <movie name>`
// ^^^ this should:
// ***output to terminal window {movie title, year, IMDB rating, rotten tomatoes rating, production country, language, plot, actors}

// `node liri.js doWhatItSays`
// ^^^ this should:
// ***using 'fs' node package, takes text in random.txt and uses it to call LIRI's commands {it should run `spotifyThis` for 'i want it that way' in random.txt}

//  0     1           2          3
// node liri.js spotifyThis <song name>

//  0     1         2           3
// node lirl.js movieThis <movie name>

//  0     1         2          3
// node liri.js concertThis <artist>

//  0     1          2
// node liri.js doWhatItSays

// add code required to read and set any environment variables with the dotenv package
require('dotenv').config()

// require constants
const request = require('request')
const fs = require('fs')
const axios = require('axios')
const keys = require('./keys.js')
const Spotify = require('node-spotify-api')
const spotify = new Spotify(keys.spotify)

// switch break
const operator = process.argv[2]
const input = process.argv[3]

userInput(operator, input)

function userInput (operator, input) {
    switch (operator) {
        case 'spotifyThis':
            songInfo(input)
            break
        
        case 'movieThis':
            movieInfo(input)
            break

        case 'concertThis':
            concertInfo(input)
            break

        case 'doWhatItSays':
            backstreetBoys()
            break

        default:
            console.log('please type spotifyThis, movieThis, concertThis, or doWhatItSays following node liri.js')
    }

}

// spotify
function songInfo(input) {
    if (input === undefined) {
        input = 'Tadow'
    }
    spotify.search(
        {
            type: 'track',
            query: input
        },
        function (e, data) {
            if (e) {
                console.log(e)
                return
            }
            const songs = data.tracks.items

            for (var i = 0; i < songs.length; i++) {
                console.log('--------spotify song--------')
                console.log('song name: ' + songs[i].name)
                console.log('preview song: ' + songs[i].preview_url)
                console.log('album: ' + songs[i].album.name)
                console.log('artist: ' + songs[i].artists[0].name)
                console.log('----------------------------')
            }
        }
    )
}

// movie 
// everything working except rotten tomatoes
function movieInfo(input) {
    if (input === undefined) {
        input = 'Austin Powers: International Man of Mystery'
        console.log('------------------')
        console.log('watch Austin Powers. https://www.imdb.com/title/tt0118655/')
    }
    const queryUrl = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&apikey=trilogy'
    request(queryUrl, function (e, r, body) {
        // successful request
        if (!e && r.statusCode === 200) {
            const movies = JSON.parse(body)
            console.log('--------movie info--------')
            console.log('title: ' + movies.Title)
            console.log('release year: ' + movies.Year)
            console.log('IMDB rating: ' + movies.imdbRating)
            // console.log('rotton tomatoes rating: ' + rottenTomatoesValue(movies))
            console.log('production country: ' + movies.Country)
            console.log('language: ' + movies.Language)
            console.log('plot: ' + movies.Plot)
            console.log('actors: ' + movies.Actors)
            console.log('------------------')
        } else {
            console.log('please input correctly')
        }
    })
}

// concert ***************
function concertInfo(input) {
    const queryUrl = `https://rest.bandsintown.com/artists/" + ${input} + "/events?app_id=codingbootcamp`
    request(queryUrl, function(e, r, body) {
        // successful request
        if (!e && r.statusCode === 200) {
            var concerts = JSON.parse(body)
            for (var i = 0; i < concerts.length; i++) {
                console.log('--------concert info--------')
                console.log('venue: ' + concerts[u].venue.name+'\n')
                console.log('location: ' + concerts[i].venue.city+'\n')
                console.log('date: ' + concerts[i].datetime)
                console.log('--------------------')
            }
        } else {
            console.log('please input correctly')
        }
    })
}

// // rotten tomatoes ***********
// function rottenTomatoes (data) {
//     return data.Ratings.find(function (item) {
//         return item.Source === 'Rotten Tomatoes'
//     })
// }

// function rottenTomatoesValue (data) {
//     return rottenTomatoes(data).Value
// }

// random.txt
function backstreetBoys () {
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      songInfo(txt[1]);
    });
  }
