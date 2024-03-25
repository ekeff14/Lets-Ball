// Five separate arrays for different age groups
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
//add more sentences

let shuffledSentences;
let currentIndex = 0;
let timer;
let score = 0;
let isGameActive = false;

document.getElementById('playButton').addEventListener('click', startGame);
document.getElementById('check-answer').addEventListener('click', checkAnswer); // Event listener for the new button
document.getElementById('user-input').addEventListener('keydown', function(event) {
    if (event.key === "Enter" && !this.disabled) {
        event.preventDefault(); // Prevent line break in textarea
        checkAnswer();
    }
});

function getRandomSentences() {
    const allSentences = [sentencesArray1, sentencesArray2, sentencesArray3, sentencesArray4, sentencesArray5];
    // Shuffle the array of arrays and then concatenate two of them
    const shuffledArrays = shuffleArray(allSentences).slice(0, 2);
    return [].concat.apply([], shuffledArrays);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayNextSentence() {
    if(currentIndex < shuffledSentences.length) {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.textContent = shuffledSentences[currentIndex];
        startTimer();
    } else {
        endGame();
    }
}

function checkAnswer() {
    clearInterval(timer);
    const userInput = document.getElementById('user-input').value.trim();
    const currentSentence = shuffledSentences[currentIndex];
    if(userInput === currentSentence && isGameActive) {
        score++;
        updateScore();
    }
    currentIndex++;
    if(currentIndex >= shuffledSentences.length) {
        endGame();
    } else {
        updateGameStatus();
    }
}

function startGame() {
    shuffledSentences = getRandomSentences(); // Get a new set of sentences
    currentIndex = 0;
    score = 0;
    isGameActive = true;
    document.getElementById('user-input').disabled = false;
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('message-container').textContent = ''; // Clear the final score message
    updateScore(); // Update the score display to 0
    updateGameStatus();
}

function endGame() {
    clearInterval(timer);
    isGameActive = false;
    document.getElementById('timer-container').textContent = '';
    document.getElementById('message-container').textContent = `Yay! Your score is ${score} out of ${shuffledSentences.length}.`;
    document.getElementById('playButton').style.display = 'block';
    document.getElementById('user-input').disabled = true;
}

function updateGameStatus() {
    document.getElementById('user-input').value = ''; // Clear the textarea for the next sentence
    displayNextSentence();
}

function updateScore() {
    document.getElementById('score-container').textContent = `Score: ${score}`;
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
            checkAnswer(); // Automatically move to the next sentence if time runs out
        }
    }, 1000);
}
