let secretNumber;
        let attemptsLeft = 5;
        let timeLeft = 30;
        let timer;

        document.getElementById("startButton").addEventListener("click", startGame);

        function startGame() {
            secretNumber = Math.floor(Math.random() * 50) + 1;
            attemptsLeft = 5;
            timeLeft = 30;
            document.getElementById("user-guess").disabled = false;
            document.getElementById("user-guess").value = ""; // Clear previous guess
            document.getElementById("guessButton").disabled = false;
            document.getElementById("hintButton").disabled = false;
            document.getElementById("startButton").style.display = "none";
            document.getElementById("instructions").style.display = "block";
            document.getElementById("attempts-left").textContent = attemptsLeft;
            document.getElementById("time-left").textContent = timeLeft;
            document.getElementById("message").textContent = ""; // Clear previous messages
            startTimer();
        }

        function provideHint() {
            const hintMessage = secretNumber % 2 === 0 ? "The number is even." : "The number is odd.";
            document.getElementById("message").textContent = hintMessage;
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(function() {
                timeLeft--;
                document.getElementById("time-left").textContent = timeLeft;
                if (timeLeft <= 0 || attemptsLeft <= 0) {
                    let endMessage = timeLeft <= 0 ? "Time's up! " : "Out of attempts! ";
                    endGame(endMessage + `The correct number was ${secretNumber}. Better luck next time!`);
                }
            }, 1000);
        }

        function checkGuess() {
            const userGuess = parseInt(document.getElementById("user-guess").value);
            if (isNaN(userGuess) || userGuess < 1 || userGuess > 50) {
                document.getElementById("message").textContent = "Please enter a valid number between 1 and 50.";
                return;
            }

            attemptsLeft--;
            document.getElementById("attempts-left").textContent = attemptsLeft;

            if (userGuess === secretNumber) {
                endGame(`Congratulations! You guessed the correct number in ${5 - attemptsLeft} attempts!`);
            } else {
                document.getElementById("message").textContent = userGuess < secretNumber ? "Too low! Try again." : "Too high! Try again.";
                if (attemptsLeft <= 0) {
                    endGame(`Out of attempts! The correct number was ${secretNumber}. Better luck next time!`);
                }
            }
        }

        function endGame(message) {
            clearInterval(timer);
            document.getElementById("user-guess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            document.getElementById("hintButton").disabled = true;
            document.getElementById("message").textContent = message;
            document.getElementById("startButton").style.display = ""; // Show play button for a new game
        }