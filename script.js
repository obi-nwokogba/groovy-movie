// OMDB MOVIE API KEY
// http://www.omdbapi.com/?apikey=[yourkey]&

// THEMOVIEDB.org
//https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa

let searchText, trendingString1Start, trendingString1End, trendingString2, trendingString;

const BASE_URL = "https://api.themoviedb.org/3/";
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
                    if (currentTrendingTitle === "undefined") {
                    } else if (currentTrendingTitle === undefined) {
                    } else if (currentTrendingTitle === null) {
                    } else {
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
    let currentTrendingTitle, currentVoteAverage;

    $.ajax({
            url: `https://api.themoviedb.org/3/trending/all/week?api_key=0153dd9142cbca8ace6559209c3cf1aa`
        })
        .then(
            function (returnedData) {

                for (i = 0; i < 17; i++) {
                    currentTrendingTitle = returnedData["results"][i]["title"];
                    currentVoteAverage = returnedData["results"][i]["vote_average"];

                    if (typeof trendingString2 === 'undefined') {
                        //alert("one undefined found!");
                    } else {
                        trendingString2 = trendingString2 +
                            `  <button rel="modal:open" class="trendingMovieButton" rel="modal:open" href="ex1">` +
                            currentTrendingTitle +
                            ` <span class="trendingFilmScore">${currentVoteAverage}</span></button>`;
                    }
                }
                $pageContent.html(`<p class="renderedText">${trendingString2}</p>`);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}

function renderHomePage() {
    $pageContent.html(``);
    $pageContent.html(``);
}

$("#trendingButton").on('click', renderTrendingPage);
$("#homeButton").on('click', renderHomePage);



renderTrendingPage();


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
        
    

    //$('.simple-marquee-container').SimpleMarquee();

});