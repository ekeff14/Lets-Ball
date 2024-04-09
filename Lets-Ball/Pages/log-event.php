<?php
$conn = mysqli_connect("127.0.0.1:8111", "root", "", "lets_ball_database"); //Connect to database
// Check if the request method is POST to handle form data
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = file_get_contents('php://input'); 
    $data = json_decode($input, true);

    $game_id = filter_var($data['game_id'], FILTER_SANITIZE_NUMBER_INT);//Sanitize and gets game ID from decoded data
    $eventType = $data['event_type'];//Gets event type from the decoded data
    $event_value = filter_var($data['event_value'], FILTER_SANITIZE_NUMBER_INT);//Sanitize and gets the event value from decoded data

    //SQL query to insert the event data into the 'event' table
    $query = "INSERT INTO event (Event_Type, Event_Value, Game_ID) VALUES ('$eventType', '$event_value', '$game_id')";
    $result = mysqli_query($conn, $query); //Executes the SQL query
   //Checks if the SQL query was successful and alert the user of the status
    if($result){
    echo json_encode(['status' => 'success', 'message' => 'Event logged successfully']);
   }else{
    echo json_encode(['status' => 'error', 'message' => 'Error logging event']);
   }
}
?>