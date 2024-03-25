<?php
// session_start();

// //Function to check if the session has expired and log the user out
function checkSession() {

    $conn = mysqli_connect("127.0.0.1:8111", "root", "", "lets_ball_database");

    // Ensure connection is successful
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $userId = $_SESSION['userId'];
    $query = "SELECT allowed_time FROM userlimit WHERE date = CURDATE() AND userid = '$userId'";
    $result = mysqli_query($conn, $query);
    mysqli_close($conn); // Close the connection after fetching data

    if ($result && $row = mysqli_fetch_assoc($result)) {
        $sessionAllowedtim = $row['allowed_time'] * 3600;
    } else {
        // Fallback allowed time
        $sessionAllowedtim = 1 * 3600;
    }

    // Set or update the expire_time
    if (!isset($_SESSION['start_time'])) {
        $_SESSION['start_time'] = time();
        $_SESSION['expire_time'] = $_SESSION['start_time'] + $sessionAllowedtim;
    }

    // Check if the session should expire
    if (time() > $_SESSION['expire_time']) {
        // Unset all session variables
        $_SESSION = array();
        
        // Destroy the session
        session_destroy();
        
        // Redirect to login page
        header("Location: login.php");
        exit;
    }
}



function storeExpirationTimestamp($userId, $conn) {
    
    $query = "SELECT allowed_time FROM userlimit WHERE date = CURDATE() AND userid = '$userId'";
    $result = mysqli_query($conn, $query);
//     mysqli_close($conn); // Close the connection after fetching data

    if ($result && $row = mysqli_fetch_assoc($result)) {
        $sessionAllowedTime = $row['allowed_time'] * 3600;
    $expirationTimestamp = time() + $sessionAllowedTime;
    $sql = "UPDATE userlimit SET time_spent = '$expirationTimestamp' WHERE date = CURDATE() AND userid = '$userId'";
    $result = mysqli_query($conn, $sql);
    if($result){
        echo 'Successful';
    }
        }
}


function getRemainingSessionTime($userId, $conn) {
    $sql = "SELECT time_spent FROM userlimit WHERE userid = '$userId' AND date = CURDATE()";
    $result = mysqli_query($conn, $sql);
    mysqli_close($conn); // Close the connection after fetching data
    $row = mysqli_fetch_assoc($result);
    if ($row) {
        $expirationTimestamp = $row['time_spent'];
        $currentTime = time();
        $timeLeft = $expirationTimestamp - $currentTime;
        return $timeLeft > 0 ? $timeLeft : 0;
    }
    return null; // Return null to indicate no data found
}



// Call the session check function on every script/page load
// 

//... rest of your page-specific code
