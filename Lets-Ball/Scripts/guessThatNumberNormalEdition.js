        //The game state variables
        let secretNumber;
        let attemptsLeft = 25;
        let timeLeft = 300;
        let timercheck = 0;
        let timer;
        let numberOfGuesses = 0;
        let firstAttemptWin = false;

        document.getElementById("startButton").addEventListener("click", startGame);//Start button event listener

        //Function to initialize and start a new game
        function startGame() {
            //Randomly generates secret number between 1 and 50 and reset game state variables
            secretNumber = Math.floor(Math.random() * 50) + 1;
            attemptsLeft = 25;
            timeLeft = 300;
            timercheck = 0;
            numberOfGuesses = 0;
            firstAttemptWin = false;
            //Enable input fields and buttons for new game
            document.getElementById("user-guess").disabled = false;
            document.getElementById("user-guess").value = ""; // Clear previous guess
            document.getElementById("guessButton").disabled = false;
            document.getElementById("hintButton").disabled = false;
            //Hides start button and shows instructions and other UI elements
            document.getElementById("startButton").style.display = "none";
            document.getElementById("instructions").style.display = "block";
            document.getElementById("attempts-left").textContent = attemptsLeft;
            document.getElementById("time-left").textContent = timeLeft;
            document.getElementById("message").textContent = ""; // Clear previous messages
            startTimer();//start timer
        }

        //Displays if the secret number is even or odd as a hint
        function provideHint() {
            const hintMessage = secretNumber % 2 === 0 ? "The number is even." : "The number is odd.";
            document.getElementById("message").textContent = hintMessage;
        }

        //A countdown timer that updates the time left and ends the game if time runs out or attempts reach zero    
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

        //Calls the checkGuess function to see if a guess is correct
        function handleGuess(userGuess){                
                const isCorrect = checkGuess(userGuess);
                if (isCorrect){
                 
                }
        }

        //Validates the guess and gives feedback or ends the game if guess is correct or attempts run out
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
            } else {
                document.getElementById("message").textContent = userGuess < secretNumber ? "Too low! Try again." : "Too high! Try again.";
                if (attemptsLeft <= 0) {
                    endGame(`Out of attempts! The correct number was ${secretNumber}. Better luck next time!`);                    
                }
            }
        }

        //Check if the game was won on the first attempt for stats, fetches the game ID for logging,
        //Log game events using the logEvent function, outputs the final stats to the console,
        //Disable inputs and buttons as the game has ended, ends game and displays the end game message
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

        //Sends a POST request to log game event
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

       //Attempt to get the game ID using the game name and handles any errors that occur during fetching
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
