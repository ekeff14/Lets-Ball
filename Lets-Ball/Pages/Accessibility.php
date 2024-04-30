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

<!doctype html>

    <html>

    <head>
        <meta charset="utf-8">
      <title>Accessibility</title>
      <meta name="author" content="Accessibility">
      <link rel="stylesheet" href="../CSS/Diss.css">

        </head>


        <body>
            <div class="accbody">
            <div class="responsive">

        <div class="responsive semi-transparent-background outlined-text normaltext">
            
            <div class="Mainlogo" aria-label="Home">
            <a href="Index.php"><img src="../CSS/Images/logo.png" alt="Homepage"></a>
            </div>
                <header>
                    <h1 class="white">Accessibility Issues</h1>

                    <nav>
                        <div class="bar">
                            <ul class="outlined-text">
                            <li><a href="Index.php">Homepage</a></li>
                            <li> <a href="gamesPage.php">Games</a></li>
                            <li> <a href="contactUs.php">Contacts</a></li>
                            <li> <a href="logout.php">Log Out</a></li>
                            </ul>
                        </div>
                    </nav>                
                </header>
            
                <div class="topline">
                        <h3>We are committed to ensuring digital accessibility for people with disabilities. 
                        We are continually improving the user experience for everyone and applying the relevant accessibility standards. 
                        Our goal is to permit adaptive access to our website by enabling the adjustment of the user interface and design
                        to individual needs, whether it be for those who require screen readers, captioning, alternative text, 
                        or other assistive technologies. We believe in making our website easy to navigate and interact with, 
                        so that all visitors can gather information, explore our offerings, and enjoy our site without facing barriers.
                        <br> Do not hesitate to give us feedback on any missing accessibility features you may need in our form or with any other contact information on the <a href="contactus.php">contactUs</a> page.</h3>
                </div>             

                <div class="tips2">
                        <h3 class="red">Accessibility Features</h3>
                    <ul>
                        <li>Alternative Text For Images</li>
                        <li>Keyboard Navigation</li>
                        <li>Appropriate Contrast and Colors</li>
                        <li>Screen Readers</li>
                        <li>Responsive Pages</li>                        
                    </ul>
                    </div>

                  
                       <h2 class="greentopline">
                            <p>In this website we have given guidelines to access screen reader in your laptop and mobile phone:</p>
                       </h2>
                      
                      <div>
                        <table>
        
         <tr>
            <td width="20%">&nbsp;</td>
             <td width="20%"><strong>Laptop(windows)</strong></td>
             <td width="20%"><strong>Laptop(MacOS)</strong></td>
             <td width="20%"><strong>Mobile Phone/Ipads(IOS)</strong></td>
             <td width="20%"><strong>Mobile Phone/Tablets(Android)</strong></td>
            </tr>  
            
            <tr>
            <td><strong>Step 1</strong></td>
                <td>Tap the windows and search "Narrator"</td>
                <td>Press Command+F5, this turns on voice over on your Mac(narrator)</td>
                <td>Go ahead to open the website on your prefered browser and select the page to be read.</td>
                <td>Open device settings app google then open manage your Google Account, at the top of the screen tap Personal info.</td>
            </tr>
            <tr>
                <td><strong>Step 2</strong></td>
                <td>You should see the the narrator tab on your screen, at the bottom right click "ok"</td>
                <td>The voice over should acknowledge that it is now active.</td>
                <td>You can open settings and swipe down to search the voice over but that makes it complicated to return to the            website, instead use the "Hey Siri" method and ask for voice over to be turned on while stil on the browser             and when Siri acknowledges voice over is active, tap on your screen to return to the website.</td>
                <td>In "General preferences for the web" tap Accessibility and turn Screen reader on.</td>
            </tr>
            <tr>
                <td><strong>Step 3</strong></td>
                <td>Now Narrator is turned on, next open the website page on the browser and the narrator should start reading from         the top to bottom and would acknowledge when complete</td>
                <td>Return to the website on the browser you opened it on and it should start reading from the top of the page to the       end.</td>
                <td>In this case voice over will only read what you tap to tap the sentence or paragraph to be read and voice over          will repeat it after you tap on it.</td>
                <td>Then go back to the broswer where you have opended the website and it should start reading from the beginning or the sentence you tap.</td>
            </tr>
            <tr>
                <td><strong>De-activation</strong></td>
                <td>Tap the windows button and search settings, search narrator in the settings and click on the button to turn off.</td>
                <td>Repeat step 1(Pressing Command+F5 toggles voice over.).</td>
                <td>Use the "Hey Siri" method and ask for voice over to be turned off.</td>
                <td>Return to the "General preferences for the web" and turn off screen reader.</td>
            </tr>  
            
        </table>  
            </div>
                      
            <div class="Top">
                <h3><a href="#top">Top of Page</a></h3>
                </div>

                <footer class="topline">
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
            </div>
        </body>


    </html>