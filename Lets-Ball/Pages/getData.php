<?php
//Connect to database
$conn = mysqli_connect("127.0.0.1:8111", "root", "", "lets_ball_database");

//Ensure connection is successful if not exit
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$gameName = $_GET['Gname'];//Gets the game name from the query parameter 'Gname'
$query = "SELECT Game_ID FROM Games WHERE Game_Name = '$gameName'";//Prepares an SQL query to get the game ID for the game name
$result = mysqli_query($conn, $query);// Executes the query and stores the result
$row = mysqli_fetch_assoc($result); //Fetches the resulting row as an associative array
$gameId = $row['Game_ID']; //Extracts the game ID from the row
    
//Set the content type of the response to JSON and encodes the game ID into a JSON object then sends the response
header('Content-Type: application/json');
echo json_encode(['GameID' => $gameId]);
?>