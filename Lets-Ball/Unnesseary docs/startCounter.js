// Function to start the countdown timer
export function fetchCountdownEndTimestampAndStartTimer() {
    fetch('../Pages/gettimeStamp.php')
    .then(response => response.json())
    .then(data => {
        // Extract the countdownEndTimestamp from the response
        const countdownEndTimestamp = data.countdownEndTimestamp;

        
        // Start the countdown timer
        startCountdown(countdownEndTimestamp);
        
    })
    .catch(error => console.error('Error fetching countdown timestamp:', error));
}


// Call this function when you're ready to start the timer, such as on page load
 function startCountdown(countdownEndTimestamp) {
    const intervalId = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds
        const timeLeft = countdownEndTimestamp - currentTime; // Calculate time left in seconds
        
        if (timeLeft <= 0) {
            clearInterval(intervalId);
            document.getElementById('countdown-timer').textContent = "Time's up!";
            // Notify server that countdown has finished
            endSession();
        } else {
            // Calculate hours, minutes, and seconds from `timeLeft`
            console.log(timeLeft)
            const hours = Math.floor(timeLeft / 3600);
            const minutes = Math.floor((timeLeft % 3600) / 60);
            const seconds = timeLeft % 60;
            
            // Update the countdown display
            document.getElementById('countdown-timer').textContent = `${hours}h:${minutes}m:${seconds}s`;
        }
    }, 1000);
}

// Function to notify server to end the session
function endSession() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../Pages/end_session.php", true); // Assuming your PHP file is named `end_session.php`
    xhr.onload = function() {
        if (this.status == 200) {
            console.log("Session ended:", this.responseText);
        }
    };
    xhr.send();
}

// Example of starting the countdown (the `countdownEndTimestamp` would be fetched from the server)
// startCountdown(<timestamp from server>);
