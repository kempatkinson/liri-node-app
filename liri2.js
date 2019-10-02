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
            console.log(response.data[0].venue.name)
            console.log(response.data[0].venue.city + " , " + response.data[0].venue.country)
            console.log(moment(response.data[0].datetime).format('MM/DD/YYYY'))

        })



    } else if (operation == "spotify-this-nodsong") {
        if (argument == "") {
            argument = "The Sign Ace of Base"
        }
        spotify.search({ type: 'track', query: argument }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(JSON.stringify(data, "paul", 2));
            console.log("Artist: " + data.tracks.items[0].artists[0].name)
            console.log("Album: " + data.tracks.items[0].album.name)
            console.log("Song: " + data.tracks.items[0].name)
            console.log(data.tracks.items[0].external_urls)

        });


    } else if (operation == "movie-this") {
        if (argument == "") {
            argument = "Mr. Nobody"
        }
        var queryURL = "https://www.omdbapi.com/?t=" + argument + "&apikey=trilogy";
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



    } else if (operation == "do-what-it-says") {
        fs.readFile("random.txt", "utf-8", function (err, data) {
            // console.log(data.split(","));

            // data.split(",")[1] = subject;
            var fileArr = data.split(",")
            console.log(fileArr[1])
            run(fileArr[0], fileArr[1])

        })


    }
    fs.appendFile("output.txt", operation + "," + argument, function(err) {

    // If the code experiences any errors it will log the error to the console.

    // Otherwise, it will print: "movies.txt was updated!"

});
}

run(operation,argument)

// inquirer.prompt([
//     {
//         type: "list",
//         name: "userGuess",
//         message: "Choose your search operation",
//         choices: ["Look up Concert", "Look up Song", "Look up Movie", "Read Text File",]
//     }

// ]).then(function (guess1) {
//     inquirer.prompt([

//         {
//             type: "input",
//             name: "userInput",
//             message: "What do you want to search?"
//         }
        
//     ]).then(function (guess2) {
//         console.log ( JSON.stringify(guess1.userGuess) + " " + JSON.stringify(guess2.userInput))
        
//         var operation = JSON.stringify(guess1.userGuess);
//         var subject = JSON.stringify(guess2.userInput);
        
//         run(operation, subject)
        
        
//       }
//     )
// })


