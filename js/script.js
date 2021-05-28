let searchText, trendingString1Start, trendingString1End, trendingString2, trendingString;

// STATE VARIABLES
const BASE_URL = "https://api.themoviedb.org/3";
const TRENDING_BASE_URL = "https://api.themoviedb.org/3/trending/day";
const TRENDING_BASE_URL2 = "https://api.themoviedb.org/3/trending";
const apiBasicURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa";

const $renderTitleBox = $("#renderTitleBox");
const $renderYearBox = $("#renderYearBox");
const $renderIMDBRatingBox = $("#renderIMDBRatingBox");
const $moveImageBox1 = $("#moveImageBox1");
const $renderOverviewBox = $("#renderOverviewBox");
const $renderGenreBox = $("#renderGenreBox");
const $trendingBox = $("#trendingBox");
const $pageContent = $("#pageContent");
const trendingURL = `https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa/trending/{media_type}/{time_window}`;

// This empty global variable is used for moving around extra movie info from OMDB within the app
var omdbTitle, omdbCast, omdbDirector, omdbGenre, omdbPlot, omdbLanguage, omdbImdbrating, omdbMetascore, omdbAwards, omdbBoxoffice, omdbActors;



function getAdditionalMovieInfo(inputMovieTitle, inputMovieYear) {

    // http://www.omdbapi.com/?t=matrix&y=1999&plot=full

    // Since the OMDB single movie search returns more information fields, lets suppement our
    // TMDB data with data from OMDB. This function returns a JS object with 9 fields.

    $.ajax({
            url: `http://www.omdbapi.com/?t=${inputMovieTitle}&y=${inputMovieYear}&plot=full&i=tt3896198&apikey=f840d131`
        })
        .then(
            function (returnedData) {

                /* VARIABLES TO save and render from JSON returned
                1. omdbTitle, 
                2. omdbCast,
                3. omdbDirector, 
                4.omdbPlot,
                5. omdbLanguage,
                6. omdbImdbrating,
                7. omdbMetacriticrating
                8. omdbAwards
                9. omdbBoxoffice*/

                omdbTitle = returnedData["Title"];
                omdbCast = returnedData["Director"];
                omdbDirector = returnedData['Director'];
                omdbGenre = returnedData['Genre'];
                omdbPlot = returnedData['Plot'];
                omdbLanguage = returnedData['Language'];
                omdbImdbrating = returnedData['imdbRating'];
                omdbMetascore = returnedData['Metascore'];
                omdbAwards = returnedData['Awards'];
                omdbBoxoffice = returnedData['BoxOffice'];
                omdbActors = returnedData['Actors'];
                alert(omdbActors);
                alert(omdbGenre);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}


// This function is called when someone seearches for a movie.
function performSearch(event) {

    event.preventDefault();
    searchText = $("#searchBar").val();
    $('#searchBar').val("");

    let movieHTMLString = `<div class="movieDisplayContainer"><div class="movieDisplayLeftSide>`;
    let originalTitle4, backdropPath4, posterPath4, voteAverage4, overview4, releaseDate4,
        originalLanguage4, OMDBMovieInfo;


    $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {

                let returnedBackdropImage = returnedData["backdrop_path"];
                originalTitle4 = returnedData["results"][0]["original_title"];
                originalLanguage4 = returnedData["results"][0]["original_language"];

                releaseDate4 = returnedData["results"][0]["release_date"].slice(0, 4);
                voteAverage4 = returnedData["results"][0]["vote_average"];
                posterPath4 = returnedData["results"][0]["poster_path"];

                let posterDisplay =
                    `<img class="moviePoster" src="https://image.tmdb.org/t/p/w500${posterPath4}"></img>`;

                backdropPath4 = returnedData["results"][0]["backdrop_path"];
                let backdropDisplay = `<img src="https://image.tmdb.org/t/p/w500${backdropPath4}"></img>`;

                overview4 = returnedData["results"][0]["overview"];
                let overviewDisplay = `<p class="renderedText1">${overview4}</p>`;

                /* VARIABLES available in the OMDBMovieInfo 
                1. omdbTitle, 
                2. omdbCast,
                3. omdbDirector, 
                4.omdbPlot,
                5. omdbLanguage,
                6. omdbImdbrating,
                7. omdbMetacriticrating
                8. omdbAwards
                9. omdbBoxoffice*/

                alert(omdbBoxoffice);

                movieHTMLString = `                     
                <p class="heading2">${originalTitle4} &middot; 
                <span class="lighter">${releaseDate4}</span></p>

                <div class="movieDisplayLeftSide">
                ${overviewDisplay}
                
                
                </div>

                <div class="movieDisplayRightSide">
                ${posterDisplay}
                </div>
                <div class="quickStatsContainer">
                   
                    <div class="quickStatBox">
                        <p class="quickStatsHeading">IMDB Rating</p>
                        <p id="renderIMDBRatingBox" class="renderedText1">${voteAverage4}</p>
                    </div>
                    <div class="quickStatBox">
                    <p class="quickStatsHeading">Language</p>
                    <p id="renderYearBox" class="renderedText1">${originalLanguage4}</p>
                </div>
                    <div class="quickStatBox">
                        <p class="quickStatsHeading">Genre</p>
                        <p id="renderGenreBox" class="renderedText1">${omdbBoxoffice}</p>
                    </div>
                </div>`;

                $pageContent.html(movieHTMLString);

            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}

function getMarquee(event) {

    let currentTrendingTitle;
    let trendingStringMiddle = "";
    trendingString1End = ` </ul></div></div>`;

    $.ajax({
            url: `https://api.themoviedb.org/3/trending/all/day?api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {

                for (i = 0; i < 17; i++) {

                    currentTrendingTitle = returnedData["results"][i]["title"];

                    // This check is made because I noticed that occasionally the JSON returns undefined titles.
                    if (currentTrendingTitle === "undefined") {} else if (currentTrendingTitle === undefined) {} else if (currentTrendingTitle === null) {} else {
                        trendingStringMiddle = `${trendingStringMiddle} <li> ${currentTrendingTitle} </li>`;
                    }
                }
                $(".marquee-content-items").html(trendingStringMiddle);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}

function renderTrendingPage() {

    trendingString2 = "";
    let currentTrendingTitle, currentVoteAverage, overview, backdropPath;

    $.ajax({
            url: `https://api.themoviedb.org/3/trending/all/week?api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {

                for (i = 0; i < 19; i++) {
                    currentTrendingTitle = returnedData["results"][i]["title"];
                    currentVoteAverage = returnedData["results"][i]["vote_average"];
                    overview = returnedData["results"][i]["overview"];
                    backdropPath = returnedData["results"][i]["backdrop_path"];

                    if (typeof trendingString2 === 'undefined') {
                        //alert("one undefined found!");
                    } else {
                        trendingString2 = trendingString2 +
                            `  
                            
                            <button class="trendingMovieButton">` +
                            `<span class="trendingTitle">${currentTrendingTitle}</title
                            <span class="trendingFilmScore">${currentVoteAverage}</span>
                            
                            <div class="hiddenContent"> 

                            <img src="https://image.tmdb.org/t/p/w500${backdropPath}" class="trendingImageHidden">
                            
                            <p class="trendingText">
                            ${overview}</p></div>
                            </button>`;
                    }
                }
                $pageContent.html(`<h1>trending this week</h1>
                <p class="renderedText">${trendingString2}</p>`);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}


function renderHomePage() {

    let homeStringHTML = "";
    let currentTrendingTitle, currentVoteAverage, overview, backdropPath;

    // THEMOVIEDB.org
    //https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa

    $.ajax({
            url: `https://api.themoviedb.org/3/genre/movie/list?api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {

                for (i = 0; i < 19; i++) {
                    currentTrendingTitle = returnedData["results"][i]["title"];
                    currentVoteAverage = returnedData["results"][i]["vote_average"];
                    overview = returnedData["results"][i]["overview"];
                    backdropPath = returnedData["results"][i]["backdrop_path"];

                    if (typeof trendingString2 === 'undefined') {
                        //alert("one undefined found!");
                    } else {
                        trendingString2 = trendingString2 +
                            `<button class="trendingMovieButton">
                            <span class="trendingTitle">${currentTrendingTitle}</span>

                            <span class="trendingFilmScore">${currentVoteAverage}</span>
                            
                            <div class="hiddenContent"> 

                            <img src="https://image.tmdb.org/t/p/w500${backdropPath}" class="trendingImageHidden">
                            
                            <p class="trendingText">
                            ${overview}</p></div>
                            
                            </button>`;
                    }
                }
                $pageContent.html(`<h1>Welome to Groovy Movie!<br />The place where cinema lives.</h1><h3>Trending this Week</h3>
                <p class="renderedText">${trendingString2}</p>`);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}



function renderAboutPage() {
    $pageContent.html(`<h1>about Groovy Movie</h1><p class="renderedText1">Thanks for using Groovy Movie! Groovy Movie is the first project by Obi Nwokogba, a Software Engineering student at 
    <a href="https://generalassemb.ly/" target="_blank">General Assembly</a>.<br /><br /> This app's source code is on 
    <a href="" target="_blank">Github</a>, and some technologies used in this app are Javascript, CSS, HTML, jQuery, Bootstrap and this <a href="https://www.jqueryscript.net/demo/jQuery-Plugin-For-Horizontal-Text-Scrolling-Simple-Marquee/" target="_blank">jQuery Marquee</a> plugin. The information on this site is all courtesy of 
    <a href="https://developers.themoviedb.org" target="_blank">TheMovieDB.org's excellent and free API.</a> and the <a href="https://www.omdbapi.com/" target="_blank">OMDB API also</a></p>`);
}

function renderPeoplePage() {
    $.ajax({
            url: `https://api.themoviedb.org/3/person/popular?api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {
                let returnedBackdropImage = returnedData["backdrop_path"];
                $renderTitleBox.text(returnedData["original_title"]);

                let releaseDate = returnedData["release_date"];
                $renderYearBox.text(releaseDate.substring(0, 4));
                $renderIMDBRatingBox.text(returnedData["vote_average"]);
                $renderGenreBox.text(returnedData["genres"][0]["name"]);

                // Display an Image
                $moveImageBox1.html(`<img class="mainMovieImage" src="https://image.tmdb.org/t/p/w500${returnedBackdropImage}" alt="movie poster" />`);
                $renderOverviewBox.text(returnedData["overview"]);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}


function getGenre(genreNumber) {

    let genreString = "";

    $.ajax({
            url: `https://api.themoviedb.org/3/trending/all/week?api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {
                let returnedBackdropImage = returnedData["backdrop_path"];
                $renderTitleBox.text(returnedData["original_title"]);

                let releaseDate = returnedData["release_date"];
                $renderYearBox.text(releaseDate.substring(0, 4));
                $renderIMDBRatingBox.text(returnedData["vote_average"]);
                $renderGenreBox.text(returnedData["genres"][0]["name"]);

                // Display an Image
                $moveImageBox1.html(`<img class="mainMovieImage" src="https://image.tmdb.org/t/p/w500${returnedBackdropImage}" alt="movie poster" />`);
                $renderOverviewBox.text(returnedData["overview"]);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
    return genreString;
}



function renderCinemaGridPage() {

    trendingString2 = `<span id="cinemaGridContainer">`;
    let cinemaGridHTMLSequence = "";
    let filmGenre1 = "";
    let filmGenre2 = "";
    let currentTrendingTitle, currentVoteAverage, overview, backdropPath;

    $.ajax({
            url: `https://api.themoviedb.org/3/trending/all/day?api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {

                for (i = 0; i < 19; i++) {
                    currentTrendingTitle = returnedData["results"][i]["title"];
                    currentVoteAverage = returnedData["results"][i]["vote_average"];
                    //overview = returnedData["results"][i]["overview"];
                    backdropPath = returnedData["results"][i]["backdrop_path"];
                    filmGenre1 = "Thriller";

                    if (typeof trendingString2 === 'undefined') {
                        //alert("one undefined found!");
                    } else {
                        cinemaGridHTMLSequence = cinemaGridHTMLSequence +
                            `<span class="cinemaGridUnit"><img src="https://image.tmdb.org/t/p/w500${backdropPath}" class="trendingImageHidden">

                            <div class="cinemaGridDetails">
                            <span class="cinemaGridDetailBox1">${currentTrendingTitle}</span> 
                            <span class="cinemaGridDetailBox2">${filmGenre1}</span>
                            <span class="trendingFilmScore">${currentVoteAverage}</span>
                            </div></span>`;

                    }
                }
                $pageContent.html(`<h1>cinema grid</h1>
                ${cinemaGridHTMLSequence}
                </span>`);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}


$("#cinemaGridButton").on('click', renderCinemaGridPage);
$("#trendingButton").on('click', renderTrendingPage);
$("#homeButton").on('click', renderHomePage);
$("#aboutButton").on('click', renderAboutPage);


// $(".trendingMovieButton").on('click', function () {

// }) 




$(function () {
    let options = {
        autostart: true,
        property: 'value',
        onComplete: null,
        duration: 910000,
        padding: 10,
        marquee_class: '.marquee',
        container_class: '.simple-marquee-container',
        sibling_class: 0,
        hover: true,
        velocity: 0.06,
        direction: 'left'
    }

    setInterval(function () {
        $('.simple-marquee-container').SimpleMarquee(options);
    }, 1000);
});

$("form").on('submit', performSearch);

getMarquee();
renderCinemaGridPage();





// OMDB MOVIE API KEY
// http://www.omdbapi.com/?apikey=[yourkey]&

// THEMOVIEDB.org
//https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa


// $5 PATREON API
// i=tt3896198&apikey=f840d131
//OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=f840d131
//Poster API: http://img.omdbapi.com/?i=tt3896198&h=600&apikey=f840d131

// http://www.omdbapi.com/?t=matrix&y=1999&plot=full&i=tt3896198&apikey=f840d131