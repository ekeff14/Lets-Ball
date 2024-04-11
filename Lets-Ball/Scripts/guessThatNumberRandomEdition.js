        //Initialize game variables to store the state of the game
        let secretNumber;
        let minRange, maxRange;
        let attemptsLeft = 30;
        let timeLeft = 480;
        let timer;
        //variables for stats
        let NEtimercheck = 0;
        let NEnumberOfGuesses = 0;
        let NEfirstAttemptWin = false;

        document.getElementById("startButton").addEventListener("click", startGame);//Set up the start button to start the game on click

        //Generates the minimum and maximum values for theSS guessing range
        function generateRandomRange() {
            minRange = Math.floor(Math.random() * 91); // 0 to 90
            maxRange = minRange + 10 + Math.floor(Math.random() * (90 - minRange)); // Ensure at least 10 difference
            maxRange = Math.min(maxRange, 100); // Ensure maxRange does not exceed 100
            if (maxRange === minRange) maxRange += 10; // Ensure numbers are not the same
            document.getElementById("rangeDisplay").textContent = `Guess a number between ${minRange} and ${maxRange}:`;
        }

        //Resets game state, generates a new secret number within the range, and initializes the UI for a new game
        function startGame() {
            generateRandomRange();
            secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
            attemptsLeft = 30;
            timeLeft = 480;
            NEtimercheck = 0;
            NEnumberOfGuesses = 0;
            NEfirstAttemptWin = false;
            document.getElementById("user-guess").disabled = false;
            document.getElementById("user-guess").value = "";
            document.getElementById("guessButton").disabled = false;
            document.getElementById("hintButton").disabled = false;
            document.getElementById("startButton").style.display = "none";
            document.getElementById("instructions").style.display = "block";
            document.getElementById("attempts-left").textContent = attemptsLeft;
            document.getElementById("time-left").textContent = timeLeft;
            document.getElementById("message").textContent = "";
            startTimer();
        }

        //Hints if the secret number is even or odd
        function provideHint() {
            const hintMessage = secretNumber % 2 === 0 ? "The number is even." : "The number is odd.";
            document.getElementById("message").textContent = hintMessage;
        }

        //Timer that counts down and ends the game if time runs out or attempts are used up
        function startTimer() {
            clearInterval(timer);
            timer = setInterval(function() {
                NEtimercheck++;
                timeLeft--;
                document.getElementById("time-left").textContent = timeLeft;
                if (timeLeft <= 0 || attemptsLeft <= 0) {
                    endGame(`The correct number was ${secretNumber}. Better luck next time!`);
                }
            }, 1000);
        }

        //Processes the user's guess
        function handleGuess(userGuess){                
            const isCorrect = checkGuess(userGuess);
            if (isCorrect){
             
            }
    }

        //Validates the guess, updates the game states, provides feedback, and ends the game if guess is correct
        function checkGuess() {
            const userGuess = parseInt(document.getElementById("user-guess").value);
            if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
                document.getElementById("message").textContent = `Please enter a valid number between ${minRange} and ${maxRange}.`;
                return;
            }
            NEnumberOfGuesses++;
            attemptsLeft--;
            document.getElementById("attempts-left").textContent = attemptsLeft;

            if (userGuess === secretNumber) {
                endGame(`Congratulations! You guessed the correct number in ${30 - attemptsLeft} attempts!`);
            } else {
                document.getElementById("message").textContent = userGuess < secretNumber ? "Too low! Try again." : "Too high! Try again.";
                if (attemptsLeft <= 0) {
                    endGame(`Out of attempts! The correct number was ${secretNumber}. Better luck next time!`);
                }
            }
        }    

        //Shows game over message, logs game events, and resets UI for a new game
        async function endGame(message) {
            if(NEnumberOfGuesses === 1){
                NEfirstAttemptWin = true;
            }

            const gameId = await fetchGameId('GuessNumber');
            logEvent(gameId, "First Attempt Win", NEfirstAttemptWin);
            logEvent(gameId, "Number of Guesses", NEnumberOfGuesses);
            logEvent(gameId, "TimeSpent", NEtimercheck);
            
            
            console.log(`Time Spent: ${NEtimercheck} seconds, Number of Guesses: ${NEnumberOfGuesses}, First Attempt Win: ${NEfirstAttemptWin}`);

            clearInterval(timer);
            document.getElementById("user-guess").disabled = true;
            document.getElementById("guessButton").disabled = true;
            document.getElementById("hintButton").disabled = true;
            document.getElementById("message").textContent = message;
            document.getElementById("startButton").style.display = ""; // Show play button for a new game
        }        

         //Sends the game event data to a server
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

        //Gets a unique identifier for the game
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