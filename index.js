var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userPattern = [];

var start = false;
var level = 0;

$(document).ready(function () {
  $(".enter").click(function(){
    if (!start) {
      $("#level").text("Level " + level);
      nextSequence();
      start = true; 
    }
  });
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userPattern.length-1);
});
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else{
      playSound("wrong");
      $("#level").text("Game Over, Press PLAY to Restart");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}
function nextSequence() {
  userPattern = [];
  level++;
  $("#level").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver()
{
    level = 0;
    gamePattern=[];
    start = false;
}