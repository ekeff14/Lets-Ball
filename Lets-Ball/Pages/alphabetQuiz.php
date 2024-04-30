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
    <title>Alphabet Quiz Series</title>
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
          
  <h1 class="blue">
      Alphabet Quiz Series
  </h1>
      
      </header>
 
      <main>
       <h2 class="white greentopline">
          Welcome to our Alphabet Quiz series, From single letters to entire sentences, our Alphabet Quiz games are here to guide you through the wonders of the alphabet. Learn letters, spell words, and build sentences in a colorful, engaging way.
      </h2>

      <div class="gamebox">
        <div class="minitopline1">
        <a href="alphabetQuizNormalEdition.html"><img src="../CSS/Images/letter.webp" id="minigameimg1" alt="Play Letter Edition"></a>
        <p class="normaltext">In the Letter Edition, embark on a journey through the alphabet. This game introduces young learners to each letter, helping them to recognize and differentiate between various characters. children develop a foundational understanding of the alphabet, setting the stage for future reading and writing skills. It's perfect for little explorers who are just starting to discover the world of letters.</p>
        </div>
        
        <div class="minitopline2">
        <a href="alphabetQuizWordsEdition.html"><img src="../CSS/Images/word.webp" id="minigameimg2" alt="Play Word Edition"></a>
        <p class="normaltext">The Word Edition takes children on an adventure into the realm of word formation. By combining letters, kids craft words, enhancing their vocabulary and spelling abilities. This interactive experience not only strengthens their understanding of language but also boosts their confidence in word recognition. It's an ideal playground for young minds eager to learn new words and express themselves creatively.</p>
        </div>
        
        <div class="minitopline3">
        <a href="alphabetQuizSentenceEdition.html"><img src="../CSS/Images/sentence.webp" id="minigameimg3" alt="Play Sentence Edition"></a>
        <p class="normaltext">In the Sentence Edition, young players dive deeper into the structure of language by constructing sentences. This game challenges them to arrange words in the correct order, promoting grammar and syntax comprehension. Through playful scenarios and interactive storytelling, children learn how sentences are formed, gaining valuable insights into communication. This edition is perfect for kids ready to take their language skills to the next level, preparing them for more complex reading and writing tasks.</p>        
        </div>
        </div>

        <div class="Top">
                <h3><a href="#top">Top of Page</a></h3>
                </div>

        <footer class="greentopline">
            <div class="outlined-text">
            <div class="social-media">
            <a href="https://www.linkedin.com/in/jeffrey-asiana" target="_blank">
                            <img src="../CSS/Images/linkedln.jpg" id="socimg1" alt="Linkedln"> Linkedln
                        </a>                                    
            </div>
        </div>
        </footer>

</div>
</div>
</body>
</html>


