let searchText, trendingString1Start, trendingString1End, trendingString2, trendingString;

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











function getAdditionalMovieInfo(inputMovieTitle,inputMovieYear){

    // http://www.omdbapi.com/?t=matrix&y=1999&plot=full



    











// TODO CURRENT
function performSearch(event) {

    event.preventDefault();
    searchText = $("#searchBar").val();

    let movieHTMLString = `<div class="movieDisplayContainer"><div class="movieDisplayLeftSide>`;
    let originalTitle4, backdropPath4, posterPath4, voteAverage4, overview4, releaseDate4,
        originalLanguage4;

    $.ajax({
            url: `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {
                let returnedBackdropImage = returnedData["backdrop_path"];

                originalTitle4 = returnedData["results"][0]["original_title"];
                originalLanguage4 = returnedData["results"][0]["original_language"];

                releaseDate4 = (returnedData["results"][0]["release_date"]).slice(0, 4);
                voteAverage4 = returnedData["results"][0]["vote_average"];

                posterPath4 = returnedData["results"][0]["poster_path"];
                let posterDisplay =
                    `<img class="moviePoster" src="https://image.tmdb.org/t/p/w500${posterPath4}"></img>`;

                backdropPath4 = returnedData["results"][0]["backdrop_path"];
                let backdropDisplay = `<img src="https://image.tmdb.org/t/p/w500${backdropPath4}"></img>`;

                overview4 = returnedData["results"][0]["overview"];
                let overviewDisplay = `<p class="renderedText1">${overview4}</p>`;


                movieHTMLString = `                     
                <p class="heading2">${originalTitle4} &middot; 
                <span class="lighter">${releaseDate4}</span></p>

                <div class="movieDisplayLeftSide">
                ${overviewDisplay}</div>

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
                        <p id="renderGenreBox" class="renderedText1"></p>
                    </div>
                </div>`;


                $pageContent.html(movieHTMLString);

                //$pageContent.html(`HELLO WORLD`);
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

$("form").on('submit', performSearch);


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
                            currentTrendingTitle +
                            ` <span class="trendingFilmScore">${currentVoteAverage}</span>
                            
                            <div class="hiddenContent"> 

                            <img src="https://image.tmdb.org/t/p/w500${backdropPath}" class="trendingImageHidden">
                            
                            <p class="trendingText">
                            ${overview}</p></div>
                            
                            </button>`;
                    }
                }
                $pageContent.html(`<h1>Trending this Week</h1>
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
                            `  
                            <button class="trendingMovieButton" href="ex1">` +
                            currentTrendingTitle +
                            ` <span class="trendingFilmScore">${currentVoteAverage}</span>
                            
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
    $pageContent.html(`<h1>About Groovy Movie</h1><p class="renderedText1">Thanks for using Groovy Movie! Groovy Movie is the first project by Obi Nwokogba, a Software Engineering student at General Assembly.<br /><br /> This app's source code is on 
    <a href="" target="_blank">Github</a>, and some technologies used in this app are Javascript, CSS, HTML, jQUery, Bootstrap, and the information on this site is all courtesy of 
    <a href="https://developers.themoviedb.org/3/people/get-popular-people" target="_blank">TheMovieDB.org's excellent and free API.</p>`);
}

function renderPeoplePage() {
    $.ajax({
            url: `https://api.themoviedb.org/3/person/popular?api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {
                let returnedBackdropImage = returnedData["backdrop_path"];

                //console.log(returnedData);
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

                //console.log(returnedData);
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
            url: `https://api.themoviedb.org/3/trending/all/week?api_key=0153dd9142cbca8ace6559209c3cf1aa`
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

    //$('.simple-marquee-container').SimpleMarquee(options);

    setInterval(function () {
        $('.simple-marquee-container').SimpleMarquee(options);
    }, 1000);
});


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

// http://www.omdbapi.com/?t=matrix&y=1999&plot=full