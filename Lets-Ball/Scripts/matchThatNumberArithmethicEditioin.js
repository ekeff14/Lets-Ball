        //Initializes game state variables
        let timer;
        let mainTimer;
        let matchesMade = 0;
        let wrongMatch = 0;
        let problemsAsked = [];//Stores the math problems that have been asked for correction

        //Predefined words for numbers
        const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];

        document.addEventListener("DOMContentLoaded", function() {
            generateNumberButtons();
        });

        //Dynamically generate number buttons
        function generateNumberButtons() {
            const container = document.getElementById('buttons-container');
            //Loop to create buttons for numbers 0 through 50
            for (let i = 0; i <= 50; i++) {
                const button = document.createElement('button');
                button.innerText = i;
                button.style.display = 'none';
                button.onclick = function() { checkMatch(i); };
                container.appendChild(button);
            }
        }

        //Resets game state and UI elements to start a new game
        function startGame() {
            matchesMade = 0;
            problemsAsked = [];
            document.getElementById('matches-made-container').textContent = "Matches Made: 0";
            document.getElementById('result').textContent = "";
            document.getElementById('playButton').style.display = 'none';
            document.getElementById('mainTimer').textContent = "300s";
            document.getElementById('corrections-container').style.display = 'none';
            showNumberButtons();
            setNextTargetNumber();
            startMainTimer();//start main timer
        }

        //Makes number buttons visible
        function showNumberButtons() {
            document.querySelectorAll('#buttons-container button').forEach(button => {
                button.style.display = 'inline-block';
            });
        }

        //Generates a new math problem and update the UI according to the target number
        function setNextTargetNumber() {
            const problem = generateMathProblem();
            problemsAsked.push(problem);
            document.getElementById('targetNumber').textContent = `${numberWords[problem.num1]} ${problem.operation} ${numberWords[problem.num2]} = ?`;
            startTimer();
        }

        //Randomly generates a math problem to help get the target number
        function generateMathProblem() {
            let num1 = Math.floor(Math.random() * 21);
            let num2 = Math.floor(Math.random() * num1); // Ensure num2 is always less or equal to num1 to avoid negative results
            const operation = Math.random() > 0.5 ? '+' : '-';
            const answer = operation === '+' ? num1 + num2 : num1 - num2;
            return { num1, num2, operation, answer };
        }

         //Check for a match, update game state and UI based on if the match is correct or wrong    
        function checkMatch(selectedNumber) {
            const currentProblem = problemsAsked[problemsAsked.length - 1];
            if (selectedNumber === currentProblem.answer) {
                matchesMade++;
                document.getElementById('matches-made-container').textContent = `Matches Made: ${matchesMade}`;
                document.getElementById('result').textContent = "Correct!";
            } else {
                wrongMatch++;
                document.getElementById('result').textContent = "Incorrect. Moving to the next number.";
            }
            setNextTargetNumber();
        }

         //Clears any existing timer and starts a new countdown for the current problem    
        function startTimer() {
            clearInterval(timer);
            let seconds = 60;
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

        //Clears any existing main timer and starts a new countdown for the entire game duration    
        function startMainTimer() {
            let mainSeconds = 300;
            clearInterval(mainTimer);
            mainTimer = setInterval(() => {
                mainSeconds--;
                document.getElementById('mainTimer').textContent = `${mainSeconds}s`;
                if (mainSeconds <= 0) {
                    clearInterval(mainTimer);
                    endGame();
                }
            }, 1000);
        }

         //Ends the game, log results for stats, and prepares the UI for a new game
        async function endGame() {
            clearInterval(timer);
            clearInterval(mainTimer);
            matchesMade;wrongMatch;
            let ratio = matchesMade/wrongMatch;
            const mainRatio = ratio.toFixed(2); console.log(mainRatio);
            const gameId = await fetchGameId('MatchNumberA');
            logEvent(gameId, "Correct Matches Made", matchesMade);
            logEvent(gameId, "Incorrect Matches Made", wrongMatch);

            document.getElementById('result').textContent = `Game over! Matches Made: ${matchesMade}.`;
            document.getElementById('playButton').style.display = 'block';
            document.querySelectorAll('#buttons-container button').forEach(button => button.style.display = 'none');
            showCorrections();
        }

        //Display the correct answers for all problems asked in the problemsAsked array
        function showCorrections() {
            const correctionsContainer = document.getElementById('corrections-container');
            correctionsContainer.innerHTML = '<h2>Corrections:</h2>';
            problemsAsked.forEach(problem => {
                const p = document.createElement('p');
                p.textContent = `${numberWords[problem.num1]} ${problem.operation} ${numberWords[problem.num2]} = ${problem.answer}`;
                correctionsContainer.appendChild(p);
            });
            correctionsContainer.style.display = 'block';
        }

         //Send a POST request to log game events    
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

        //Retrieves a unique identifier for the game based on the game name for event logging
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
