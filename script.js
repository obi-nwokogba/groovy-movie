// OMDB MOVIE API KEY
// http://www.omdbapi.com/?apikey=[yourkey]&

// THEMOVIEDB.org
//https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa

let searchText, trendingString;

const apiBaseURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa";
const apiBasicURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa";

const $renderTitleBox = $("#renderTitleBox");
const $renderYearBox = $("#renderYearBox");
const $renderIMDBRatingBox = $("#renderIMDBRatingBox");
const $moveImageBox1 = $("#moveImageBox1");
const $renderOverviewBox = $("#renderOverviewBox");
const $renderGenreBox = $("#renderGenreBox");
const $trendingBox = $("#trendingBox");

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
                            } else if (currentTrendingTitle === null) {
                                //alert('Variable "comment" is null.');
                            } else {
                                trendingString = trendingString + " &bull; " + currentTrendingTitle;
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
    alert("trending button clicked!");
    
    
    let currentTrendingTitle;

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
                            } else if (currentTrendingTitle === null) {
                                //alert('Variable "comment" is null.');
                            } else {
                                trendingString = trendingString + " &bull; " + currentTrendingTitle;
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

$("#trendingButton").on('click', renderTrendingPage);