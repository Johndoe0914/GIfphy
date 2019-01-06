var topics = ["Drifting", 'SkateBoarding', "SnowBoarding"];

function renderbuttons(){
    $("#buttons").empty();
    for(var i = 0; i < topics.length; i++){
    var a = $("<button>|");
    a.text(topics[i]);
    
    $("#buttons").append(a);
    
    }
};


$("#buttons").on("click",function(){
var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + topics +  "&api_key=63gJUa5SGQTZGYebghd1yJXqkjoU4bzO&limit=5";
 
$.ajax({
    url: queryUrl,
    method: "GET",

}).then(function(response){
    var type = $(this).data('type');
    console.log(response);
   var results = response.data;
       
   for(var i = 0; i < results.length; i++){
       var newDiv = $("<div>");
       var p = $("<p>").text("Rating :" + results[i].rating);
       var animated = results[i].images.fixed_height.url;
       var still =  results[i].images.fixed_height_still.url;
       var GifImage = $("<img>");
       GifImage.attr("src" , still);
       GifImage.attr("data-still", still);
       GifImage.attr("data-animated", animated);
       GifImage.attr("data-state", "still")
       GifImage.addClass('searchImage')
       newDiv.append(p);
       newDiv.append(GifImage);
       $("#Gif-here").prepend(newDiv);
      
   }
});
$(document).on("click", '.searchImage', function(){
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr('src' ,$(this).data('animated'));
        $(this).attr("data-state", "animated")
    }else {
        $(this).attr('src' ,$(this).data('still'));
        $(this).attr("data-state", "still")

    }
})


});

$("#user-submit").on("click", function(event){
    event.preventDefault();
    var topic = $("#user-text").val().trim();
    topics.push(topic);
    renderbuttons();
});
renderbuttons();



