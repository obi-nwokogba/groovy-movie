// OMDB MOVIE API KEY
// OPEN WEATHER API KEY    9e2e79e449de63b165683ac1fcb83225
// http://www.omdbapi.com/?apikey=[yourkey]&

// THEMOVIEDB.org
//https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa




let searchText;
const apiBaseURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa";

/*
const trendingURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa/trending/{media_type}/{time_window}"*/


const $renderTitleBox = $("#renderTitleBox");
const $renderYearBox = $("#renderYearBox");
const $renderCastBox = $("#renderCastBox");


function handleGetData(event) {

  event.preventDefault();
  searchText = $("#searchBar").val();

  alert("HI THERE");

  $.ajax({
      url: `https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa`,
    })
    .then(

      function (returnedData) {

        $renderTitleBox.text(returnedData["original_title"]);



        /*
        $renderYearBox.text(returnedData["main"]["feels_like"]).fadeIn(6000);

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