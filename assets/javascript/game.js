//Global Variables
var winText = document.getElementById("winCount");
var chosenBandText = document.getElementById("bandName");
var guessCount = document.getElementById("guessesRemaining");
var guessedLetters = document.getElementById("guessedLetters");
var resetButton = document.getElementById("reset-button");
var bandImage = document.getElementById("band-img");
var bandMusic = document.getElementById("audio");
var wins = 0;
var totalGuesses = 10;
var band;
var picture;
var audio;

//This variable will store the letters that the user clicks
var alreadyGuessed = [];
var encryptedArray = [];

var bands = [
  {
    bandName: "eagles",
    bandPicture: "assets/images/hotel-california.png",
    bandAudio: "assets/music/hotel-california.m4a"
  }
  // {
  //   bandName: "aerosmith",
  //   bandPicture: "assets/images/aerosmith.png",
  //   bandAudio: "assets/music/dream-on.m4a"
  // },
  // {
  //   bandName: "led zeppelin",
  //   bandPicture: "assets/images/led-zeppelin.jpg",
  //   bandAudio: "assets/music/stairway-to-heaven.m4a"
  // },
  // {
  //   bandName: "don mclean",
  //   bandPicture: "assets/images/don-mclean.png",
  //   bandAudio: "assets/music/american-pie.m4a"
  // }
];

//This function, gameStart, will run once an alphanumeric key is pressed
//It will store the letters in an the empty array called "alreadyGuessed"

function chooseBand() {
  var choice = bands[Math.floor(Math.random() * bands.length)];
  band = choice.bandName;
  picture = choice.bandPicture;
  audio = choice.bandAudio;
  displayEncryptedArray(band);
  bandImage.src = picture;
  bandMusic.src = audio;
}

function displayEncryptedArray(artist) {
  for (var i = 0; i < artist.length; i++) {
    if (artist[i] !== " ") {
      encryptedArray.push("_");
    } else {
      encryptedArray.push("-");
    }
  }
  encryptedString = encryptedArray.join(" ");
  chosenBandText.textContent = encryptedString;
}

function decrypt(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (band.toLowerCase().indexOf(e.key) !== -1) {
      for (var i = 0; i < band.length; i++) {
        if (band[i] === e.key) {
          encryptedArray[i] = e.key;
          displayEncryptedArray(e);
          if (!encryptedArray.includes("_")) {
            wins++;
            winText.textContent = wins;
            if (winText !== "0") {
              console.log("hey");
              return;
            }
          }
        }
      }
    }
  }
}

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
    var joinedLetters = alreadyGuessed.join(" ");
    guessedLetters.textContent = joinedLetters;
  } else {
    return;
  }
  guessCount.textContent = guesses;
}

function initializeScores() {
  guesses = 10;
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

//Run these immediately on start of page
chooseBand();
initializeScores();
document.onkeydown = decrypt;
document.onkeyup = gameStart;
