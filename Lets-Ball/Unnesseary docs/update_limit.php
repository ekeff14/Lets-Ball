<?php
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");

if(isset($_POST['submit'])){
    session_start();
    $timer = $_POST['allowedTime'];
    $userId = $_SESSION['userId'];
    $timeSpent = 0;
    $sql = "UPDATE userlimit SET userid = '$userId', date = CURDATE(), allowed_time = '$timer', time_spent = '$timeSpent' WHERE userid = '$userId'";
    $result = mysqli_query($conn, $sql);
    if($result){
        echo "<script>alert('Timer updated Successfully')</script>";
        header("location: Parental_Control.html");

    }else{
        echo "<script>alert('error')</script>";
    }
}


?>