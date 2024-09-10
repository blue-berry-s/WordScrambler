const WORD_API = "https://random-word-api.herokuapp.com/word";
const shownWord = document.getElementById('random_word');
const playerInput = document.getElementById('player_guess');

playerInput.addEventListener("keypress", function(event) {
    if (event.key == "Enter"){
        event.preventDefault();
        takeGuess();
    }
})

let answer = null;
let scrambledAnswer = null;


//shownWord.innerText = answer;
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

function scrambleWord(word){
    let unscrambled = word;
    let scrambled = "";

    while(unscrambled != ""){
        let index = Math.round(Math.random() * ((unscrambled.length) - 1));
        scrambled = scrambled + unscrambled[index];
        unscrambled = unscrambled.slice(0, index) + unscrambled.slice(index + 1, unscrambled.length);
    };

    return scrambled;
}

function takeGuess(){
    const playerGuess = playerInput.innerHTML;

    if (playerGuess.toUpperCase() == answer.toUpperCase()){
        window.alert("CORRECT");
    }
    else{
        window.alert("Guess again!");
    }

}


