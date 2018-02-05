require('dotenv').config();
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var clientSpotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var arguments = process.argv;

runApp(arguments[2], arguments[3]);

function getMovie(movie) {
    // Then run a request to the OMDB API with the movie specified
    request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&apikey=trilogy', function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log('The movie\'s title is: ' + JSON.parse(body).Title);
            logInfo('The movie\'s title is: ' + JSON.parse(body).Title+'\n');
            console.log('The movie\'s year made is: ' + JSON.parse(body).Year);
            logInfo('The movie\'s year made is: ' + JSON.parse(body).Year+'\n');
            console.log('The movie\'s imdb rating is: ' + JSON.parse(body).imdbRating);
            logInfo('The movie\'s imdb rating is: ' + JSON.parse(body).imdbRating+'\n');
            console.log('The movie\'s Rotten Tomatoes rating is: ' + JSON.parse(body).Ratings[1].Value);
            logInfo('The movie\'s Rotten Tomatoes rating is: ' + JSON.parse(body).Ratings[1].Value+'\n');
            console.log('The movie\'s Country Origin is: ' + JSON.parse(body).Country);
            logInfo('The movie\'s Country Origin is: ' + JSON.parse(body).Country+'\n');
            console.log('The movie\'s Language(s) is: ' + JSON.parse(body).Language);
            logInfo('The movie\'s Language(s) is: ' + JSON.parse(body).Language+'\n');
            console.log('The movie\'s Plot is: ' + JSON.parse(body).Plot);
            logInfo('The movie\'s Plot is: ' + JSON.parse(body).Plot+'\n');
            console.log('The movie\'s Actors is: ' + JSON.parse(body).Actors);
            logInfo('The movie\'s Actors is: ' + JSON.parse(body).Actors+'\n');
            return JSON.parse(body).Title;
        } else {
            console.log(error);
            logInfo(error);
        }
    });
}

function showTweets()  {
    var params = {screen_name: 'dbilderback2'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (i=0;i<tweets.length;i++) {
                console.log(tweets[i].text);
                logInfo(tweets[i].text+'\n');
            }
        } else {
            console.log(error);
            logInfo(error);
        }
    });

}

function getMusic(song) {
    clientSpotify.search({ type: 'track', query: song }, function(err, data) {
        for(var i = 0; i < data.tracks.items.length; i++) {
            var songData = data.tracks.items[i];
            //artist
            console.log('Artist: ' + songData.artists[0].name);
            logInfo('Artist: ' + songData.artists[0].name+'\n');
            //song name
            console.log('Song: ' + songData.name);
            logInfo('Song: ' + songData.name+'\n');
            //spotify preview link
            console.log('Preview URL: ' + songData.preview_url);
            logInfo('Preview URL: ' + songData.preview_url+'\n');
            //album name
            console.log('Album: ' + songData.album.name);
            console.log('-----------------------');
            logInfo('Album: ' + songData.album.name+'\n');
        }
    });
}

function executeFile() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err);
            logInfo(err);
        }else {
            var dataArr = data.split(",");
            var task = dataArr[0];
            var input = dataArr[1];
            runApp(task, input);
        }
    });
}

function runApp(task, input) {
    switch(task) {
        case 'my-tweets':
            showTweets();
            break;
        case 'spotify-this-song':
            getMusic(input);
            break;
        case 'movie-this':
            getMovie(input);
            break;
        case 'do-what-it-says':
            executeFile();
            break;
        default:
        console.log("there appears to be an error");
    }
}

function logInfo(info) {
    fs.appendFile("log.txt", info, function(err) {

        // If an error was experienced we say it.
        if (err) {
            console.log(err);
        }

        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
            console.log("Content Added!");
        }
    });
}

