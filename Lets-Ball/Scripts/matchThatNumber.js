        //the game state variables
        let timer;
        let mainTimer;
        let matchesMade = 0;
        let wrongMatch = 0;
        let corrections = [];
        let attemptedNumbers = [];//stores asked numbers for correction
        // Predefined words for numbers to match with words version
        const numberWords = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
                            "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen",
                            "Eighteen", "Nineteen", "Twenty", "Twenty-One", "Twenty-Two", "Twenty-Three", "Twenty-Four", "Twenty-Five", "Twenty-Six", "Twenty-Seven", "Twenty-Eight", "Twenty-Nine", "Thirty",
                            "Thirty-One", "Thirty-Two", "Thirty-Three", "Thirty-Four", "Thirty-Five", "Thirty-Six", "Thirty-Seven", "Thirty-Eight", "Thirty-Nine", "Forty",
                            "Forty-One", "Forty-Two", "Forty-Three", "Forty-Four", "Forty-Five", "Forty-Six", "Forty-Seven", "Forty-Eight", "Forty-Nine", "Fifty",
                            "Fifty-One", "Fifty-Two", "Fifty-Three", "Fifty-Four", "Fifty-Five", "Fifty-Six", "Fifty-Seven", "Fifty-Eight", "Fifty-Nine", "Sixty",
                            "Sixty-One", "Sixty-Two", "Sixty-Three", "Sixty-Four", "Sixty-Five", "Sixty-Six", "Sixty-Seven", "Sixty-Eight", "Sixty-Nine", "Seventy",
                            "Seventy-One", "Seventy-Two", "Seventy-Three", "Seventy-Four", "Seventy-Five", "Seventy-Six", "Seventy-Seven", "Seventy-Eight", "Seventy-Nine", "Eighty",
                            "Eighty-One", "Eighty-Two", "Eighty-Three", "Eighty-Four", "Eighty-Five", "Eighty-Six", "Eighty-Seven", "Eighty-Eight", "Eighty-Nine", "Ninety",
                            "Ninety-One", "Ninety-Two", "Ninety-Three", "Ninety-Four", "Ninety-Five", "Ninety-Six", "Ninety-Seven", "Ninety-Eight", "Ninety-Nine", "One Hundred"];

        document.addEventListener("DOMContentLoaded", function() {
            generateNumberButtons();
        });

        //Generates number buttons and attaches them to the 'buttons-container'
        function generateNumberButtons() {
            const container = document.getElementById('buttons-container');
            for (let i = 1; i <= 100; i++) {
                const button = document.createElement('button');
                button.innerText = i;
                button.onclick = function() { checkMatch(i); };
                container.appendChild(button);
            }
        }

        //Starts or restarts the game and resets the game states and UI elements
        function startGame() {
            matchesMade = 0;
            corrections = [];
            attemptedNumbers = [];
            document.getElementById('matches-made-container').textContent = "Matches Made: 0";
            document.getElementById('result').textContent = "";
            document.getElementById('playButton').style.display = 'none';
            document.getElementById('mainTimer').textContent = "300s";
            document.getElementById('corrections-container').style.display = 'none';
            showNumberButtons();
            setNextTargetNumber();
            startMainTimer();
        }

        //Shows the number buttons for matching
        function showNumberButtons() {
            document.querySelectorAll('#buttons-container button').forEach(button => {
                button.style.display = 'inline-block';
            });
        }

        //Hides number buttons when the game ends
        function hideNumberButtons() {
            document.querySelectorAll('#buttons-container button').forEach(button => {
                button.style.display = 'none';
            });
        }

        //Sets next target number for the player to match
        function setNextTargetNumber() {
            const num = Math.floor(Math.random() * 100) + 1;
            document.getElementById('targetNumber').textContent = numberWords[num - 1];
            attemptedNumbers.push({number: num, word: numberWords[num - 1]});
            startTimer();
        }

        //Checks if the player's selected number is correct
        function checkMatch(selectedNumber) {
            const targetWord = document.getElementById('targetNumber').textContent;
            const targetNumber = numberWords.indexOf(targetWord) + 1;
            
            if (selectedNumber === targetNumber) {
                matchesMade++;
                document.getElementById('matches-made-container').textContent = `Matches Made: ${matchesMade}`;
                document.getElementById('result').textContent = "Correct!";
            } else {
                wrongMatch++;
                document.getElementById('result').textContent = "Incorrect. Moving to the next number.";
            }
            setNextTargetNumber();
        }

        //Starts a timer for each matching attempt and resets the timer for each new target number to match
        function startTimer() {
            clearInterval(timer);            
            let seconds = 30;
            document.getElementById('timer-container').textContent = `${seconds}s`;
            timer = setInterval(() => {
                seconds--;
                document.getElementById('timer-container').textContent = `${seconds}s`;
                if (seconds <= 0) {
                    clearInterval(timer);
                    document.getElementById('result').textContent = "Time's up! Moving to the next number.";
                    setNextTargetNumber();
                }
            }, 1000);
        }
        
        //Main timer for the entire game duration
        function startMainTimer() {
            let mainSeconds = 300;
            clearInterval(mainTimer);
            mainTimer = setInterval(() => {
                mainSeconds--
                document.getElementById('mainTimer').textContent = `${mainSeconds}s`;
                if (mainSeconds <= 0) {
                    clearInterval(mainTimer);
                    endGame();
                }
            }, 1000);
        }

        //Ends the game, calculates match ratios, logs game events for stats and updates the UI
        async function endGame() {
            clearInterval(timer);
            matchesMade;wrongMatch;
            let ratio = matchesMade/wrongMatch;
            const mainRatio = ratio.toFixed(2); console.log(mainRatio);
            const gameId = await fetchGameId('MatchNumber');
            logEvent(gameId, "Correct Matches Made", matchesMade);
            logEvent(gameId, "Incorrect Matches Made", wrongMatch);            
            
            document.getElementById('result').textContent = `Game over! Matches Made: ${matchesMade}.`;
            document.getElementById('playButton').style.display = 'block';
            hideNumberButtons();
            displayCorrections();
        }

        //Displays corrections for any numbers the player attempted
        function displayCorrections() {
            const correctionsContainer = document.getElementById('corrections-container');
            correctionsContainer.innerHTML = '<h2>Corrections:</h2>';
            attemptedNumbers.forEach(attempt => {
                const p = document.createElement('p');
                p.textContent = `Number: ${attempt.word}, Correct Answer: ${attempt.number}`;
                correctionsContainer.appendChild(p);
            });
            correctionsContainer.style.display = 'block';
        }

        //Logs game events to the server for stats
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

        //Fetches a unique game ID from the server to log events for that game
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
