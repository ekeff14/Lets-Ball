<?php
//Start or resume current session
session_start();
//Include end_session.php for parental control timer function
include 'end_session.php';
//calls check session function
checkSession();
//Checks if session has a stored username else redirect to login
if (!isset($_SESSION["username"])) {
    header("Location: login.php");
    exit;  //Terminate the script
}
$username = $_SESSION["username"];//Get username
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
        <li><a href="Index.php">Homepage</a></li>
        <li> <a href="contactUs.php">Contacts</a></li>
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

      <ol class="tips normaltext">
  <h3>Game Recommendations</h3>
  <li>Count that Number:
    <ul>
      <li>First Edition: Nursery (ages 3-4) to Year 1 (ages 5-6).</li>
      <li>Second Edition: Year 2 (ages 6-7) to Year 3 (ages 7-8).</li>
    </ul>
  </li>
  <li>Match that Number:
    <ul>
      <li>First Edition: Year 1 (ages 5-6) to Year 2 (ages 6-7).</li>
      <li>Arithmetic Edition: Not suitable for the target age range.</li>
    </ul>
  </li>
  <li>Alphabet Quiz:
    <ul>
      <li>First Edition: Nursery (ages 3-4) to Reception (ages 4-5).</li>
      <li>Word Edition: Year 1 (ages 5-6) to Year 2 (ages 6-7).</li>
      <li>Sentence Edition: Year 3 (ages 7-8).</li>
    </ul>
  </li>
  <li>Guess that Number:
    <ul>
      <li>First Edition: Reception (ages 4-5) to Year 2 (ages 6-7).</li>
      <li>Negative Edition: High difficulty(No age Recommendation).</li>
      <li>Random Edition: High difficulty(No age Recommendation).</li>
    </ul>
  </li>
</ol>



      <div class="gamebox">
        <a href="alphabetQuiz.php"><img src="../CSS/Images/playaq.png" id="gameimg3" alt="Play Alphabet Quiz!"></a>
        <p class="normaltext">Play the Alphabet Quiz Series: From single letters to entire sentences, our Alphabet Quiz games are here to guide you through the wonders of the alphabet. Learn letters, spell words, and build sentences in a colorful, engaging way.</p>
        
        <a href="countThatNumber.php"><img src="../CSS/Images/playctn.png" id="gameimg2" alt="Play Count That Number!"></a>
        <p class="normaltext">Play the Count That Number Series: Embark on a numerical adventure where counting becomes a quest! From simple ascending orders to a mix of positive and negative numbers, these games enhance number recognition and basic arithmetic skills.</li></p>

        <a href="guessThatNumber.php"><img src="../CSS/Images/playgtn.png" id="gameimg3" alt="Play Guess That Number!"></a>
        <p class="normaltext">Play the Guess That Number Series: Put on your thinking cap and guess numbers within given ranges. Whether it's positive numbers, a mix of positive and negative, or numbers within random ranges, it's a thrilling way to understand number values and ranges.</p>

        <a href="matchThatNumber.php"><img src="../CSS/Images/playmtn.png" id="gameimg1" alt="Play Guess That Number!"></a>
        <p class="normaltext">Play the Match That Number Series: Challenge your number matching skills by connecting digits to their word forms, or solve simple arithmetic problems to find the right answer. It's a fun way to boost memory and number sense!</p>
        </div>
        </main>

        <div class="Top">
                <h3><a href="#top">Top of Page</a></h3>
                </div>

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


