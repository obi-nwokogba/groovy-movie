// OMDB MOVIE API KEY
// OPEN WEATHER API KEY    9e2e79e449de63b165683ac1fcb83225
// http://www.omdbapi.com/?apikey=[yourkey]&

// THEMOVIEDB.org
//https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa




let searchText;
const apiBaseURL = "https://api.themoviedb.org/3/movie/550?api_key=0153dd9142cbca8ace6559209c3cf1aa";





/*


const $location = $("#location");
const $temperature = $("#temperature");
const $feelslike = $("#feelslike");
const $weather = $("#weather");
const $longitudeLatitude = $("#longitudeLatitude");

function handleGetData(event) {

  event.preventDefault();
  
  searchText = $("#searchForm").val();

  $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=9e2e79e449de63b165683ac1fcb83225&units=imperial`,
    })
    .then(

      function (returnedData) {

        $(".outputSide").hide();

        //movieData = data;
        $location.text(returnedData["name"]).fadeIn(6000);
        $temperature.text(returnedData["main"]["temp"]).$fadeIn(6000);
        $feelslike.text(returnedData["main"]["feels_like"]).fadeIn(6000);

        $weather.text(returnedData["weather"][0]["description"]);

        $longitudeLatitude.text(returnedData["coord"]["lon"] + ", " + returnedData["coord"]["lat"]);

        $(".outputSide").show();
        //document.getElementById("longitudeLatitude").innerText(returnedData["coord"]["lat"]);

        $('#outputSide').append("Max Temp: " + returnedData["main"]["temp_max"]);
      },






      function (error) {
        console.log("bad request: ", error);
      }




    );
}








$("form").on('submit', handleGetData);
$(".outputSide").hide();





*/