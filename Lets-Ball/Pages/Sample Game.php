<?php
// Make sure session_start() is called at the beginning of the end_session.php file or here before any session variable is accessed
session_start();

include 'end_session.php';

// Now, run the checkSession to manage session validity
checkSession();

// After checking session, you can safely access session variables
if (!isset($_SESSION["username"])) {
    // If username not set in the session, redirect to login page
    header("Location: login.php");
    exit; // Don't forget to exit after header redirects to stop script execution
}

// If the script continues past this point, it means the user is logged in and the session is valid
$username = $_SESSION["username"];

// Your authenticated user's logic here

?>



<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Games</title>
    <link rel="stylesheet" href="../CSS/Diss.css">
</head>
<body>

    <div class="semi-transparent-background">
        <div class="outlined-text">

  <div id="Top"></div>
  <div class="responsive">    
          
  
      <header>
      
        <div class="Mainlogo" aria-label="Home">
        <a href="Index.php"><img src="../CSS/Images/logo.png" alt="Homepage"></a>
        </div>
          
  <h1 class="white">
      Let's Play!
  </h1>

  <nav>
    <div class="bar">
        <ul class="outlined-text">
        <li> <a href="Parental_Control.php">Parental Control</a></li>
        <li><a href="Index.php">Homepage</a></li>
        <li> <a href="contactus.php">Contacts</a></li>
        <li> <a href="Accessibility.php">Accessibility</a></li>
        <li> <a href="logout.php">Log Out</a></li>
        </ul>
    </div>
</nav>
      
      </header>
 
      <main>
       <h3 class="topline">
        Welcome to our colorful world of learning and fun! Our website is a magical playground where kids aged 3 to 8 can explore, learn, and let their imaginations soar. We offer a variety of interactive games designed to engage young minds and support their early development.
        Each game is a doorway to a new adventure, filled with challenges that are just right for your age. Our friendly guides and vibrant graphics make learning exciting and accessible. So, what are you waiting for? Jump into the world of fun and learning where every click brings a new discovery!
      </h3>

      <div class="gamebox">
        <a href="Alphabet Quiz.php"><img src="../CSS/Images/playaq.png" id="gameimg1" alt="Play Alphabet Quiz!"></a>
        <p class="normaltext">Play the Alphabet Quiz Series: From single letters to entire sentences, our Alphabet Quiz games are here to guide you through the wonders of the alphabet. Learn letters, spell words, and build sentences in a colorful, engaging way.</p>
        
        <a href="Count that Number.php"><img src="../CSS/Images/playctn.png" id="gameimg2" alt="Play Count That Number!"></a>
        <p class="normaltext">Play the Count That Number Series: Embark on a numerical adventure where counting becomes a quest! From simple ascending orders to a mix of positive and negative numbers, these games enhance number recognition and basic arithmetic skills.</li></p>

        <a href="Guess that Number.php"><img src="../CSS/Images/playgtn.png" id="gameimg3" alt="Play Guess That Number!"></a>
        <p class="normaltext">Play the Guess That Number Series: Put on your thinking cap and guess numbers within given ranges. Whether it's positive numbers, a mix of positive and negative, or numbers within random ranges, it's a thrilling way to understand number values and ranges.</p>

        <a href="Match that Number.php"><img src="../CSS/Images/playmtn.png" id="gameimg1" alt="Play Guess That Number!"></a>
        <p class="normaltext">Play the Match That Number Series: Challenge your number matching skills by connecting digits to their word forms, or solve simple arithmetic problems to find the right answer. It's a fun way to boost memory and number sense!</p>
        </div>
        </main>

      <footer class="topline">
        <div class="outlined-text">
        <div class="social-media">
            <a href="https://www.snapchat.com/add/yourusername" target="_blank">
                <img src="../CSS/Images/snap.jpg" id="socimg1" alt="Snapchat"> @JAE367
            </a>
            <a href="https://www.instagram.com/yourusername" target="_blank">
                <img src="../CSS/Images/ig.jpg" id="socimg2" alt="Instagram"> @JEA367
            </a>
        </div>
    </div>
    </footer>

</div>
</div>
</body>
</html>


