//Global Variables
//These variables will be referenced throughout the javascript file, so I'm adding them here for easy reference
var winText = document.getElementById("winCount");
var chosenBandText = document.getElementById("bandName");
var guessCount = document.getElementById("guessesRemaining");
var guessedLetters = document.getElementById("guessedLetters");
var resetButton = document.getElementById("reset-button");
var bandImage = document.getElementById("band-img");
var bandMusic = document.getElementById("audio");
var winMessage = document.getElementById("win-message");
var loseMessage = document.getElementById("lose-message");
var wins = 0;
var totalGuesses = 10;
var band;
var picture;
var audio;

//This object is called "bands" and it contains my 4 artists and their corresponding images & audio file
//One of these artists will be randomly selected by my chooseBand function defined next
var bands = [
  {
    bandName: "eagles",
    bandPicture: "assets/images/hotel-california.png",
    bandAudio: "assets/music/hotel-california.m4a"
  },
  {
    bandName: "aerosmith",
    bandPicture: "assets/images/aerosmith.png",
    bandAudio: "assets/music/dream-on.m4a"
  },
  {
    bandName: "led zeppelin",
    bandPicture: "assets/images/led-zeppelin.jpg",
    bandAudio: "assets/music/stairway-to-heaven.m4a"
  },
  {
    bandName: "don mclean",
    bandPicture: "assets/images/don-mclean.png",
    bandAudio: "assets/music/american-pie.m4a"
  }
];

//This function is called "chooseBand"
//It uses a Math function to randomly choose one of my 4 artists defined above
//It also an encryption function (defined next) that hides the letters of the chosen artist name
function chooseBand() {
  var choice = bands[Math.floor(Math.random() * bands.length)];
  band = choice.bandName;
  picture = choice.bandPicture;
  audio = choice.bandAudio;
  encrypt(band);
  bandImage.src = picture;
  bandMusic.src = audio;
}

//This function is called "encryptedArray"
//Once an artist is chosen at random, this function runs and pushes a dash ("_") in place of each letter from the band name
var encryptedArray = [];
function encrypt(artist) {
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

//This function is called "decrypt"
//It runs every time a user clicks an alpha button on the keyboard
//If the clicked letter matches one of the encrypted letters, it removes the dash (from the "encrypt" function above) and replaces it with the real letter
//If the user guesses all the encrypted letters correctly, it updates the "wins" by 1 and displays the "winMessage" defined on line 10
function decrypt(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    if (band.toLowerCase().indexOf(e.key) !== -1) {
      for (var i = 0; i < band.length; i++) {
        if (band[i] === e.key && guesses) {
          encryptedArray[i] = e.key;
          encrypt(e);
          while (!encryptedArray.includes("_") && wins === 0) {
            wins++;
            winText.textContent = wins;
            winMessage.style.display = "flex";
            loseMessage.style.display = "none";
          }
        }
      }
    }
  }
}

//This function is called "alreadyGuessed"
//It runs every time a user clicks an alpha button on the keyboard
//If the user gusses clicks the same alpha letter more than once, this functions ignores any click after the first
//Every time a user clicks a new letter that hasn't been clicked before, it docks the user 1 guess until it hits zero
//If the remaining guesses hit 0, it displays the "loseMessage" defined on line 11
var alreadyGuessed = [];
function gameStart(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90 && guesses > 0) {
    //key codes 65 to 90 represent the alpha keys on a keyboard
    if (alreadyGuessed.includes(e.key)) {
      return;
    } else {
      alreadyGuessed.push(e.key);
      guesses--;
      while (encryptedArray.includes("_") && guesses === 0) {
        loseMessage.style.display = "flex";
        winMessage.style.display = "none";
        break;
      }
    }
    var joinedLetters = alreadyGuessed.join(" ");
    guessedLetters.textContent = joinedLetters;
  }
  guessCount.textContent = guesses;
}

//This function sets the initial number of guesses the user has to 10
//It also links the html "winText" and "guessCount" elements to their corresponding global variables defined above
function initializeScores() {
  guesses = 10;
  winText.textContent = wins;
  guessCount.textContent = guesses;
}

//This function is called "playANDpause"
//It runs every time the user clicks on the "Play / Pause" button under the artist image
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

//These functions were defined earlier
//They are set to run either automatically or upon a key being pressed
chooseBand();
initializeScores();
document.onkeydown = decrypt;
document.onkeyup = gameStart;

//There is one piece of the homework that I was unable to complete
//I spent several hours trying to figure out how to reset the game after a player wins/loses
//I wasn't able to reset the game successfully while preserving the wins total
//Below is some pseudocode that I am providing in lieu of the code itself
/*
 * I'll name this function "gameReset"
 * It doesn't take any arguments
 * It should (theoretically) run every time a use wins or loses a round
 * The function would (theoretically) be called in the "gameStart" and "decrypt" functions defined above
 *
 *
 * function gameReset(){
 *   for (var i = 0; i < encryptedArray.length; i++){
 *     if (encryptedArray[i] !== "_"){
 *       //This section would run if the encryptedArray has been emptied of dashes (i.e. the player guessed the band correctly)
 *       chosenBandTest = [];
 *       alreadyGuessed = [];
 *       guesses = 10;
 *       }
 *
 *        else if (guesses === 0 && encryptedArray[i] === "_"){
 *         //This section would run if the user ran out of guesses before guessing the band correctly
 *         chosenBandTest = [];
 *         alreadyGuessed = [];
 *         guesses = 10;
 *         wins = 0;
 *         }
 *       }
 *     }
 *
 */
