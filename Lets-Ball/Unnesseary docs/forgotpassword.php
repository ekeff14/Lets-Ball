<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <link rel="stylesheet" href="../CSS/work.css">
</head>
<body>
    <div class="semi-transparent-background">
        <div class="outlined-text">

    <header>
        <img src="../CSS/Images/logo.png" alt="Site Logo">
        <h1>Forgot your password?</h1>
    </header>
    <div class="login-container">
        
        <h3 class="loginIntro">
            Did you forget your password again? don't worry we can solve that for you easily, all we need is your email and you are back in.
        </h3>
        <form action="" method="POST">

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <button type="submit" name = "submit">Send Link</button>
        </form>
        <p class="login-link">Remembered your password? <a href="login.php">Log In</a></p>
        <p class="login-link">Want more help logging in? <a href="apaz.html ">Contact Us!</a></p>
    </div>
    </div>
    </div>

    <footer class="semi-transparent-background">
        <div class="outlined-text">
        <div class="social-media">
            <a href="https://www.snapchat.com/add/yourusername" target="_blank">
                <img src="../CSS/Images/snap.jpg" alt="Snapchat"> @JAE367
            </a>
            <a href="https://www.instagram.com/yourusername" target="_blank">
                <img src="../CSS/Images/ig.jpg" alt="Instagram"> @JEA367
            </a>
        </div>
    </div>
    </footer>
</div>
</div>
</body>
</html>

<?php
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");
if(isset($_POST['submit'])){
    $email = $_POST['email'];
    $to = $email;
    $subject = 'Reset Password';
    $message = '<a href = "http://localhost/Dissertation/pages/passwordreset.php"'.$email.' >Reset Password Link</a>';
    $headers = 'MIME-Version: 1:0'. "\r\n";
    $headers .= 'Content-type:text/html:charset=UTF-8' . "\r\n";
    $headers .= 'From: <letsball@gmail.com' . "\r\n";

$sql = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result);
        if($row){
           if(mail($to, $subject, $message, $headers)){
            echo "<script>alert('Reset Link Sent Successfully')</script>";
               }
               else{
                echo "<script>alert('Error sending Email Link')</script>";
               }
        }else{
            echo "<script>alert('Email Address does not exist')</script>";
        }


}


?>
