<?php
//connects to the database and retrieves the latest 'Correct Matches Made' and 'Incorrect Matches Made' event values, then stores them or indicates 'N/A' if not found.
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");
$game_id = 6; 
$eventType = 'Score'; 
$sqlTemplate = "SELECT Event_Value FROM event 
                WHERE Game_ID = ? AND Event_Type = ?
                ORDER BY Event_ID DESC 
                LIMIT 1";

$eventTypes = ['Correct Matches Made', 'Incorrect Matches Made'];
$latestValues = [];

foreach ($eventTypes as $eventType) {
    if ($stmt = $conn->prepare($sqlTemplate)) {
        $stmt->bind_param("is", $game_id, $eventType);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            $latestValues[$eventType] = $row['Event_Value'];
        } else {            
            $latestValues[$eventType] = 'N/A';
        }
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;    
    }
}

?>

<!doctype html>

<html>

    <head>
  <meta charset="utf-8">
  <title>Match That Number Arithmetic Edition Statistic</title>
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
                <h2 class="white">Match That Number Arithmetic Edition Statistic</h2>                    
            </header> 

            <main class="greentopline">
                <h4>Check out how well you performed below!</h4>
         <?php 
         //display the values of the stats in a table format, check alphabetQuizLetterStats.php for more detailed comments
         echo "<table>";
         echo "<thead><tr>";
         foreach ($eventTypes as $eventType) {
             echo "<th>" . htmlspecialchars($eventType) . "</th>";
         }
         echo "<th>Match Ratio</th>";
         echo "</tr></thead>";
         echo "<tbody><tr>";
         foreach ($latestValues as $value) {
             echo "<td>" . htmlspecialchars($value) . "</td>";
         }
         //Handle division by zero when incorrect matches are 0
         if ($latestValues['Incorrect Matches Made'] == 0) {
            
            if ($latestValues['Correct Matches Made'] > 0) {
                $mainRatio = "Perfect game!";
            } else {
                $mainRatio = "No matches made";
            }
        } else {
            $ratio = $latestValues['Correct Matches Made'] / $latestValues['Incorrect Matches Made'];
            $mainRatio = number_format($ratio, 2, '.', '');
        }
        echo "<td>" . htmlspecialchars($mainRatio) . "</td>";
         echo "</tr></tbody>";
         echo "</table>";
        
        
        ?>
            </main>   

            <h3><a href="matchThatNumberArithmeticEdition.html">Return to game</a></h3>
    
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
