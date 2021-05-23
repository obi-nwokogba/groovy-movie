// OMDB MOVIE API KEY
// http://www.omdbapi.com/?apikey=[yourkey]&

// THEMOVIEDB.org
//https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa

let searchText;
const apiBaseURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa";

const apiBasicURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa";


const $renderTitleBox = $("#renderTitleBox");
const $renderYearBox = $("#renderYearBox");
const $renderIMDBRating = $("#renderIMDBRating");
const $moveImageBox1 = $("#moveImageBox1");
const $renderOverviewBox = $("#renderOverviewBox");

/*
 const trendingURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa/trending/{media_type}/{time_window}"*/



//alert("line 22");

function handleGetData(event) {

    event.preventDefault();

    searchText = $("#searchBar").val();

    $.ajax({
        url: `https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa`,
    })
            .then(
                    function (returnedData) {

                        let returnedBackdropImage = returnedData["backdrop_path"];

                        //console.log(returnedData);
                        $renderTitleBox.text(returnedData["original_title"]);

                        let releaseDate = returnedData["release_date"];
                        $renderYearBox.text(releaseDate.substring(0, 4));

                        $renderIMDBRating.text(returnedData["vote_average"]);

                        // Display an Image
                        $moveImageBox1.html(`<img class="mainMovieImage" src="https://image.tmdb.org/t/p/w500${returnedBackdropImage}" alt="movie poster" />`);


                        $renderOverviewBox.text(returnedData["overview"]);

                        /*                         
                         $renderCastBox.text(returnedData["weather"][0]["description"]);
                         $longitudeLatitude.text(returnedData["coord"]["lon"] + ", " + returnedData["coord"]["lat"]);
                         
                         $(".outputSide").show();
                         //document.getElementById("longitudeLatitude").innerText(returnedData["coord"]["lat"]);
                         
                         $('#outputSide').append("Max Temp: " + returnedData["main"]["temp_max"]);
                         */
                    },
                    function (error) {
                        console.log("bad request: ", error);
                    }
            );
}



function handleGetData(event) {

  event.preventDefault();

  searchText = $("#searchBar").val();

  $.ajax({
      url: `https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa`,
  })
          .then(
                  function (returnedData) {

                      let returnedBackdropImage = returnedData["backdrop_path"];

                      //console.log(returnedData);
                      $renderTitleBox.text(returnedData["original_title"]);

                      let releaseDate = returnedData["release_date"];
                      $renderYearBox.text(releaseDate.substring(0, 4));

                      $renderIMDBRating.text(returnedData["vote_average"]);

                      // Display an Image
                      $moveImageBox1.html(`<img class="mainMovieImage" src="https://image.tmdb.org/t/p/w500${returnedBackdropImage}" alt="movie poster" />`);


                      $renderOverviewBox.text(returnedData["overview"]);

                      /*                         
                       $renderCastBox.text(returnedData["weather"][0]["description"]);
                       $longitudeLatitude.text(returnedData["coord"]["lon"] + ", " + returnedData["coord"]["lat"]);
                       
                       $(".outputSide").show();
                       //document.getElementById("longitudeLatitude").innerText(returnedData["coord"]["lat"]);
                       
                       $('#outputSide').append("Max Temp: " + returnedData["main"]["temp_max"]);
                       */
                  },
                  function (error) {
                      console.log("bad request: ", error);
                  }
          );
}

$("form").on('submit', handleGetData);