        //Variables storing the state of the game
        let secretNumber;//number to guess
        let attemptsLeft;
        let timeLeft;
        let timer;

        //variables for stats
        let NEtimercheck = 0;
        let NEnumberOfGuesses = 0;
        let NEfirstAttemptWin = false;

        //Initializes the game with a random number and resets game metrics in new game
        function startGame() {
            secretNumber = Math.floor(Math.random() * 51) - 25;
            attemptsLeft = 30;
            timeLeft = 480;
            NEtimercheck = 0;
            NEnumberOfGuesses = 0;
            NEfirstAttemptWin = false;
            updateUIForGameStart();//Updates the UI when a new game starts
            startTimer();//Starts the game timer as well
        }

        document.getElementById("startButton").addEventListener("click", startGame);//The start button Event listener

        //Gives hint about the secret number 
        function provideHint() {
            const hintMessage = secretNumber % 2 === 0 ? "The number is even." : "The number is odd.";
            document.getElementById("message").textContent = hintMessage;
        }

        //Starts the timer and handles end game message when time runs out
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

        //Handles the logic when a user submits a guess
        function handleGuess(userGuess){                
            const isCorrect = checkGuess(userGuess);
            if (isCorrect){             
            }
    }

        //Crosschecks the user's guess against the secret number and shows feedback
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

        //Ends the game, logs the metrics and disables user input
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

        //Logs events to the server
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


        //Fetch game ID from the server for event logging
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
        

        //Updates UI to show the new game state
        function updateUIForGameStart() {
            //Resets the input fields and buttons for new game
            document.getElementById("user-guess").disabled = false;
            document.getElementById("user-guess").value = ""; // Clear the input field
            document.getElementById("guessButton").disabled = false;
            document.getElementById("hintButton").disabled = false;
            document.getElementById("startButton").style.display = "none"; // Hide the start button
            document.getElementById("message").textContent = ""; // Clear any previous messages
            document.getElementById("attempts-left").textContent = attemptsLeft;
            document.getElementById("time-left").textContent = timeLeft;
        }
