// The arrays of words
const wordsArray1 = ["cat", "dog", "sun", "ball", "hat"];
const wordsArray2 = ["tree", "bird", "cloud", "star", "moon"];
const wordsArray3 = ["apple", "orange", "grape", "melon", "peach"];
const wordsArray4 = ["blue", "red", "green", "yellow", "pink"];
const wordsArray5 = ["jump", "play", "run", "walk", "climb"];

let shuffledWords;
let currentIndex = 0;
let timer;
let score = 0;
let isGameActive = false;
let wrongAnswer = 0;

document.getElementById('playButton').addEventListener('click', startGame);
document.getElementById('submit-answer').addEventListener('click', checkAnswer); // Event listener for the submit button
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

function getRandomWordSets() {
    const allWordSets = [wordsArray1, wordsArray2, wordsArray3, wordsArray4, wordsArray5];
    const shuffled = shuffleArray(allWordSets);
    return shuffled[0].concat(shuffled[1]);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayNextWord() {
    if(currentIndex < shuffledWords.length) {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.textContent = shuffledWords[currentIndex];
        startTimer();
    } else {
        endGame();
    }
}

function checkAnswer() {
    clearInterval(timer);
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    const currentWord = shuffledWords[currentIndex];
    if(userInput === currentWord && isGameActive) {
        score++;
        document.getElementById('score-container').textContent = `Score: ${score}`;
    }
    else {
    wrongAnswer++
    }
    currentIndex++;
    if(currentIndex >= shuffledWords.length) {
        endGame();
    } else {
        updateGameStatus();
    }
}

function startGame() {
    shuffledWords = getRandomWordSets();
    currentIndex = 0;
    score = 0;
    wrongAnswer = 0;
    isGameActive = true;
    document.getElementById('user-input').disabled = false;
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('message-container').textContent = '';
    updateGameStatus();
}

async function endGame() {
    clearInterval(timer);
    isGameActive = false;
    const gameId = await fetchGameId('AlphabetQuizW');
    logEvent(gameId, "Correct Answer", score);
    logEvent(gameId, "Wrong Answer", wrongAnswer);
    document.getElementById('timer-container').textContent = '';
    document.getElementById('message-container').textContent = `Yay! check your score in the statistics page below.`;
    document.getElementById('playButton').style.display = 'block';
    document.getElementById('user-input').disabled = true;
}

function updateGameStatus() {
    document.getElementById('score-container').textContent = `Score: ${score}`;
    document.getElementById('user-input').value = '';
    displayNextWord();
}

function startTimer() {
    clearInterval(timer);
    let seconds = 30;
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
            checkAnswer();
        }
    }, 1000);
}

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


async function fetchGameId(gameName) {
    try {
        const response = await fetch(`../Pages/getData.php?Gname=${encodeURIComponent(gameName)}`);
        const data = await response.json();
        if(data.GameID) {
            return data.GameID;
            console.log("Game ID:", data.GameID);
            // You can now use the GameID in your JavaScript as needed
        } else {
            console.log("Game not found or error fetching Game ID.");
        }
    } catch (error) {
        console.error("Error fetching Game ID:", error);
    }
}
