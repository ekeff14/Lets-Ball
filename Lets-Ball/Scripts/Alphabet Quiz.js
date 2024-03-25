


const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let shuffledAlphabet = shuffleArray([...alphabet]);
                let currentIndex = 0;
                let timer;
                let score = 0;
                let isGameActive = false; // Track if the game is active

                document.getElementById('playButton').addEventListener('click', startGame);

                function shuffleArray(array) {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                }

                function displayNextLetter() {
                    if(currentIndex < shuffledAlphabet.length) {
                        const quizContainer = document.getElementById('quiz-container');
                        const randomCase = Math.random() < 0.5 ? 'uppercase' : 'lowercase';
                        const letter = randomCase === 'uppercase' ? shuffledAlphabet[currentIndex] : shuffledAlphabet[currentIndex].toLowerCase();
                        quizContainer.textContent = letter;
                        startTimer(); // Start or restart the timer for the next letter
                    } else {
                        endGame(); // End the game if we've gone through all letters
                    }
                }

                function checkAnswer() {
                    const userInput = document.getElementById('user-input').value.toUpperCase();
                    // Increment score if correct, but do not increment if it's the last letter or after the game has ended
                    if((userInput === shuffledAlphabet[currentIndex] || userInput === shuffledAlphabet[currentIndex].toLowerCase()) && currentIndex < shuffledAlphabet.length && isGameActive) {
                        score++;
                    }
                    // Move to the next letter only if the game is still active
                    if(isGameActive) {
                        currentIndex++;
                        updateGameStatus(); // Update the game status regardless of whether the answer was correct or not
                    }
                }

                function startGame() {

                    
                    currentIndex = 0;
                    score = 0;
                    shuffledAlphabet = shuffleArray([...alphabet]);
                    isGameActive = true; // Mark the game as active
                    document.getElementById('user-input').disabled = false;
                    document.getElementById('playButton').style.display = 'none';
                    document.getElementById('message-container').textContent = ''; // Clear any previous end game messages
                    updateGameStatus(); // Update the status to start the game
                }

                function endGame() {
                    clearInterval(timer); // Stop the timer as the game has ended
                    isGameActive = false; // Mark the game as not active
                    document.getElementById('timer-container').textContent = '';
                    document.getElementById('message-container').textContent = `Yay! your score is ${score} out of ${shuffledAlphabet.length}.`;
                    document.getElementById('playButton').style.display = 'block'; // Show the start button again for a new game
                    document.getElementById('user-input').disabled = true; // Disable the input as the game has ended
                }

                function updateGameStatus() {
                    document.getElementById('score-container').textContent = `Score: ${score}`;
                    document.getElementById('user-input').value = ''; // Clear the input field for the next letter
                    displayNextLetter();
                    if(isGameActive) {
                        startTimer();
                    }
                }

                document.getElementById('user-input').addEventListener('input', checkAnswer);

                function startTimer() {
                    clearInterval(timer); // Ensure there's only one timer running
                    let seconds = 10;
                    timer = setInterval(function() {
                        if(!isGameActive) {
                            clearInterval(timer); // Ensure the timer stops if the game is not active
                            return;
                        }
                        document.getElementById('timer-container').textContent = `Time left: ${seconds}s`;
                        seconds--;
                        if(seconds <= 0) {
                            clearInterval(timer);
                            document.getElementById('timer-container').textContent = '';
                            checkAnswer(); // Move to the next letter if time runs out
                        }
                    }, 1000);
                }
