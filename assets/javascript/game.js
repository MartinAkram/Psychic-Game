/*
 * Global HTML variables
 */
var winText = document.getElementById("winCount");
var bandName = document.getElementById("currentWord");
var guessCount = document.getElementById("bandName");
var alreadyGuessed = document.getElementById("guessedLetters");
var resetButton = document.getElementById("reset-button");
var wins = 0;
var totalGuesses = 10;






/*
 * Set the initial available guess count to 10 guesses
 */
guessCount.textContent = guesses;

/*
 * Define an array for the English alphabet
 */
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
                'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

/*
 * Define the variable containing the solution (band name)
 */
var bandName = "Eagles";


/*
 * Check if the user presses any letter keys
 * If they do, log the key under the alreadyGuessed variable declared on line 7
 */
function gameStart(e){

    userGuess=e.key;

    if(e.key === 'a' || e.key === 'b' || e.key === 'c' || e.key === 'd' || e.key === 'e' || e.key === 'f'
    || e.key === 'g' || e.key === 'h' || e.key === 'i' || e.key === 'j' || e.key === 'k' || e.key === 'l' 
    || e.key === 'm' || e.key === 'n' || e.key === 'o' || e.key === 'p' || e.key === 'q' || e.key === 'r'
    || e.key === 's' || e.key === 't' || e.key === 'u' || e.key === 'v' || e.key === 'w' || e.key === 'x' 
    || e.key === 'y' || e.key === 'z'){

        for (var i = 0; i < 20; i++){
            alreadyGuessed.textContent = userGuess;
            console.log(alreadyGuessed);
        }   



    }
    guessCount.textContent = guesses;
    initializeScores();
}

document.onkeyup = gameStart;


function initializeScores(){
    wins = 0;
    guesses = 10;
    displayScores();
}

function displayScores(){
    winText.textContent = wins;
    guessCount.textContent = guesses;
}