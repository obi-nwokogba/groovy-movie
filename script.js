// OMDB MOVIE API KEY
// http://www.omdbapi.com/?apikey=[yourkey]&

// THEMOVIEDB.org
//https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa

let searchText, trendingString, trendingString2;

const apiBaseURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa";
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
    trendingString1Start = `<div class="container">
    <div class="marquee-sibling"> Breaking News </div>
    <div class="marquee">
      <ul class="marquee-content-items">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>`;

    let trendingString1End = ` </ul></div></div>`;


    $.ajax({
            url: `https://api.themoviedb.org/3/trending/all/week?api_key=0153dd9142cbca8ace6559209c3cf1aa`,
        })
        .then(
            function (returnedData) {

                for (i = 0; i < 17; i++) {
                    currentTrendingTitle = returnedData["results"][i]["title"];

                    // This check is made because I noticed that occasionally the JSON returns undefined titles.


                    if (currentTrendingTitle === "undefined") {
                        //alert('Variable "comment" is undefined.');
                    } else if (currentTrendingTitle === undefined) {
                        //alert('Variable "comment" is null.');
                    } else if (currentTrendingTitle === null) {
                        //alert('Variable "comment" is null.');
                    } else {
                        trendingString = trendingString + " <li>" + currentTrendingTitle + "</li>";
                        console.log(returnedData["results"][i]["title"]);
                    }
                }
                $trendingBox.html(trendingString);
            },
            function (error) {
                console.log("bad request: ", error);
            }
        );
}

$("form").on('submit', handleGetData);





// Lets start by showing whats popular
getTrending();



function renderTrendingPage() {

    trendingString2 = "";

    let currentTrendingTitle, currentVoteAverage;

    $.ajax({
            url: `https://api.themoviedb.org/3/trending/all/week?api_key=0153dd9142cbca8ace6559209c3cf1aa`,
        })
        .then(
            function (returnedData) {

                // Clear the page
                $pageContent.html(" ");

                for (i = 0; i < 17; i++) {
                    currentTrendingTitle = returnedData["results"][i]["title"];
                    currentVoteAverage = returnedData["results"]["0"]["vote_average"];



                    //alert(typeof trendingString);


                    if (typeof trendingString === 'undefined') {
                        alert("one undefined found!");
                    } else {

                        trendingString2 = trendingString2 + " &bull; " + currentTrendingTitle;


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