let secretNumber;
        let attemptsLeft;
        let timeLeft;
        let timer;
        let NEtimercheck = 0;
        let NEnumberOfGuesses = 0;
        let NEfirstAttemptWin = false;

        // Function to start or restart the game
        function startGame() {
            secretNumber = Math.floor(Math.random() * 51) - 25;
            attemptsLeft = 30;
            timeLeft = 480;
            NEtimercheck = 0;
            NEnumberOfGuesses = 0;
            NEfirstAttemptWin = false;
            updateUIForGameStart();
            startTimer();
        }

        document.getElementById("startButton").addEventListener("click", startGame);

        function provideHint() {
            const hintMessage = secretNumber % 2 === 0 ? "The number is even." : "The number is odd.";
            document.getElementById("message").textContent = hintMessage;
        }

        function startTimer() {
            clearInterval(timer); // Clear any previous timer
            timer = setInterval(() => {
                NEtimercheck++;
                timeLeft--;
                document.getElementById("time-left").textContent = timeLeft;
                if (timeLeft <= 0 || attemptsLeft <= 0) {
                    endGame(`The correct number was ${secretNumber}. Better luck next time!`);
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
            if (isNaN(userGuess) || userGuess < -25 || userGuess > 25) {
                document.getElementById("message").textContent = "Please enter a valid number between -25 and 25.";
                return;
            }

            NEnumberOfGuesses++;
            attemptsLeft--;
            document.getElementById("attempts-left").textContent = attemptsLeft;

            if (userGuess === secretNumber) {
                endGame(`Congratulations! You guessed the correct number in ${30 - attemptsLeft} attempts!`);
            } else {
                document.getElementById("message").textContent = userGuess < secretNumber ? "Too low! Try again." : "Too high! Try again.";
            }

            if (attemptsLeft <= 0) {
                endGame(`Out of attempts! The correct number was ${secretNumber}.`);
            }
        }

        async function endGame(message) {
            if(NEnumberOfGuesses === 1){
                NEfirstAttemptWin = true;
            }

    const gameId = await fetchGameId('GuessNumberN');
    logEvent(gameId, "First Attempt Win", NEfirstAttemptWin);
    logEvent(gameId, "Number of Guesses", NEnumberOfGuesses);
    logEvent(gameId, "TimeSpent", NEtimercheck);
    
    
    console.log(`Time Spent: ${NEtimercheck} seconds, Number of Guesses: ${NEnumberOfGuesses}, First Attempt Win: ${NEfirstAttemptWin}`);

            clearInterval(timer);
            document.getElementById("user-guess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            document.getElementById("hintButton").disabled = true;
            document.getElementById("message").textContent = message;
            document.getElementById("startButton").style.display = ""; // Show the start button to allow for a new game
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
        

        function updateUIForGameStart() {
            document.getElementById("user-guess").disabled = false;
            document.getElementById("user-guess").value = ""; // Clear the input field
            document.getElementById("guessButton").disabled = false;
            document.getElementById("hintButton").disabled = false;
            document.getElementById("startButton").style.display = "none"; // Hide the start button
            document.getElementById("message").textContent = ""; // Clear any previous messages
            document.getElementById("attempts-left").textContent = attemptsLeft;
            document.getElementById("time-left").textContent = timeLeft;
        }
