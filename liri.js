//require('dotenv').config();
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var express = require('express');
var app = express();
var clientSpotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var arguments = process.argv;

//runApp(arguments[2], arguments[3]);

function getMovie(movie, req, res) {
    console.log(movie);
    // Then run a request to the OMDB API with the movie specified
    request('http://www.omdbapi.com/?t='+movie+'&y=&plot=short&apikey=trilogy', function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var tempString = JSON.parse(body).Title;
            console.log(tempString);
            res.send(JSON.parse(body));
            res.end();
        } else {
            console.log(error);
            logInfo(error);
        }
    });
}

function getTweets(req, res)  {
    var params = {screen_name: 'dbilderback2'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            res.send(tweets);
            res.end();
            //for (i=0;i<tweets.length;i++) {
            //console.log(tweets[i].text);
            //logInfo(tweets[i].text+'\n');
            //}
        } else {
            console.log(error);
            logInfo(error);
        }
    });

}

function getMusic(title, req, res) {
    clientSpotify.search({ type: 'track', query: title }, function(err, data) {
        res.send(data);
        res.end();

        /*
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
        */
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

app.post('/postTest', function(req, res) {
    console.log('Post test button pressed!');
});

app.get('/getMovies/:title', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var movieTitle;
    movieTitle = req.params.title.split(':');
    console.log("passedtitle:"+movieTitle[1]);
    //var test = getMovie('batman');
    getMovie(movieTitle[1], req, res);
    //console.log(title);
});

app.get('/getTweets/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    getTweets(req, res);
});

app.get('/getMusic/:title', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var musicTitle;
    musicTitle = req.params.title.split(':');
    console.log("passedtitle:"+musicTitle[1]);
    //var test = getMovie('batman');
    getMusic(musicTitle[1], req, res);
    //console.log(title);
});
app.listen(process.env.PORT || 3000, function() {
    console.log("listening on 3000");
});