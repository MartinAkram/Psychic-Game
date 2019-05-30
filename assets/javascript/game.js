//Global Variables
var winText = document.getElementById("winCount");
var bandName = document.getElementById("bandName");
var guessCount = document.getElementById("guessesRemaining");
var guessedLetters = document.getElementById("guessedLetters");
var resetButton = document.getElementById("reset-button");
var wins = 0;
var totalGuesses = 12;

//This variable sets the initial number of guesses to 12
var guesses = 12;

//This variable stores the individuals letters of my chosen band
var bandName = ["e", "a", "g", "l", "e", "s"];

//This variable will store the letters that the user clicks
var alreadyGuessed = [];

//This function, gameStart, will run once an alphanumeric key is pressed
//It will store the letters in an the empty array called "alreadyGuessed"
function gameStart(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    //key codes 65 to 90 represent the alpha keys on a keyboard
    if (alreadyGuessed.includes(e.key)) {
      return;
    } else {
      alreadyGuessed.push(e.key);
      guesses--;
    }

    // This new variable adds spaces between the letters in the alreadyGuessed array
    var joinedLetters = alreadyGuessed.join(", ");
    guessedLetters.textContent = joinedLetters;
  }
  guessCount.textContent = guesses;
}

document.onkeyup = gameStart;
initializeScores();

function initializeScores() {
  wins = 0;
  guesses = 12;
  winText.textContent = wins;
  guessCount.textContent = guesses;
}

//The following lines set a button to play my song when the picture is clicked
//The lines below were retrieved from stackoverflow...**THIS IS NOT ORIGINAL WORK**

var song = document.getElementById("audio");
var playingSong = false;

function playANDpause() {
  if (playingSong) {
    song.pause();
  } else {
    song.play();
  }
}
song.onplaying = function() {
  playingSong = true;
};
song.onpause = function() {
  playingSong = false;
};
