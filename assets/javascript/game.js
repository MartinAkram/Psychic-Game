/*
 * Global HTML variables
 */
var rpsJumbotron = document.getElementById("rps-jumbotron");
var rpsCardGroup = document.getElementById("rps-card-group");
var winText = document.getElementById("winCount");
var lossText = document.getElementById("lossCount");
var tieText = document.getElementById("tieCount");
var rpsResetButton = document.getElementById("reset-button");
var userImg = document.getElementById("user-img");
var computerImg = document.getElementById("computer-img");

/*
 * Other Global variables
 */
var wins = 0;
var losses = 0;
var ties = 0;

/*
 * Check if the user presses either the 'r', 'p', or 's' key
 * If they do, log the key and hide the jumbotron and show the game board
 * Call the computerPicker function and store the value it returns in the computerGuess variable and log it to the console
 * Call the updatePicture function
 */
function gameStart(e){
    if(e.key === 'r' || e.key === 'p' || e.key === 's'){
        rpsJumbotron.style.display = "none";
        rpsCardGroup.style.display = "flex";
        var computerGuess = computerPicker();
        var computerPicture = updatePicture(computerGuess);
        computerImg.src = computerPicture;
        userImg.src = updatePicture(e.key);
        updateScore(computerGuess, e.key);
    }
    /*
     * If they press the 'q' key, show the jumbotron again and log the key in a warning
     * Also hide the game board
     * Also reset the scoreboard
     */
    else if (e.key === 'q'){
        rpsJumbotron.style.display = "block";
        rpsCardGroup.style.display = "none";
        initializeScores();
    }
}

/*
 * Function that sets the win, loss, and tie values to zero
 */
function initializeScores(){
    wins = 0;
    losses = 0;
    ties = 0;
    displayScores();
}

/*
 * Function that will update the HTML values of the scores to the values in the js file
 */
function displayScores(){
    winText.textContent = wins;
    lossText.textContent = losses;
    tieText.textContent = ties;
}

/*
 * Recieve a character from either the user or the computer
 * Check if the character is either an 'r', 'p', or 's'
 * Return the approperiate image source
 */
function updatePicture(char){
    if (char === 'r'){
        return 'assets/images/rock.png';}
    else if (char === 'p'){
        return 'assets/images/paper.png';}
    else if (char === 's'){
        return 'assets/images/scissors.png';}
}

/*
 * This function will update the scores depending on the choices made
 * Will receive 2 argumens, 1st is computer guess, 2nd is user guess
 * We will compare the values and if the user wins, increase wins
 * If the user guess loses to the computer, increase losses
 * If there's a tie, increase the ties
 */
function updateScore(comp, user){
    if ((user === 'r' && comp === 's') ||
        (user === 'p' && comp === 'r') ||
        (user === 's' && comp === 'p')){
            wins++;
        }
    else if (user === comp){
        ties++;
    }
    else {
        losses++;
    }
    displayScores();
}

/*
 * This function will pick a guess for the computer from the available options
 * Options that it can pick from will be set as 'r', 'p' or 's'
 * We will call Math.random() to pick a number for us between 0 and 1
 * It is INCLUSIVE of 0 but NOT at 1
 * Once we have the number, we'll call Math.floor() that will give us a whole number
 * This number will be the largest integer less than or equal to a given number
 */
function computerPicker(){
    var computerOptions = ['r', 'p', 's'];
    var computerChoice = computerOptions[Math.floor(Math.random()*3)];
    return computerChoice;
}

/* 
 * The gameStart function will be called every time a user presses a key.
 */ 
document.onkeyup = gameStart;

/*
 * Add an event listener to our reset button when the user clicks it
 */
rpsResetButton.addEventListener("click", initializeScores);

/*
 * Call this function as the file loads to initialize the scores
 */
initializeScores();
computerPicker();

