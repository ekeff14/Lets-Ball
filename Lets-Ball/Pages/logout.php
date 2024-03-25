<?php
session_start(); // Always start the session at the beginning

include 'end_session.php'; // Include your session handling functions

// Ensure there's an active session with a userId to work with
if (isset($_SESSION['userId'])) {
    $conn = mysqli_connect("127.0.0.1:8111", "root", "", "lets_ball_database");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userId = $_SESSION['userId'];

    // Assuming storeExpirationTimestamp() is a function defined in end_session.php
    // and it correctly handles storing the session expiration information.
    storeExpirationTimestamp($userId, $conn);

    // Optionally, perform any other actions needed before ending the session

    session_destroy(); // Then, destroy the session
    session_write_close(); // Ensure session data is written and closed before redirecting
    header("Location: login.php"); // Redirect to the login page
    exit; // Ensure no further code is executed after redirection
} else {
    // If there's no user ID in session, redirect directly
    header("Location: login.php");
    exit;
}
