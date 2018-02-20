const proxyurl = "https://cors-anywhere.herokuapp.com/";

$('#getMovies-button').click(function(response) {
    var movieTitle = $('#movieTitle').val();
    $.ajax({
        type: 'GET',
        //url: proxyurl+'http://localhost:1337/getMovies'
        url: 'http://localhost:1337/getMovies/title:'+movieTitle
    }).done(function (data) {
        displayMovie(data);
    }).fail(function (jqXHR, textStatus) {
        console.log('failed');
    });
});

$('#getTweets-button').click(function(response) {
    $.ajax({
        type: 'GET',
        //url: proxyurl+'http://localhost:1337/getMovies'
        url: 'http://localhost:1337/getTweets/'
    }).done(function (data) {
        displayTweets(data);
    }).fail(function (jqXHR, textStatus) {
        console.log('failed');
    });
});

$('#getMusic-button').click(function(response) {
    var musicTitle = $('#musicTitle').val();
    $.ajax({
        type: 'GET',
        //url: proxyurl+'http://localhost:1337/getMovies'
        url: 'http://localhost:1337/getMusic/title:'+musicTitle
    }).done(function (data) {
        displayMusic(data);
    }).fail(function (jqXHR, textStatus) {
        console.log('failed');
    });
});


function displayMovie(data) {
    $('#movieContainer').empty();
    for (const key of Object.keys(data)) {
        switch(key) {
            case 'Poster':
                jQuery('<img/>', {
                    id: 'PosterImage',
                    src: data[key],
                    width: 300
                }).appendTo($('#movieContainer'));
                break;
            case 'Ratings':
                for (i=0;i<data[key].length;i++) {
                    jQuery('<div/>', {
                        id: data[key][i].Source,
                        text: data[key][i].Source + ': ' + data[key][i].Value
                    }).appendTo('#movieContainer');
                }
                break;
            default:
                jQuery('<div/>', {
                    id: key,
                    text: key + ': ' + data[key]
                }).appendTo('#movieContainer');
        }
    }
}

function displayTweets(data) {
    console.log(data);
    for (i=0;i<data.length;i++) {
        for (const key of Object.keys(data[i])) {
            jQuery('<div/>', {
                id: key,
                text: key + ': ' + data[i][key]
            }).appendTo('#tweetsContainer');
        }
    }
}

function displayMusic(data) {
    console.log(data);
    for (i=0;i<data.tracks.items.length;i++) {
    data.tracks.items[i].external_urls.spotify
    }
}