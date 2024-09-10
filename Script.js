const WORD_API = "https://random-word-api.herokuapp.com/word";
const shownWord = document.getElementById('random_word');
const playerInput = document.getElementById('player_guess');
const totalGuessText = document.getElementById('guesses');
const correctText = document.getElementById('correct');

let playerScores = null;

/**
 * Sets up local storage for scoring system accross sessions
 */
if (localStorage.getItem("storedScores") == null){
    playerScores = {
        totalGuess: 0,
        correctGuess: 0
    }
    localStorage.setItem("storedScores", JSON.stringify(playerScores));
}
else{
    playerScores = JSON.parse(localStorage.getItem("storedScores"));
    setScoreTexts();
}

playerInput.addEventListener("keypress", function(event) {
    if (event.key == "Enter"){
        event.preventDefault();
        takeGuess();
    }
})

let answer = null;
let scrambledAnswer = null;

/**
 * Saves players score before window gets closed
 */
window.addEventListener("beforeunload", e => {
    localStorage.setItem("storedScores", JSON.stringify(playerScores));
})


/**
 * Fetching a randomized word from https://random-word-api.herokuapp.com/home
 */
function getWord(){
    const response = fetch (WORD_API)
    .then( result => {
        if (!result.ok){
            throw new Error("Error When Fetching Word")
        }
        
        return result.json();})
    .then(word => {
        answer = word[0];
        scrambledAnswer = scrambleWord(word[0]);
        shownWord.innerHTML = scrambledAnswer;
        console.log(answer);
        console.log(scrambledAnswer);
    })
    .catch(error => {window.alert(error)});


}

/**
 * 
 * @param {} word - the string of the word
 * @returns - a scrambled string of the same word
 */
function scrambleWord(word){
    let unscrambled = word;
    let scrambled = "";

    while(unscrambled != ""){
        // Selects a random index from the unscrambled letters
        // Select the letter at that index and add it to scrambled, remove it from unscrambled
        let index = Math.round(Math.random() * ((unscrambled.length) - 1));
        scrambled = scrambled + unscrambled[index];
        unscrambled = unscrambled.slice(0, index) + unscrambled.slice(index + 1, unscrambled.length);
    };

    return scrambled;
}

/**
 * Player takes a guess
 * Updates local storage accordingly
 */
function takeGuess(){
    const playerGuess = playerInput.innerHTML;

    if (playerGuess.toUpperCase() == answer.toUpperCase()){
        window.alert("CORRECT");
        playerScores.correctGuess ++;
        playerScores.totalGuess ++;
        
    }
    else{
        window.alert("GUESS AGAIN!");
        playerScores.totalGuess ++;
        
    }

    setScoreTexts();

}


function setScoreTexts(){
    totalGuessText.innerText = `Number of Guesses: ${playerScores.totalGuess}`;
    correctText.innerText = `Number of Correct Answers: ${playerScores.correctGuess}`; 
}
