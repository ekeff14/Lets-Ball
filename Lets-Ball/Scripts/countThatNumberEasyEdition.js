        //Game DOM elements(Document Object Model)
        const numberContainer = document.getElementById("number-container");
        const result = document.getElementById("result");
        const timerDisplay = document.getElementById("timer");
        const playButton = document.getElementById("playButton");
        const helpButton = document.getElementById("helpButton");
        const helpText = document.getElementById("helpText");
        const corrections = document.getElementById("corrections");
        const streakCounter = document.getElementById("streakCounter");
        
        //Game state variables
        let numbersToDisplay;
        let currentNumber;
        let timeRemaining;
        const totalTime = 200;
        let timer;
        let timers = 0; 
        let helpCount = 5; // Initialize help button click counter
        let streak = 0; // Initialize streak counter
        let originalOrder = []; // Store the original order of numbers
        let highestStreak = 0;
        let streakLosses = 0;

        //Creates interactive number elements
        function createNumberElement(number) {
            const numberElement = document.createElement("div");
            numberElement.classList.add("number");
            numberElement.textContent = number;
            numberElement.addEventListener("click", function() { checkNumber(number, this); });
            return numberElement;
        }

        //Shuffle the array of numbers
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        //Displays the numbers on the screen
        function displayNumbers() {
            numberContainer.innerHTML = "";
            numbersToDisplay.forEach(number => {
                numberContainer.appendChild(createNumberElement(number));
            });
        }

        //Displays the correct order of numbers at the end of the game as correction
        function displayCorrections() {
            corrections.innerHTML = "<h2>Correct Order:</h2>";
            originalOrder.forEach(number => {
                const numDiv = document.createElement("div");
                numDiv.classList.add("number");
                numDiv.textContent = number;
                corrections.appendChild(numDiv);
            });
            corrections.style.display = "block";
        }

        //Crosschecks user's answer to make sure it is correct, handles streak count and ends game if numbers are finished
        function checkNumber(number, element) {
            if (number === currentNumber) {
                highestStreak++;
                if (isNaN(highestStreak)){
                    highestStreak = 0;
                }
                streak++; // Increment streak for each correct click
                updateStreakCounter(); // Update the streak counter display

                element.remove();
                numbersToDisplay.splice(numbersToDisplay.indexOf(number), 1);
                currentNumber = Math.min(...numbersToDisplay);
                if (numbersToDisplay.length === 0) {
                    clearInterval(timer);
                    result.textContent = "Congratulations! You've sorted all numbers!";
                    endGame();
                }
            } else {

                streakLosses++; 
                
                if (isNaN(streakLosses)){
                    streakLosses = 0;
                }

                streak = 0; // Reset streak if wrong number is clicked
                updateStreakCounter(); // Update the streak counter display

                result.textContent = "Incorrect! Try again.";
                timeRemaining = Math.max(0, timeRemaining - 3);
                updateTimerDisplay();
            }
        }

        //Updates the current streak of correct answers
        function updateStreakCounter() {
            streakCounter.textContent = "Streak: " + streak;
        }

        //Update the timer displayed
        function updateTimerDisplay() {
            timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;
        }

        //Gets the unique game ID 
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

        //Ends the game and logs events for stats
        async function endGame() {
            clearInterval(timer);
            result.textContent += " Game over, your final streak was " + streak + ".";
            const gameId = await fetchGameId('CountNumber');
            //highest streak stat acts as the number of correct count
            logEvent(gameId, "Correct Count", highestStreak);
            logEvent(gameId, "Fails", streakLosses);
            logEvent(gameId, "TimeSpent", timers);
            playButton.disabled = false;
            helpButton.disabled = true; // Disable help button after game ends
            helpButton.style.display = "none"; // Hide help button after game ends
            displayCorrections(); // Show the correct order of numbers when game ends            
            updateStreakCounter(); // Update the streak counter display
            numberContainer.style.display = "none"; // Hide the number container when the game ends
        }

        //Sends events data to the server for logging
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

        //Reinitialize the game variables for a new game
        function initializeGame() {
            originalOrder = Array.from({ length: 20 }, (_, i) => i + 1);
            numbersToDisplay = shuffleArray([...originalOrder]);
            currentNumber = Math.min(...numbersToDisplay);
            timeRemaining = totalTime;
            highestStreak = 0;
            streakLosses = 0
            streak = 0; // Reset streak at end of game
            displayNumbers();
            updateTimerDisplay();
            playButton.disabled = true;
            helpButton.style.display = "inline-block"; // Show help button when game starts
            helpButton.disabled = false; // Enable help button
            helpCount = 5; // Reset help usage count
            helpButton.textContent = "Help (" + helpCount + ")"; // Update button text with help count
            result.textContent = '';
            corrections.style.display = "none"; // Hide corrections when a new game starts
            streak = 0; // Reset streak when a new game starts
            updateStreakCounter(); // Update the streak counter display
            numberContainer.style.display = "block"; // Ensure the number container is visible when the game starts
            timer = setInterval(function() {
                timers++;
                timeRemaining--;
                updateTimerDisplay();
                if (timeRemaining <= 0) endGame();
            }, 1000);
        }

        playButton.addEventListener("click", initializeGame);//Event listener to start game when the play button is clicked

        //Event listener for the help button to give hints when clicked
        helpButton.addEventListener("click", function() {
            if (helpCount > 0) {
                helpText.textContent = "Click on number: " + currentNumber;
                setTimeout(function() { helpText.textContent = ''; }, 5000); // Clear help message after 5 seconds
                helpCount--;
                helpButton.textContent = "Help (" + helpCount + ")";
                if (helpCount === 0) {
                    helpButton.disabled = true; // Disable help button after 5 uses
                }
            }
        });
