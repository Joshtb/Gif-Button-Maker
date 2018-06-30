var topics = ["My Hero Academia", "Attack on Titan", "Soul Eater", "Death Note", "Full Metal Alchemist"];
// Function for displaying gif data
function renderButtons() {

  $("#buttons-view").empty();

  // Loops through the array of movies



  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");


    a.addClass("gif")




    a.attr("data-name", topics[i]);

    a.text(topics[i]);

    $("#buttons-view").append(a);
  }
}

function displayInfo() {
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=C2p0qM8mh07O7KzT3rYj2IYMAI8Tutlb&limit=10";
  $("#gif-view").empty();
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log("success got data", response);
    var myDiv = $("<div>");
    myDiv.append(gif);
    var data = response.data;
    var myNewDiv = $("<div>");
    myDiv.addClass("newdiv");
    myNewDiv.append(data);
    myDiv.append(myNewDiv);


    for (var i = 0; i < data.length; i++) {

      var imgURL = response.data[i].images.downsized_still.url;

      var imgURL2 = response.data[i].images.downsized.url;

      var img = $("<img>").attr("src", imgURL);
      img.addClass("gify");
      img.attr("data-state", "still");
      img.attr("data-still", imgURL);
      img.attr("data-animate", imgURL2);



      var rating = response.data[i].rating;

      var myElem = $("<h3>");
      myElem.append("Rated: " +rating);
      img.append(myElem);
      myDiv.append(myElem, img);
    }





    // myDiv.prepend($(".gif"));
    $("#gif-view").append(myDiv);
  });
}
$(document).on("click", ".gify", function () {
  event.preventDefault();
  if ($(this).attr("data-state") === "still") {
    $(this).attr("data-state", "animate");
    $(this).attr("src", $(this).attr("data-animate"));
  } else {
    $(this).attr("data-state", "still");
    $(this).attr("src", $(this).attr("data-still"));
  };
});
$("#add-gif").on("click", function (event) {
  event.preventDefault();


  // This line of code will grab the input from the textbox
  var gif = $("#gif-input").val().trim();

  // The movie from the textbox is then added to our array
  topics.push(gif);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();

});


$(document).on("click", ".gif", displayInfo);



renderButtons();