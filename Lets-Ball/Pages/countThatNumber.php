<?php
session_start();
// Include the 'end_session.php' to handle session expiration and parental control timer feature, check index page for more in dept comments
include 'end_session.php';
$userId = $_SESSION['userId'];
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");
        $remainingTime = getRemainingSessionTime($userId, $conn);
    
        if ($remainingTime !== null && $remainingTime > 0) {
            $_SESSION['start_time'] = time();
            $_SESSION['expire_time'] = $_SESSION['start_time'] + $remainingTime;
        }else{
            checkSession(); 
        }
//ends here
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Count That NUmber Series</title>
    <link rel="stylesheet" href="../CSS/Diss.css">
</head>
<body>

    <div class="semi-transparent-background">
        <div class="outlined-text">

  <div id="Top"></div>
  <div class="responsive">    
          
  
      <header>
      
        <div aria-label="Home">
        <a href="Index.php"><img src="../CSS/Images/logo.png" alt="Homepage"></a>
        </div>
          
  <h1 class="white">
      Count That Number Series
  </h1>
      
      </header>
 
      <main>
       <h2 class="white greentopline">
        Play the Count That Number Series: Embark on a numerical adventure where counting becomes a quest! From simple ascending orders to a mix of positive and negative numbers, these games enhance number recognition and basic arithmetic skills.
      </h2>

      <div class="gamebox">
        <div class="minitopline1">
        <a href="countThatNumberEasyEdition.html"><img src="../CSS/Images/" id="minigameimg1" alt="Play First Edition"></a>
        <p class="normaltext">In this beginner-friendly version, players are presented with a series of positive numbers displayed in a random, unsorted manner. The objective is simple yet engaging: click on the numbers in ascending order as quickly as possible. With a 30-second time limit, players are encouraged to recognize number sequences and enhance their counting skills. It's an exciting race against time that helps reinforce basic numeracy and fosters quick thinking.</p>
        </div>

        <div class="minitopline2">
        <a href="countThatNumberMediumEdition.html"><img src="../CSS/Images/" id="minigameimg2" alt="Play Second Edition"></a>
        <p class="normaltext">Taking the challenge up a notch, this edition combines both positive and negative numbers, asking players to sort them in ascending order. With the same 30-second time frame, the inclusion of negative numbers introduces the concept of value order beyond zero, providing a gentle introduction to more complex arithmetic. It's perfect for kids who have mastered basic counting and are ready to explore a little more of the number line.</p>
        </div>
        </div>

        <div class="Top">
                <h3><a href="#top">Top of Page</a></h3>
                </div>

        <footer class="greentopline">
            <div class="outlined-text">
            <div class="social-media">
                <a href="https://www.snapchat.com/add/yourusername" target="_blank">
                    <img src="../CSS/Images/snap.jpg" id="socimg1" alt="Snapchat"> @JAE367
                </a>
                <a href="https://www.instagram.com/yourusername" target="_blank">
                    <img src="../CSS/Images/ig.jpg" id="socimg3" alt="Instagram"> @JEA367
                </a>
            </div>
        </div>
        </footer>

</div>
</div>
</body>
</html>


