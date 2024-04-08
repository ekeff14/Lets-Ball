let secretNumber;
        let attemptsLeft = 25;
        let timeLeft = 300;
        let timercheck = 0;
        let timer;
        let numberOfGuesses = 0;
        let firstAttemptWin = false;

        document.getElementById("startButton").addEventListener("click", startGame);

        function startGame() {
            secretNumber = Math.floor(Math.random() * 50) + 1;
            attemptsLeft = 25;
            timeLeft = 300;
            timercheck = 0;
            numberOfGuesses = 0;
            firstAttemptWin = false;
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
                timercheck++;
                timeLeft--;
                document.getElementById("time-left").textContent = timeLeft;
                if (timeLeft <= 0 || attemptsLeft <= 0) {
                    let endMessage = timeLeft <= 0 ? "Time's up! " : "Out of attempts! ";
                    endGame(endMessage + `The correct number was ${secretNumber}. Better luck next time!`);
                }
            }, 1000);
        }

        function handleGuess(userGuess){
                
                const isCorrect = checkGuess(userGuess);
                if (isCorrect){
                 
                }
        }

        function checkGuess() {
            const userGuess = parseInt(document.getElementById("user-guess").value);
            if (isNaN(userGuess) || userGuess < 1 || userGuess > 50) {
                document.getElementById("message").textContent = "Please enter a valid number between 1 and 50.";
                return;
            }


            numberOfGuesses++;
            attemptsLeft--;
            document.getElementById("attempts-left").textContent = attemptsLeft;           

            if (userGuess === secretNumber) {
                endGame(`Congratulations! You guessed the correct number in ${25 - attemptsLeft} attempts!`);
                //endTime = new Date();
                //return true;
            } else {
                document.getElementById("message").textContent = userGuess < secretNumber ? "Too low! Try again." : "Too high! Try again.";
                if (attemptsLeft <= 0) {
                    endGame(`Out of attempts! The correct number was ${secretNumber}. Better luck next time!`);
                    //endTime = new Date();
                }
            }
        }

        async function endGame(message) {
            if(numberOfGuesses === 1){
                        firstAttemptWin = true;
                    }

            const gameId = await fetchGameId('GuessNumberFE');
            logEvent(gameId, "First Attempt Win", firstAttemptWin);
            logEvent(gameId, "Number of Guesses", numberOfGuesses);
            logEvent(gameId, "TimeSpent", timercheck);    
            
            console.log(`Time Spent: ${timercheck} seconds, Number of Guesses: ${numberOfGuesses}, First Attempt Win: ${firstAttemptWin}`);
    

            clearInterval(timer);
            document.getElementById("user-guess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            document.getElementById("hintButton").disabled = true;
            document.getElementById("message").textContent = message;
            document.getElementById("startButton").style.display = ""; // Show play button for a new game
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
