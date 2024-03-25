<?php
$conn = mysqli_connect("127.0.0.1:8111", "root", "", "lets_ball_database");

// Ensure connection is successful
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$gameName = $_GET['Gname'];
$query = "SELECT Game_ID FROM Games WHERE Game_Name = '$gameName'";
$result = mysqli_query($conn, $query);
$row = mysqli_fetch_assoc($result);
$gameId = $row['Game_ID'];
    
header('Content-Type: application/json');
echo json_encode(['GameID' => $gameId]);


?>