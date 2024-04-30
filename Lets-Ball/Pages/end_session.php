<?php

//Function to check if the session has expired and log the user is logged out
function checkSession() {

    $conn = mysqli_connect("127.0.0.1:8111", "root", "", "lets_ball_database");

    // Ensure connection is successful else exit
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userId = $_SESSION['userId'];
    $query = "SELECT allowed_time FROM userlimit WHERE date = CURDATE() AND userid = '$userId'";
    $result = mysqli_query($conn, $query);
    mysqli_close($conn); // Close the connection after fetching data

    if ($result && $row = mysqli_fetch_assoc($result)) {
        $sessionAllowedtim = $row['allowed_time'] * 300;
    } else {
        // Fallback allowed time for the user to use the website
        $sessionAllowedtim = 1 * 300;
    }

    // Set or update the expire_time
    if (!isset($_SESSION['start_time'])) {
        $_SESSION['start_time'] = time();
        $_SESSION['expire_time'] = $_SESSION['start_time'] + $sessionAllowedtim;
    }

    // Check if the session should expire
    if (time() > $_SESSION['expire_time']) {
        echo '<script type="text/javascript">';
        echo 'alert("You are being logged out");';
        echo '</script>';
        // Unset all session variables
        $_SESSION = array();
            

        // Destroy the session
        session_destroy();

      
        // Redirect to login page
        header("Location: timeout.php");
        exit;
    }
}



function storeExpirationTimestamp($userId, $conn) {
    //Query the database for the allowed time for the current day and user logged in    
    $query = "SELECT allowed_time FROM userlimit WHERE date = CURDATE() AND userid = '$userId'";
    $result = mysqli_query($conn, $query);

    // If the query was successful and a row was found then calculate the expiration timestamp which is the current time plus the allowed time in seconds
    if ($result && $row = mysqli_fetch_assoc($result)) {        
        $sessionAllowedTime = $row['allowed_time'] * 300;
    $expirationTimestamp = time() + $sessionAllowedTime;
    //Update the userlimit table with the new expiration timestamp calculated for the user
    $sql = "UPDATE userlimit SET time_spent = '$expirationTimestamp' WHERE date = CURDATE() AND userid = '$userId'";
    $result = mysqli_query($conn, $sql);
    //If the update query was successful alert the user of the status
    if($result){
        echo 'Successful';
    }
        }
}


function getRemainingSessionTime($userId, $conn) {    
    $sql = "SELECT time_spent FROM userlimit WHERE userid = '$userId' AND date = CURDATE()"; //SQL query to get the 'time_spent' value from 'userlimit' table for the logged in user and current date
    $result = mysqli_query($conn, $sql);//Execute the query
    mysqli_close($conn); // Close the connection after fetching data
    $row = mysqli_fetch_assoc($result); //Fetch the result row as an associative array
    // If a row is returned, get the 'time_spent', current time and calculate the time left until expiration then return the time left if it is greater than 0 else return 0
    if ($row) {
        $expirationTimestamp = $row['time_spent'];
        $currentTime = time();
        $timeLeft = $expirationTimestamp - $currentTime;
        return $timeLeft > 0 ? $timeLeft : 0;
    }
    return null; // Return null to indicate no data found
}



