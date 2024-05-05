<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../CSS/Diss.css">
    <style>
        /*specific css*/
        body {
            /* Set the background image */
            background-image: url('../Images/loginimg.jpg');
            
            /* Make the background image cover the entire page */
            background-size: cover;
            
            /* Set the background image */
            background-repeat: repeat;
            
            /* Fix the background image to the viewport */
            background-attachment:fixed;
        }
    </style>
</head>
<body>
    <div class="outlined-text semi-transparent-background">

    <header>        
        <img src="../Images/logo.png" alt="Site Logo">
        <h1 class="white">Lets Log In!</h1>    
    </header>
    
    <div class="login-container">        
        <h3 class="white">Welcome to Let's Ball! 🎈
            Dive into a world of fun and games! Log in below to join the adventure.            
            Happy gaming! 🎉
        </h3>
        <div class="boxed">
        <form action = "" method = "POST">            
            <label for="Email">Email:</label><br>
            <input type="text" id="Email" name="email" required><br>

            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" required><br>

            <button type="submit" name = "submit">Login</button><br>
        </form>
        <p class="signup-link">Don't have an account? <a href="signup.php">Sign Up</a></p>     
        </div>   
    </div>    

    <footer>
        <div class="outlined-text">
        <div class="social-media">
        <a href="https://www.linkedin.com/in/jeffrey-asiana" target="_blank">
                            <img src="../Images/linkedln.jpg" id="socimg1" alt="Linkedln"> Linkedln
                        </a>                                    
        </div>
    </div>
    </footer>
</div>
</body>
</html>

<?php
session_start(); // Start or resume the current session
include 'end_session.php'; // Include the script that handles session timeout
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database"); // Connect to the database

// Confirms login form submition
if(isset($_POST['submit'])){ 
    // gets submitted email and password
    $email = $_POST['email'];
    $password = $_POST['password'];

    // SQL query to selectdetails from 'users' table
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);

// Confirms user was found
    if ($row) {
        session_start(); // Ensure session is started

        //Set logged-in user session variables 
        $_SESSION['id'] = session_id();
        $_SESSION['username'] = $row['firstname'];
        $_SESSION['userId'] = $row['id'];

        // finds user's ID and checks remaining session time
        $userId = $_SESSION['userId'];
        $remainingTime = getRemainingSessionTime($userId, $conn);
    
        // Checks for remaining session time
        if ($remainingTime !== null && $remainingTime > 0) {
            $_SESSION['start_time'] = time();
            $_SESSION['expire_time'] = $_SESSION['start_time'] + $remainingTime;
            
            // Redirect to the index page
            header("Location: index.php");
            exit; //terminate the execution of the script
        } else {                        
            checkSession();  //check and handle session if login fails
            header("Location: index.php"); 
            exit;
        }
        // if user details are incorrect
    } else {
        echo "<script>alert('Invalid Email or Password');</script>";        
    }    
}

?>
