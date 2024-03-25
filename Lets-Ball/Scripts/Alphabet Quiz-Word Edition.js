// The arrays of words
import { fetchCountdownEndTimestampAndStartTimer } from './startCounter.js';

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
    isGameActive = true;
    document.getElementById('user-input').disabled = false;
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('message-container').textContent = '';
    updateGameStatus();
}
window.addEventListener('beforeunload', function(event) {
    navigator.sendBeacon('/update-time.php', '');
});

function endGame() {
    clearInterval(timer);
    isGameActive = false;
    document.getElementById('timer-container').textContent = '';
    document.getElementById('message-container').textContent = `Yay! Your score is ${score} out of ${shuffledWords.length}.`;
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
    let seconds = 10;
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
