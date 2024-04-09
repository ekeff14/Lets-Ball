<?php
//Establish database connection
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");

//Sets game ID and event type for query
$game_id = 9;
$eventType = 'Score'; 

//SQL template to get the most recent value of a specified event type
$sqlTemplate = "SELECT Event_Value FROM event 
                WHERE Game_ID = ? AND Event_Type = ?
                ORDER BY Event_ID DESC 
                LIMIT 1";

//identifies desired event types
$eventTypes = ['Correct Answer', 'Wrong Answer'];
$latestValues = [];// array to store the latest value of each event type

//Loops through each event type and gets the latest value
foreach ($eventTypes as $eventType) {
    if ($stmt = $conn->prepare($sqlTemplate)) { //makes an SQL statement        
        $stmt->bind_param("is", $game_id, $eventType); //Binds event type and game ID to the SQL statement
        $stmt->execute(); //Execute the SQL statement
        $result = $stmt->get_result(); //gets the result

        //Gets the related row as an associative array.
        if ($row = $result->fetch_assoc()) {
            $latestValues[$eventType] = $row['Event_Value']; //Store the value in the array with the event type as the key if a row is found
        } else {            
            $latestValues[$eventType] = 'N/A'; //No entry found for this event type
        }
        $stmt->close(); //statement Closed
    } else {
        echo "Error preparing statement: " . $conn->error;//output an error message if SQL statement cant be made
        
    }
}

?>

<!doctype html>

<html>

    <head>
  <meta charset="utf-8">
  <title>Alphabet Quiz Letter Edition Statistic</title>
  <meta name="author" content="stats">
  <link rel="stylesheet" href="../CSS/Diss.css">
  <script src="../Scripts/startCounter.js"></script>
</head>
    
    <body>
        <div class="semi-transparent-background">
            <div class="outlined-text">
        
        <div id="Top"></div>
        
        <div id="wrapper">
            
            <header>
            <div aria-label="Home">
                <a href="Index.php"><img src="../CSS/Images/logo.png" alt="Homepage"></a>
                </div>
                <h2 class="white">Alphabet Quiz Letter Edition Statistic</h2>                    
            </header> 

            <main class="greentopline">
                <h4>Check out how good you performed below!</h4>
         <?php 
         //display the values of the stats in a table format
         echo "<table>"; //HTML table output
         echo "<thead><tr>";
         foreach ($eventTypes as $eventType) {//Loop through each event type and create a table header
             echo "<th>" . htmlspecialchars($eventType) . "</th>"; //Uses htmlspecialchars
         }
         echo "</tr></thead>";//Close table header row
         echo "<tbody><tr>";//Begin table body

         //Loop through each latest value and create a table cell
         foreach ($latestValues as $value) { 
             echo "<td>" . htmlspecialchars($value) . "</td>";
         }
         echo "</tr></tbody>";
         echo "</table>";
        
        
        ?>
            </main>   
            
            <h3><a href="alphabetQuizNormalEdition.html">Return to game</a></h3>
    
       </div>

       <footer>
        <div class="outlined-text topline">
        <div class="social-media">
            <a href="https://www.snapchat.com/add/yourusername" target="_blank">
                <img src="../CSS/Images/snap.jpg" id="socimg1" alt="Snapchat"> @JAE367
            </a><br>
            <a href="https://www.instagram.com/yourusername" target="_blank">
                <img src="../CSS/Images/ig.jpg" id="socimg3" alt="Instagram"> @JEA367
            </a><br>
        </div>
    </div>
    </footer>

       </div>
        </div>

    </body>        
</html>
