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
    <title>Guess That Number Series</title>
    <link rel="stylesheet" href="../CSS/Diss.css">
</head>
<body>

    <div class="semi-transparent-background">
        <div class="outlined-text">

  <div id="Top"></div>
  <div class="responsive">    
          
  
      <header>
      
        <div aria-label="Home">
        <a href="Index.php"><img src="../Images/logo.png" alt="Homepage"></a>
        </div>
          
  <h1 class="white">
    Guess That Number Series
  </h1>
      
      </header>
 
      <main>
       <h2 class="white greentopline">
        Play the Guess That Number Series: Put on your thinking cap and guess numbers within given ranges. Whether it's positive numbers, a mix of positive and negative, or numbers within random ranges, it's a thrilling way to understand number values and ranges.
      </h2>

      <div class="gamebox">
        <div class="minitopline1">
        <a href="guessThatNumberNormalEdition.html"><img src="../Images/firstGTN.webp" id="minigameimg1" alt="Play First Edition"></a>
        <p class="normaltext">In this classic guessing game, players are prompted to guess a number between 1 and 50. With each guess, they receive hints to guide them closer to the correct number. It's an engaging way to help children understand the concept of higher or lower values and refine their number sense. The First Edition is perfect for developing critical thinking and problem-solving skills in a fun, interactive way.</p>
        </div> 
        
        <div class="minitopline2">
        <a href="guessThatNumberNegativeEdition.html"><img src="../Images/negativeGTN.webp" id="minigameimg2" alt="Play Negative Edition"></a>
        <p class="normaltext">Expanding the number range to include both negative and positive values, the Negative Edition of Guess That Number challenges players to guess a number between -25 and 25. This twist introduces children to the concept of negative numbers while still providing the fun of the guessing game format. It's a great way to make the abstract concept of negative values concrete and approachable for young learners.</p>
        </div>
        
        <div class="minitopline3">
        <a href="guessThatNumberRandomEdition.html"><img src="../Images/randomGTN.webp" id="minigameimg3" alt="Play Random Edition"></a>
        <p class="normaltext">The Random Edition turns up the excitement by setting the guessing range between two random values, offering an unpredictable and stimulating challenge. Players must use logic and an understanding of number ranges to zero in on the correct number. This edition is ideal for children who enjoy surprises and are ready to apply their number knowledge to a wider and more varied scale.</p>        
        </div>
        </div>

        <div class="Top">
                <h3><a href="#top">Top of Page</a></h3>
                </div>

        <footer class="greentopline">
            <div class="outlined-text">
            <div class="social-media">
            <a href="https://www.linkedin.com/in/jeffrey-asiana" target="_blank">
                            <img src="../Images/linkedln.jpg" id="socimg1" alt="Linkedln"> Linkedln
                        </a>                                    
            </div>
        </div>
        </footer>

</div>
</div>
</body>
</html>


