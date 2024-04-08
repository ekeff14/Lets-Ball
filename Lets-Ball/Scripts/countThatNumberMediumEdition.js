const numberContainer = document.getElementById("number-container");
        const result = document.getElementById("result");
        const timerDisplay = document.getElementById("timer");
        const playButton = document.getElementById("playButton");
        const helpButton = document.getElementById("helpButton");
        const helpText = document.getElementById("helpText");
        const correctionsContainer = document.getElementById("corrections-container");
        const streakCounter = document.getElementById("streakCounter");
        let helpCount = 5;
        let streak = 0;
        let timers = 0; 
        let numbersToDisplay;
        let currentNumber;
        let highestStreak = 0;
        let streakLosses = 0;
        let timeRemaining;
        const totalTime = 300;

        function createNumberElement(number) {
            const numberElement = document.createElement("div");
            numberElement.classList.add("number");
            numberElement.textContent = number;
            numberElement.dataset.number = number;
            numberElement.addEventListener("click", () => checkNumber(number));
            return numberElement;
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function displayNumbers() {
            numbersToDisplay = shuffleArray(Array.from({ length: 40 }, (_, i) => i - 20));
            currentNumber = Math.min(...numbersToDisplay);
            numberContainer.innerHTML = "";
            numbersToDisplay.forEach(number => {
                numberContainer.appendChild(createNumberElement(number));
            });
        }

        function checkNumber(number) {
            if (number === currentNumber) {
                highestStreak++;
                if (isNaN(highestStreak)){
                    highestStreak = 0;
                }
                
                document.querySelector(`[data-number="${number}"]`).remove();
                numbersToDisplay.splice(numbersToDisplay.indexOf(number), 1);
                currentNumber = numbersToDisplay.length ? Math.min(...numbersToDisplay) : null;
                streak++;
                updateStreakCounter();
                if (!numbersToDisplay.length) endGame(true);
            } else {

              
                   streakLosses++; 
                
                if (isNaN(streakLosses)){
                    streakLosses = 0;
                }
                
                streak = 0;
                updateStreakCounter();
                result.textContent = "Incorrect! Try again.";
                timeRemaining -= 4;
                updateTimerDisplay();
                }
            }
        

        function updateTimerDisplay() {
            timerDisplay.textContent = `Time Remaining: ${timeRemaining} seconds`;
        }

        function updateStreakCounter() {
            streakCounter.textContent = `Streak: ${streak}`;
        }

        async function endGame(success) {
            clearInterval(timer);
            console.log(`Time Spent: ${timers} seconds, Highest Streak: ${highestStreak}, Fails: ${streakLosses}`);
            numberContainer.style.display = "none"; // Hide number container
            result.textContent = success ? `Congratulations! You've clicked all numbers! Final streak: ${streak}.` : "Time's up! try again, your final streak:" +streak+".";
            const gameId = await fetchGameId('CountNumberM');
            logEvent(gameId, "Highest Streak", highestStreak);
            logEvent(gameId, "Fails", streakLosses);
            logEvent(gameId, "TimeSpent", timers);
            playButton.disabled = false;
            helpButton.style.display = "none";
            correctionsContainer.style.display = "block";
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
        
   

        
        

        function showCorrections() {
            correctionsContainer.innerHTML = "<h2>Correct Order:</h2>";
            let sortedNumbers = [...Array.from({ length: 40 }, (_, i) => i - 20)].sort((a, b) => a - b);
            sortedNumbers.forEach(number => {
                const elem = document.createElement("div");
                elem.classList.add("number");
                elem.textContent = number;
                correctionsContainer.appendChild(elem);
            });
        }

        function initializeGame() {
            numbersToDisplay = [];
            timeRemaining = totalTime;
            highestStreak = 0;
            streakLosses = 0
            streak = 0;
            timers = 0; 
            updateStreakCounter();
            displayNumbers();
            updateTimerDisplay();
            helpCount = 5; // Reset help usage count
            playButton.disabled = true;
            helpButton.disabled = false;
            helpButton.style.display = "inline-block";
            helpButton.textContent = `Help (${helpCount})`;
            result.textContent = '';
            numberContainer.style.display = "flex"; // Show number container
            correctionsContainer.style.display = "none"; // Hide corrections
            timer = setInterval(() => {
                timers++;
                timeRemaining--;
                updateTimerDisplay();
                if (timeRemaining <= 0) endGame(false);
            }, 1000);
        }

        playButton.addEventListener("click", initializeGame);
        helpButton.addEventListener("click", function() {
            if (helpCount > 0) {
                helpCount--;
                helpButton.textContent = `Help (${helpCount})`;
                helpText.textContent = `Hint: Click on ${currentNumber}.`;
                setTimeout(() => { helpText.textContent = ''; }, 3000);
                if (helpCount === 0) helpButton.disabled = true;
            }
        });
