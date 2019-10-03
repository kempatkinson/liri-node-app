require("dotenv").config();
const axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var moment = require(`moment`)
var fs = require("fs")
var inquirer = require("inquirer");
moment().format()
// console.log(require("dotenv").config())


var spotify = new Spotify(keys.spotify);



var operation = process.argv[2];
var argument = process.argv.slice(3).join(" ");

function run(operation, argument) {
    if (operation == "concert-this") {
        var queryURL = "https://rest.bandsintown.com/artists/" + argument + "/events/?app_id=codingbootcamp";
        axios.get(queryURL).then(function (response) {
            
            console.log("Name of venue: " + response.data[0].venue.name)
            console.log("Country: " + response.data[0].venue.city + " , " + response.data[0].venue.country)
            console.log("Date of: " + moment(response.data[0].datetime).format('MM/DD/YYYY'))
        })

    } else if (operation == "spotify-this-song") {
        if (argument == "") {
            argument = "The Sign Ace of Base"
        }
        spotify.search({ type: 'track', query: argument }, function (data) {

            // console.log(JSON.stringify(data, "paul", 2));
            console.log(data)
            // console.log("Artist: " + data.tracks.items[0].artists[0].name)
            // console.log("Album: " + data.tracks.items[0].album.name)
            // console.log("Song: " + data.tracks.items[0].name)
            // console.log(data.tracks.items[0].external_urls)

        });


    } else if (operation == "movie-this") {
        if (argument == "") {
            argument = "Mr. Nobody"
        }
        var queryURL = "https://www.omdbapi.com/?t=" + argument + "&apikey=trilogy";
        axios.get(queryURL).then(function (response) {
            console.log('Title: response.data.Title')
            console.log("Year: " + response.data.Year)
            console.log("IMBD Rating: " + response.data.imdbRating)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Countries where movie was released: " + response.data.Country)
            console.log("Languages available: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Cast: " + response.data.Actors)

        })



    } else if (operation == "do-what-it-says") {
        fs.readFile("random.txt", "utf-8", function (err, data) {
            var fileArr = data.split(",")
            run(fileArr[0], fileArr[1])

        })
    }

}


inquirer.prompt([
    {
        type: "list",
        name: "userGuess",
        message: "Choose your search operation",
        choices: ["Look up Concert", "Look up Song", "Look up Movie", "Read this File",]
    }

]).then(function (guess1) {

    var operation2 = guess1.userGuess;
    if (operation2 === "Look up Concert") {
        inquirer.prompt([

            {
                type: "input",
                name: "userInput",
                message: "Who's concert do you wanna look up?"
            }

        ]).then(function (guess2) {
            run("concert-this", guess2.userInput)
        })
    } else if (operation2 == "Look up Song") {
        inquirer.prompt([

            {
                type: "input",
                name: "userInput",
                message: "What's the name of the song  you wanna look up?"
            }

        ]).then(function (guess3) {
            run("spotify-this-song", guess3.userInput)
        })

    } else if (operation2 == "Look up Movie") {
        inquirer.prompt([

            {
                type: "input",
                name: "userInput",
                message: "What's the name of the movie  you wanna look up?"
            }

        ]).then(function (guess4) {
            run("movie-this", guess4.userInput)
        })

    } else if (operation2 == "Read this File") {
        inquirer.prompt([

            {
                type: "input",
                name: "userInput",
                message: "What's the name of the file in the local directory that you wanna look up?"
            }

        ]).then(function (guess5) {
            run("do-what-it-says", guess5.userInput)
        })

    }




}
)


