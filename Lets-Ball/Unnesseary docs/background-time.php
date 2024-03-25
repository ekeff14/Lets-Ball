<?php
session_start();

// Check if the countdown has been initialized
if (isset($_SESSION['countdown_end'])) {
    $currentTime = time();
    $timeLeft = $_SESSION['countdown_end'] - $currentTime;

    // Ensure the time left is not negative
    $timeLeft = max($timeLeft, 0);
} else {
    // If there is no countdown, return an error or set time left to a default
    $timeLeft = 0; // or handle error
}

// Set header to tell the browser this is a JSON object
header('Content-Type: application/json');

// Echo the remaining time as JSON
echo json_encode(array("timeLeft" => $timeLeft));
    