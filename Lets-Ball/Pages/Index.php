<?php
// Make sure session_start() is called at the beginning of the end_session.php file or here before any session variable is accessed
session_start();

//for logoun feature
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

<!doctype html>

<html>

    <head>
  <meta charset="utf-8">
  <title>Homepage</title>
  <meta name="author" content="Children online games">
  <link rel="stylesheet" href="../CSS/Diss.css">
</head>
    
    
    <body>
        
        <div id="Top"></div>
        
        <div class="responsive">
                                            
        <header>
            <div class="semi-transparent-background">
        
            <img src="../CSS/Images/logo.png" alt="Logo">
                
            <?php echo "<h1 class='outlined-text' style='color: white;'>Hey ".$username." LET'S BALL!</h1>"; ?>            

    <nav>
        <div class="bar">
            <ul class="outlined-text">
            <li> <a href="Parental_Control.php">Parental Control</a></li>
            <li><a href="Sample Game.php">Games</a></li>
            <li> <a href="contactus.php">Contacts</a></li>
            <li> <a href="Accessibility.php">Accessibility</a></li>
            <li> <a href="logout.php">Log Out</a></li>
            </ul>
        </div>
    </nav>                                   

    </div>
            
            </header>

            <div class="semi-transparent-background">
            <div class="outlined-text">
        
    <main>
                <p class="topline">

                <div class="herosection" >
                <h3 class="red">🌈 Welcome to Our World of Fun and Learning! 🌟</h3>

                <div class="normaltext">
🚀 Welcome to a magical place where fun meets learning, and every click leads to a new discovery. Our website is designed with love for kids like you, aged 3 to 8, who are curious, imaginative, and eager to explore.<br>

Here, you'll find a treasure trove of games that will take you on exciting journeys across the alphabet, numbers, and much more. Whether you're mastering your ABCs, counting stars, guessing secret numbers, or matching magical digits, there's a challenge waiting just for you.<br>

But that's not all! Our games are like hidden gems that sparkle with fun but are also crafted to help you grow smarter every day. As you play, you'll become a champion of letters, a wizard of numbers, and a hero of words, all while having the time of your life.<br>

So, are you ready to step into a world where learning feels like play, and every game is an adventure? Let's dive in and discover all the fun and learning that awaits you!

Remember, every great journey starts with a single click. Let's make it count! 💫
</div>
                </div>
        </p>  

                            <div class="tips">
            <h3 class="red">Some useful tips for You</h3>
            <div class="normaltext">
            <ul>
                <li>Click the logo to return to the home page</li>
                <li>Put game Recommendations here</li>
                <li>Press the 'tab' button to navigate with keyboard</li>
                <li>Click '^' to return to the top of a page</li>
            </ul>
            </div>
        </div>
        
              
    </main>

        <footer class="topline">
        <div class="outlined-text">
        <div class="social-media">
            <a href="https://www.snapchat.com/add/yourusername" target="_blank">
                <img src="../CSS/Images/snap.jpg" id="socimg1" alt="Snapchat"> @JAE367
            </a><br>
            <a href="https://www.instagram.com/yourusername" target="_blank">
                <img src="../CSS/Images/ig.jpg" id="socimg2" alt="Instagram"> @JEA367
            </a><br>
        </div>
    </div>
    </footer>
        
    </div>
            </div>
        </div>
        
    </body>
    
</html>
        

    
    