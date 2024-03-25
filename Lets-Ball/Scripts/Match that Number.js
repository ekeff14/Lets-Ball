let timer;
        let mainTimer;
        let matchesMade = 0;
        let corrections = [];
        let attemptedNumbers = [];
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

        function generateNumberButtons() {
            const container = document.getElementById('buttons-container');
            for (let i = 1; i <= 100; i++) {
                const button = document.createElement('button');
                button.innerText = i;
                button.onclick = function() { checkMatch(i); };
                container.appendChild(button);
            }
        }

        function startGame() {
            matchesMade = 0;
            corrections = [];
            attemptedNumbers = [];
            document.getElementById('matches-made-container').textContent = "Matches Made: 0";
            document.getElementById('result').textContent = "";
            document.getElementById('playButton').style.display = 'none';
            document.getElementById('mainTimer').textContent = "60s";
            document.getElementById('corrections-container').style.display = 'none';
            showNumberButtons();
            setNextTargetNumber();
            startMainTimer();
        }

        function showNumberButtons() {
            document.querySelectorAll('#buttons-container button').forEach(button => {
                button.style.display = 'inline-block';
            });
        }

        function hideNumberButtons() {
            document.querySelectorAll('#buttons-container button').forEach(button => {
                button.style.display = 'none';
            });
        }

        function setNextTargetNumber() {
            const num = Math.floor(Math.random() * 100) + 1;
            document.getElementById('targetNumber').textContent = numberWords[num - 1];
            attemptedNumbers.push({number: num, word: numberWords[num - 1]});
            startTimer();
        }

        function checkMatch(selectedNumber) {
            const targetWord = document.getElementById('targetNumber').textContent;
            const targetNumber = numberWords.indexOf(targetWord) + 1;
            
            if (selectedNumber === targetNumber) {
                matchesMade++;
                document.getElementById('matches-made-container').textContent = `Matches Made: ${matchesMade}`;
                document.getElementById('result').textContent = "Correct!";
            } else {
                document.getElementById('result').textContent = "Incorrect. Moving to the next number.";
            }
            setNextTargetNumber();
        }

        function startTimer() {
            clearInterval(timer);
            let seconds = 10;
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

        function startMainTimer() {
            let mainSeconds = 60;
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

        function endGame() {
            clearInterval(timer);
            document.getElementById('result').textContent = `Game over! Matches Made: ${matchesMade}.`;
            document.getElementById('playButton').style.display = 'block';
            hideNumberButtons();
            displayCorrections();
        }

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
