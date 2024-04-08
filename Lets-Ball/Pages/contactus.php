<?php
session_start();
//for parental control logout feature
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

<!doctype html>

<html>

<head>
<meta charset="utf-8">
  <title>Contact Us</title>
  <meta name="author" content="Contact Us">
  <link rel="stylesheet" href="../CSS/Diss.css">
    
    </head>
    
    <body>
                <div class="responsive semi-transparent-background outlined-text normaltext">
            
                    <a href="Index.php"><img src="../CSS/Images/logo.png" alt="Homepage"></a>
            
            
            <header>
    
            <h1 class="white">Contact Me</h1>

            <nav>
                <div class="bar">
                    <ul class="outlined-text">
                    <li><a href="Index.php">Homepage</a></li>
                    <li> <a href="gamesPage.php">Games</a></li>
                    <li> <a href="Accessibility.php">Accessibility</a></li>
                    <li> <a href="logout.php">Log Out</a></li>
                    </ul>
                </div>
            </nav>
        
            </header>
            <main>         
                <section class="topline">
                    <h2>Get in Touch</h2>
                    <p>For any inquiries, please reach out to us through one of the following methods:</p>

                        <h2>Email</h2>
                        <p class="white">jackjeff367@gmail.com</p>
                    
                        <h2>Phone</h2>
                        <p>+447494042108</p>
                    
                        <h2>Mail</h2>
                        <p>14 JEA Street,<br>PH City, PH 367</p>                    
                </section>

                <section class="form">
  <h2>Send me a message</h2>
  <form action="https://www.dcs.shef.ac.uk/cgi-intranet/public/FormMail.php" method="POST">
    <input type="hidden" name="recipients" value="jeasiana1@sheffield.ac.uk">

    <label for="name">Name:</label><br>
    <input type="text" id="name" name="realname" required><br>

    <label for="myemail">Email:</label><br>
    <input type="email" name="myemail" id="myemail" placeholder="name@something.com" maxlength="100" size="25" required="required"><br>

    <label for="message">Message:</label><br>
    <textarea id="message" name="comments" required></textarea><br>

    <button type="submit" name="submit" value="Queries">Send</button>

  </form>
</section>


                <div class="Top">
                <h3><a href="#top">Top of Page</a></h3>
                </div>

            </main>
         
           
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
    </body>

</html>