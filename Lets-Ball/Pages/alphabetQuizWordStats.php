<?php

$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");

$game_id = 8;
$eventType = 'Score'; 

// Prepare the SQL statement
// Assuming you're fetching events for a specific game
// SQL template for fetching the latest entry of a specific event type for a game
$sqlTemplate = "SELECT Event_Value FROM event 
                WHERE Game_ID = ? AND Event_Type = ?
                ORDER BY Event_ID DESC 
                LIMIT 1";

$eventTypes = ['Correct Answer', 'Wrong Answer'];
$latestValues = [];

foreach ($eventTypes as $eventType) {
    if ($stmt = $conn->prepare($sqlTemplate)) {
        $stmt->bind_param("is", $game_id, $eventType);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $latestValues[$eventType] = $row['Event_Value'];
        } else {
            // No entry found for this event type
            $latestValues[$eventType] = 'N/A';
        }
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
        // Handle error appropriately
    }
}

?>

<!doctype html>

<html>

    <head>
  <meta charset="utf-8">
  <title>Alphabet Quiz Word Edition Statistic</title>
  <meta name="author" content="About the author">
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
                <h2 class="white">Alphabet Quiz Word Edition Statistic</h2>                    
            </header> 

            <main class="greentopline">
                <h4>Check out how good you performed below!</h4>
         <?php 
         echo "<table>";
         echo "<thead><tr>";
         foreach ($eventTypes as $eventType) {
             echo "<th>" . htmlspecialchars($eventType) . "</th>";
         }
         echo "</tr></thead>";
         echo "<tbody><tr>";
         foreach ($latestValues as $value) {
             echo "<td>" . htmlspecialchars($value) . "</td>";
         }
         echo "</tr></tbody>";
         echo "</table>";
        
        
        ?>
            </main>   
            
            <h3><a href="alphabetQuizWordsEdition.html">Return to game</a></h3>
    
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