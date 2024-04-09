<?php
//Connect to the database
$conn = mysqli_connect("127.0.0.1:8111", "root", "", "lets_ball_database");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['submit'])) {
    session_start();
    $timer = $_POST['allowedTime'];
    $userId = $_SESSION['userId'];
    $timeSpent = 0;

    // Check if the user already has a limit set for today
    $checkSql = "SELECT * FROM userlimit WHERE userid = '$userId' AND date = CURDATE()";
    $result = mysqli_query($conn, $checkSql);
    $timer = $_POST['allowedTime'];
    $userId = $_SESSION['userId'];
    $timeSpent = 0;
    
    if ($result && mysqli_num_rows($result) > 0) {
      
        
        // User already has a limit set for today, update it
        $sql = "UPDATE userlimit SET allowed_time = '$timer', time_spent = '$timeSpent' WHERE userid = '$userId' AND date = CURDATE()";
    } else {
        // No limit set for today, insert a new record
        $sql = "INSERT INTO userlimit (userid, date, allowed_time, time_spent) VALUES ('$userId', CURDATE(), '$timer', '$timeSpent')";
    }

    //Update the user of the status of the action
    $stmt = mysqli_query($conn, $sql);
        if ($stmt) {
            echo "<script>alert('Timer updated successfully.'); window.location.href='Parental_Control.php';</script>";
        } else {
            echo "<script>alert('Error updating timer.'); window.location.href='Parental_Control.php';</script>";
        }
    } else {
        echo "<script>alert('Error preparing statement.'); window.location.href='Parental_Control.php';</script>";
    }

?>
