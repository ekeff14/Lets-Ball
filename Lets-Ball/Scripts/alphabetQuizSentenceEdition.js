//Arrays of sentences to ask 
const sentencesArray1 = [
    "The cat sat on the mat.",
    "I have a pet fish.",
    "We like to play."
];
const sentencesArray2 = [
    "Dogs are very loyal.",
    "The sun is so bright.",
    "I can jump very high."
];
const sentencesArray3 = [
    "I see a big tree.",
    "Birds can fly.",
    "I love my family."
];
const sentencesArray4 = [
    "My friend is funny.",
    "School is fun.",
    "I like to swim."
];
const sentencesArray5 = [
    "Stars twinkle at night.",
    "The moon is very round.",
    "Apples are delicious."
];
//Can add more sentences

//Initializing variables 
let shuffledSentences;
let currentIndex = 0;
let timer;
let score = 0;
let wrongAnswer = 0;
let isGameActive = false;

//Event listeners for user interactions
document.getElementById('playButton').addEventListener('click', startGame);
document.getElementById('check-answer').addEventListener('click', checkAnswer); // Event listener for the new button
document.getElementById('user-input').addEventListener('keydown', function(event) {
    // Allows submission on pressing Enter.
    if (event.key === "Enter" && !this.disabled) {
        event.preventDefault(); // Prevent line break in textarea
        checkAnswer();
    }
});

//Combines arrays, shuffle them, then return a selection for the game
function getRandomSentences() {
    const allSentences = [sentencesArray1, sentencesArray2, sentencesArray3, sentencesArray4, sentencesArray5];
    // Shuffle the array of arrays and then concatenate two of them
    const shuffledArrays = shuffleArray(allSentences).slice(0, 2);
    return [].concat.apply([], shuffledArrays);
}

//Shuffles the elements of the shuffled array in getRandomSentences() and return it
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Display the next sentence
function displayNextSentence() {
    if(currentIndex < shuffledSentences.length) {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.textContent = shuffledSentences[currentIndex];
        startTimer();
    } else {
        endGame();
    }
}

//Crosschecks user's answer
function checkAnswer() {
    clearInterval(timer);
    const userInput = document.getElementById('user-input').value.trim();
    const currentSentence = shuffledSentences[currentIndex];
    if(userInput === currentSentence && isGameActive) {
        score++;
        updateScore();
    }else {
        wrongAnswer++
    }
    currentIndex++;
    if(currentIndex >= shuffledSentences.length) {
        endGame();
    } else {
        updateGameStatus();
    }
}

//starts the game on button click
function startGame() {
    //resets variables and game state
    shuffledSentences = getRandomSentences(); // Get a new set of sentences
    currentIndex = 0;
    wrongAnswer = 0;
    score = 0;
    isGameActive = true;
    document.getElementById('user-input').disabled = false;
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('message-container').textContent = ''; // Clear the final score message
    updateScore(); // Update the score display to 0
    updateGameStatus();
}

//Ends the game
 async function endGame() {
    clearInterval(timer);
    isGameActive = false;
    const gameId = await fetchGameId('AlphabetQuiz');
    logEvent(gameId, "Correct Answer", score);
    logEvent(gameId, "Wrong Answer", wrongAnswer);
    document.getElementById('timer-container').textContent = '';
    document.getElementById('message-container').textContent = `Yay! check your score in the statistics page below.`;
    document.getElementById('playButton').style.display = 'block';
    document.getElementById('user-input').disabled = true;
}

//Logs values for stats
function logEvent(gameId, eventType, eventValue) {
    fetch('../Pages/log-event.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            game_id: gameId,
            event_type: eventType,
            event_value: eventValue,
        }),
    })
    .then(response => response.text()) // First, get the response as text
.then(text => {
console.log(text); // Log the raw text response
return JSON.parse(text); // Then attempt to parse it as JSON
})
.then(data => console.log('Event logged successfully', data))
.catch((error) => console.error('Error logging event:', error));
}

//Gets the gameID 
async function fetchGameId(gameName) {
    try {
        const response = await fetch(`../Pages/getData.php?Gname=${encodeURIComponent(gameName)}`);
        const data = await response.json();
        if(data.GameID) {
            return data.GameID;
            console.log("Game ID:", data.GameID);            
        } else {
            console.log("Game not found or error fetching Game ID.");
        }
    } catch (error) {
        console.error("Error fetching Game ID:", error);
    }
}

//Updates the UI with the current game status
function updateGameStatus() {
    document.getElementById('user-input').value = ''; // Clear the textarea for the next sentence
    displayNextSentence();
}

//Updates UI with the current score
function updateScore() {
    document.getElementById('score-container').textContent = `Score: ${score}`;
}

//Starts/reset the timer for the current sentence
function startTimer() {
    clearInterval(timer);
    let seconds = 60;
    timer = setInterval(function() {
        if(!isGameActive) {
            clearInterval(timer);
            return;
        }
        document.getElementById('timer-container').textContent = `Time left: ${seconds}s`;
        seconds--;
        if(seconds <= 0) {
            clearInterval(timer);
            document.getElementById('timer-container').textContent = '';
            checkAnswer(); // Automatically crosscheck and move to the next sentence if time runs out
        }
    }, 1000);
}
