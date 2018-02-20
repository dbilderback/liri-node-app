module.exports = function(options) {
    return function(req, res, next) {
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
                var tempString = JSON.parse(body).Title;
                console.log(tempString);
                res.send('response:'+tempString);
                //res.end();
                next();
            } else {
                console.log(error);
                logInfo(error);
            }
        });
        next();
    }