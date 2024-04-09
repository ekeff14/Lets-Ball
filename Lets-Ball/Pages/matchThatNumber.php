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
    <title>Match That Number Series</title>
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
    Match That Number Series
  </h1>
      
      </header>
 
      <main>
       <h2 class="white greentopline">
        Play the Match That Number Series: Challenge your number matching skills by connecting digits to their word forms, or solve simple arithmetic problems to find the right answer. It's a fun way to boost memory and number sense!
      </h2>

      <div class="gamebox">
        <div class="minitopline1">
        <a href="matchThatNumberNormalEdition.html"><img src="../CSS/Images/" id="minigameimg1" alt="Play First Edition"></a>
        <p class="normaltext">Dive into a world where digits and words collide! The First Edition of Match That Number is a delightful game where players match numbers written in digits with their corresponding word forms. For example, finding the pair for "4" and "Four." It's a fantastic tool for children to reinforce their understanding of numbers and enhance their vocabulary. The game is simple, engaging, and perfectly suited for young learners who are just getting comfortable with numbers.</p>
        </div>
        
        <div class="minitopline2">
        <a href="matchThatNumberArithmeticEdition.html"><img src="../CSS/Images/" id="minigameimg2" alt="Play arithmetic Edition"></a>
        <p class="normaltext">Take your number matching to the next level with the Arithmetic Edition of Match That Number! In this game, players are presented with simple arithmetic problems written in words, and they must select the digit that represents the correct answer. Whether it's "Five plus three" or "Ten minus seven," this game challenges kids to practice their basic math skills while having fun. It's a great way for children to combine their reading and math abilities in a vibrant, interactive setting.</p>
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


