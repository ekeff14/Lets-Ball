<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signup</title>
    <link rel="stylesheet" href="../CSS/Diss.css">
    <style>
        body {
            background-image: url('../CSS/Images/logo.png');
            
            background-size: cover;
            
            background-repeat: repeat;
            
            background-attachment:fixed;
        }
    </style>
</head>
<body>
    <div class="semi-transparent-background">
    <div class="outlined-text">

    <header>
        <img src="../CSS/Images/logo.png" alt="Site Logo">
        <h1 class="white">Lets Sign Up!</h1>
    </header>
    <div class="login-container">
        
        <h3 class="loginIntro">Hey there, future gamer! Ready to embark on an exciting adventure where fun and learning go hand in hand? Sign up now and join our vibrant community of young explorers. Create your own world, make new friends, and discover endless possibilities. 🚀

            Join us today and let the games begin! 🎮 
            
        </h3>

        <div class="boxed">
        <form action="" method="POST">
                <label for="firstname">First Name:</label><br>
                <input type="text" id="firstname" name="firstname" required><br>
    
                <label for="lastname">Last Name:</label><br>
                <input type="text" id="lastname" name="lastname" required><br>

                <label for="grade">Grade:</label><br>
                <input type="text" id="grade" name="grade" required><br>

                <label for="dob">Date of Birth:</label><br>
                <input type="date" id="dob" name="dob" required><br>

                <label for="email">Email:</label><br>
                <input type="email" id="email" name="email" required><br>
    
                <label for="password">Password:</label><br>
                <input type="password" id="password" name="password" required><br>
    
                <label for="confirm-password">Confirm Password:</label><br>
                <input type="password" id="confirm-password" name="confirm-password" required><br>
    
                <button type="submit" name = "submit">Sign Up</button>

                <!--<input type="submit" name="submit" value="Submit"><br>-->
        </form>
        <p class="login-link">Already have an account? <a href="login.php">Log In</a></p>
    </div>
    </div>

    <footer>
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
</body>
</html>

<?php
$conn = mysqli_connect("127.0.0.1:8111","root","","lets_ball_database");


if(isset($_POST['submit'])){
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $grade = $_POST['grade'];
        $dob = $_POST['dob'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $checkEmail = "SELECT * FROM users WHERE email = '$email'";
        $checkQuery = mysqli_query($conn, $checkEmail);
        $checkResult = mysqli_fetch_array($checkQuery);
        if($checkResult){
           echo "<script>alert('Email Address Already Exists')</script>";                 

        }else{
            $sql = "INSERT INTO users (firstname, lastname, grade, dob, email, password) values ('$firstname','$lastname','$grade','$dob','$email','$password')";
            $result = mysqli_query($conn, $sql);
            if($result){
                echo "<script>alert('Inserted Successfully')</script>";
            }else{
                echo "<script>alert('error')</script>";
            }
        } 



    

}



?>