require("dotenv").config();
const axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require(`moment`)
var fs = require("fs")
moment().format()
// console.log(require("dotenv").config())


var spotify = new Spotify(keys.spotify);



var word = process.argv[2];
var subject = process.argv.slice(3).join(" ");


function run(word, subject) {
    if (word == "concert-this") {
        var queryURL = "https://rest.bandsintown.com/artists/" + subject + "/events/?app_id=codingbootcamp";
        axios.get(queryURL).then(function (response) {
            console.log(response.data[0].venue.name)
            console.log(response.data[0].venue.city + " , " + response.data[0].venue.country)
            console.log(moment(response.data[0].datetime).format('MM/DD/YYYY'))

        })



    } else if (word == "spotify-this-song") {
        if (subject == "") {
            subject = "The Sign Ace of Base"
        }
        spotify.search({ type: 'track', query: subject }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(JSON.stringify(data, "paul", 2));
            console.log("Artist: " + data.tracks.items[0].artists[0].name)
            console.log("Album: " + data.tracks.items[0].album.name)
            console.log("Song: " + data.tracks.items[0].name)
            console.log(data.tracks.items[0].external_urls)

        });


    } else if (word == "movie-this") {
        if (subject == "") {
            subject = "Mr. Nobody"
        }
        var queryURL = "https://www.omdbapi.com/?t=" + subject + "&apikey=trilogy";
        axios.get(queryURL).then(function (response) {
            console.log(response.data.Title)
            console.log(response.data.Year)
            console.log(response.data.imdbRating)
            console.log(response.data.Ratings[1].Value)
            console.log(response.data.Country)
            console.log(response.data.Language)
            console.log(response.data.Plot)
            console.log(response.data.Actors)

        })



    } else if (word == "do-what-it-says") {
        fs.readFile("random.txt", "utf-8", function (err, data) {
            // console.log(data.split(","));
           
            // data.split(",")[1] = subject;
            var fileArr = data.split(",")
            console.log(fileArr[1])
            run(fileArr[0], fileArr[1])

        })


    }
}
run(word,subject)