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
  <title>Parental Control</title>
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
    
            <h1 class="white">Parental Control</h1>                    
            </header>
        
            <main>

                <h3 class="greentopline">Welcome guardians, here you can control how long you want your child to have access to the site.<br> Please type in the prefered duration which you want your child to have access to the site, and please note the minimum set time is an hour.</h3>

                
       <form action="set_limit.php" method="post" class="blueform">
            <label for="">Set Timer</label>
            <input type="number" id="allowedTime" name="allowedTime" min="1" required>
<br><br>
        <button type="submit" value="submit" name="submit">Submit</button><br>
       </form>


            
            </main>   
            
    
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
    
