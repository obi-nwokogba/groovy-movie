// OMDB MOVIE API KEY
// http://www.omdbapi.com/?apikey=[yourkey]&

// THEMOVIEDB.org
//https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa

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
























function handleGetData(event) {

    event.preventDefault();
    searchText = $("#searchBar").val();

    $.ajax({
            url: `https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa`
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






function getTrending(event) {

    let currentTrendingTitle;
    let trendingStringMiddle = "";

    trendingString1Start = `<div class="marqueecontainer">
    <div class="marquee-sibling"> Breaking News </div>
    <div class="marquee">
      <ul class="marquee-content-items">`;

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

$("form").on('submit', handleGetData);
getTrending();




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
                $pageContent.html(`<h1>Trending this Week</h1>
                <p class="renderedText">${trendingString2}</p>`);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}

function renderHomePage() {
    $pageContent.html(`<h1>Welome to Groovy Movie!<br />The place where cinema lives.</h1>`);
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


function getGenre(genreNumber){
    let genreString ="";



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
                            `<img src="https://image.tmdb.org/t/p/w500${backdropPath}" class="trendingImageHidden">

                            <div class="cinemaGridDetails">
                            <span class="cinemaGridDetailBox1">${currentTrendingTitle}</span> 
                            <span class="cinemaGridDetailBox2">${filmGenre1}</span>
                            <span class="trendingFilmScore">${currentVoteAverage}</span>
                            </div>`;

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








$("#trendingButton").on('click', renderTrendingPage);
$("#homeButton").on('click', renderHomePage);
$("#aboutButton").on('click', renderAboutPage);
$("#peopleButton").on('click', renderPeoplePage);
$("#cinemaGridButton").on('click', renderCinemaGridPage);

/*
$(".trendingMovieButton").on('click', function () {
    alert(this);
}) */

$("#pageContent").on('click', 'button', function (event) {
    alert(event.target);
    event.target.getch

});




$("#fade").modal({
    fadeDuration: 100
});


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

    $('.simple-marquee-container').SimpleMarquee(options);
});



//renderTrendingPage();
renderCinemaGridPage();