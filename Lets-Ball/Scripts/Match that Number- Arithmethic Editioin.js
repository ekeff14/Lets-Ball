let timer;
        let mainTimer;
        let matchesMade = 0;
        let problemsAsked = [];
        const numberWords = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"];

        document.addEventListener("DOMContentLoaded", function() {
            generateNumberButtons();
        });

        function generateNumberButtons() {
            const container = document.getElementById('buttons-container');
            for (let i = 0; i <= 50; i++) {
                const button = document.createElement('button');
                button.innerText = i;
                button.style.display = 'none';
                button.onclick = function() { checkMatch(i); };
                container.appendChild(button);
            }
        }

        function startGame() {
            matchesMade = 0;
            problemsAsked = [];
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

        function setNextTargetNumber() {
            const problem = generateMathProblem();
            problemsAsked.push(problem);
            document.getElementById('targetNumber').textContent = `${numberWords[problem.num1]} ${problem.operation} ${numberWords[problem.num2]} = ?`;
            startTimer();
        }

        function generateMathProblem() {
            let num1 = Math.floor(Math.random() * 21);
            let num2 = Math.floor(Math.random() * num1); // Ensure num2 is always less or equal to num1 to avoid negative results
            const operation = Math.random() > 0.5 ? '+' : '-';
            const answer = operation === '+' ? num1 + num2 : num1 - num2;
            return { num1, num2, operation, answer };
        }

        function checkMatch(selectedNumber) {
            const currentProblem = problemsAsked[problemsAsked.length - 1];
            if (selectedNumber === currentProblem.answer) {
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
            let seconds = 20;
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
            clearInterval(mainTimer);
            document.getElementById('result').textContent = `Game over! Matches Made: ${matchesMade}.`;
            document.getElementById('playButton').style.display = 'block';
            document.querySelectorAll('#buttons-container button').forEach(button => button.style.display = 'none');
            showCorrections();
        }

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