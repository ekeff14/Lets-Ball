<?php
// Start the session to track user state
session_start();

// Include the 'end_session.php' to handle session expiration and parental control timer feature
include 'end_session.php';
$userId = $_SESSION['userId']; // get user's ID to identify the current user
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database"); // confirm database connection
        $remainingTime = getRemainingSessionTime($userId, $conn); // Get remaining session time
    
        // Check if time is left in the session
        if ($remainingTime !== null && $remainingTime > 0) {
            $_SESSION['start_time'] = time(); //If time is left set session start time to the current time
            $_SESSION['expire_time'] = $_SESSION['start_time'] + $remainingTime;//Calculate and set the session expiry time based on the remaining time
        }else{
            checkSession();  //check the current session status if time has finished and logs the user out
        }

//If the username is not set in the session redirect to login page
if (!isset($_SESSION["username"])) {    
    header("Location: login.php");
    exit; //Terminate script
}

//get username
$username = $_SESSION["username"];

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
        
        <div class="responsive semi-transparent-background outlined-text">
                                            
        <header>        
            <img src="../Images/logo.png" alt="Logo">

            <?php echo "<h1 class='outlined-text' style='color: white;'>Hey ".$username." LET'S BALL!</h1>"; ?>            

    <nav>
        <div class="bar">
            <ul class="outlined-text">
            <li><a href="gamesPage.php">Games</a></li>
            <li> <a href="contactUs.php">Contacts</a></li>
            <li> <a href="Accessibility.php">Accessibility</a></li>
            <li> <a href="logout.php">Log Out</a></li>
            </ul>
        </div>
    </nav>                                       
            
            </header>
                        
        
    <main>
                <p class="topline">

                <div class="herosection" >
                <h3 class="red">🌈 Welcome to Our World of Fun and Learning! 🌟</h3>

                <div class="normaltext">
🚀 Welcome to a magical place where fun meets learning, and every click leads to a new discovery. Our website is designed with love for kids like you, aged 3 to 8, who are curious, imaginative, and eager to explore.<br>

Here, you'll find a treasure trove of games that will take you on exciting journeys across the alphabet, numbers, and much more. Whether you're mastering your ABCs, counting stars, guessing secret numbers, or matching magical digits, there's a challenge waiting just for you.<br>

But that's not all! Our games are like hidden gems that sparkle with fun but are also crafted to help you grow smarter every day. As you play, you'll become a champion of letters, a wizard of numbers, and a hero of words, all while having the time of your life.<br>

So, are you ready to step into a world where learning feels like play, and every game is an adventure? Let's dive in and discover all the fun and learning that awaits you!

Remember, every great journey starts with a single click. Let's make it count! 💫<br>

<h3>Hey guardian, do you want to control your child's screen time on the site?
if so click on here to access the <a href="Parental_Control.php">Parental Control</a> page. Your welcome😉.</h3>
</div>
                </div>
        </p>  

            <div class="tips normaltext">
            <h3 class="red">Some useful tips for You</h3>
            <ul>
                <li>Click the logo to return to the home page</li>
                <li>Press the 'tab' button to navigate with keyboard</li>
                <li>Click '^' to return to the top of a page where available.</li>
                <li>Game recommendations are provided for you in the games page. </li>
            </ul>
        </div>
        
        <div class="Top">
                <h3><a href="#top">Top of Page</a></h3>
                </div>
              
    </main>

        <footer class="topline">        
        <div class="social-media">
        <a href="https://www.linkedin.com/in/jeffrey-asiana" target="_blank">
                            <img src="../Images/linkedln.jpg" id="socimg1" alt="Linkedln"> Linkedln
                        </a>                                    
        </div>    
    </footer>                 
        </div>
        
    </body>
    
</html>
        

    
    