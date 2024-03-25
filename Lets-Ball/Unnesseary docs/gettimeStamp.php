<?php
// Assuming connection to the database is already established

// Fetch the countdown end timestamp from your database
// Example query (adjust according to your actual database schema)
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");
session_start();
$userId = $_SESSION['userId'];
$query = "SELECT allowed_time FROM userlimit WHERE date = CURDATE() AND userid = '$userId'";
$result = mysqli_query($conn, $query);

$row = mysqli_fetch_assoc($result);
$sessionAllowedtim = $row['allowed_time'] * 60;
$_SESSION['expire_time'] = $sessionAllowedtim;
// Output the timestamp as JSON


?>