<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../CSS/Diss.css">
    <style>
        body {
            /* Set the background image */
            background-image: url('../CSS/Images/logo.png');
            
            /* Make the background image cover the entire page */
            background-size: cover;
            
            /* Set the background image to no-repeat */
            background-repeat: repeat;
            
            /* Fix the background image to the viewport */
            background-attachment:fixed;
        }
    </style>
</head>
<body>
    <div class="outlined-text">

    <header>
        <div class="semi-transparent-background">
        <img src="../CSS/Images/logo.png" alt="Site Logo">
        <h1 class="white">Lets Log In!</h1>
    </div>
    </header>

    <div class="semi-transparent-background">
    <div class="login-container">
        
        <h3 class="white">Welcome to Let's Ball! 🎈

            Dive into a world of fun and games! Log in below to join the adventure.
            
            Happy gaming! 🎉
        </h3>
        <form action = "" method = "POST">
            <div class="boxed">
            <label for="Email">Email:</label><br>
            <input type="text" id="Email" name="email" required><br>

            <label for="password">Password:</label><br>
            <input type="password" id="password" name="password" required><br>

            <button type="submit" name = "submit">Login</button><br>
        </form>
        <p class="signup-link">Don't have an account? <a href="signup.php">Sign Up</a></p>
        <!--<p class="forgot-password-link"><a href="forgotpassword.php">Forgot Password?</a></p>-->
    </div>
    </div>

    <footer>
        <div class="outlined-text">
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
</body>
</html>

<?php
session_start();
include 'end_session.php';
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");
if(isset($_POST['submit'])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);


    if ($row) {
        session_start(); // Ensure session is started
        $_SESSION['id'] = session_id();
        $_SESSION['username'] = $row['firstname'];
        $_SESSION['userId'] = $row['id'];
        $userId = $_SESSION['userId'];
        $remainingTime = getRemainingSessionTime($userId, $conn);
    
        if ($remainingTime !== null && $remainingTime > 0) {
            $_SESSION['start_time'] = time();
            $_SESSION['expire_time'] = $_SESSION['start_time'] + $remainingTime;
            
            // Use session or a client-side script for success message
            header("Location: index.php");
            exit;
        } else {
            // Consider what should happen if no remaining time or login is fresh
            // This might include setting up a new session start/expiry
            checkSession(); 
            header("Location: index.php"); // Adjust as needed
            exit;
        }
    } else {
        echo "<script>alert('Invalid Email or Password');</script>";
        // Make sure this script block doesn't immediately follow with a PHP header redirect
    }
    


    // if($row){
    //     $_SESSION['id'] = session_id();
    //     $_SESSION['username'] = $row['firstname'];
    //     $_SESSION['userId'] = $row['id'];
    //     $userId = $_SESSION['userId'];
    //     $remainingTime = getRemainingSessionTime($userId, $conn);
    //     if($remainingTime !== null){
    //         if($remainingTime > 0){
    //             $_SESSION['start_time'] = time();
    //             $_SESSION['expire_time'] = $_SESSION['start_time'] + $remainingTime;
    //             echo "<script>alert('Login Successful')</script>";
    //             header("location: index.php");
    //         }else{
    //     checkSession();       
    //     $_SESSION['id'] = session_id();
    //     $_SESSION['username'] = $row['firstname'];
    //     $_SESSION['userId'] = $row['id'];
    //     echo "<script>alert('Login Successful')</script>";
    //     header("location: index.php");
    //         }
    //     }
    // }else{
    //     echo "<script>alert('Invalid Email or Password ')</script>";
    // }


    
}

?>
