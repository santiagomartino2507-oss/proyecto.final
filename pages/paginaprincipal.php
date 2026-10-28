<?php // Server-side PHP.
session_start(); // Start or resume the session.
/* Continue with HTML. */ ?>
<!DOCTYPE html> <!-- HTML5 standards mode. -->
<html lang="en"> <!-- Initial language: English. -->

<head> <!-- Page settings and resources. -->
    <meta charset="UTF-8"> <!-- Text encoding for accents and symbols. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Device width; normal initial zoom. -->
    <title>Pitch Point</title> <!-- Browser tab title. -->
    <link rel="stylesheet" href="/proyecto.html/assets/css/style.css"> <!-- Load the shared CSS. -->
</head> <!-- End page settings. -->

<body> <!-- Visible page content. -->
    <header> <!-- Logo, navigation and account options. -->
        <div class="logo"> <!-- Group the ball image and site name. -->
            <img src="https://static.vecteezy.com/system/resources/thumbnails/049/883/193/small_2x/a-white-and-black-soccer-ball-isolated-on-transparent-background-png.png" alt="Logo"> <!-- Ball image; alt describes it. -->
            <h1 class="title-logo">PITCH <br> POINT</h1> <!-- Site name; br adds a line break. -->
        </div> <!-- End the logo group. -->

        <input type="checkbox" id="nav-toggle" class="nav-toggle"> <!-- This checkbox controls the mobile menu. -->
        <label for="nav-toggle" class="hamburger">&#9776;</label> <!-- Shows the menu icon and connects it to the checkbox. -->

        <nav> <!-- Main navigation. -->
            <section data-i18n-block="navbar"> <!-- Translate this navigation block. -->
                <a href="/proyecto.html/pages/info.html">Info</a> <!-- Open the information page. -->
                <a href="/proyecto.html/pages/bookings.html">Bookings</a> <!-- Open the complex catalog. -->
                <a href="/proyecto.html/pages/contacts.html">Contact</a> <!-- Open the contact page. -->
            </section> <!-- End the translated navigation. -->

            <button id="lang-toggle" onclick="toggleLanguage()"> <!-- Click calls the language-switch function. -->
                <img id="lang-flag" src="https://flagcdn.com/24x18/mx.png" alt="Switch to Spanish"> <!-- Flag indicates the next language. -->
            </button> <!-- End the language button. -->
        </nav> <!-- End main navigation. -->

        <div class="user-actions"> <!-- Account area changes with the session. -->
            <?php // Choose which account options to show.
            if (isset($_SESSION['username'])) { // Is a username stored in the session?
                echo '<div class="welcome-message">' . htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8') . '</div>'; // Show the HTML-escaped username.
                echo '<a href="/proyecto.html/php/logout.php" data-i18n="logout" class="logout-button">Logout</a>'; // Show the translated logout link.
            } else { // No logged-in user.
                echo '<a href="/proyecto.html/index.php?view=login" id="login-btn" data-i18n="account" class="login-button">Account</a>'; // Show the translated login link.
            } // End the session check.
            /* Continue with HTML. */ ?>
        </div> <!-- End account options. -->
    </header> <!-- End the page header. -->

    <div class="inicio"> <!-- Main welcome area. -->
        <section data-i18n-block="welcome"> <!-- Translate the welcome content. -->
            <h2>Welcome</h2> <!-- Welcome heading. -->
            <p>Ready to book your field?</p> <!-- Booking prompt. -->
            <a href="/proyecto.html/pages/bookings.html" class="book-now">Book Now</a> <!-- Link styled as a booking button. -->
        </section> <!-- End the translated welcome block. -->
    </div> <!-- End the welcome area. -->

    <footer class="footer"> <!-- Contact prompt, social links and copyright. -->
        <div class="footer-content"> <!-- Group the footer content. -->
            <section data-i18n-block="footer"> <!-- Translate the footer message. -->
                <p class="footer-question">Questions? Contact us.</p> <!-- Contact prompt. -->
            </section> <!-- End the translated footer message. -->

            <div class="footer-column"> <!-- Stack social links using CSS. -->
                <a href="https://www.instagram.com/santiagomartino_/">Instagram</a> <!-- Open the Instagram profile. -->
                <a href="https://www.tiktok.com">TikTok</a> <!-- Open TikTok. -->
                <a href="https://www.youtube.com">YouTube</a> <!-- Open YouTube. -->
            </div> <!-- End the social links. -->
        </div> <!-- End the footer content group. -->
        <p class="footer-copy">© 2026 Pitch Point. All rights reserved.</p> <!-- Copyright notice. -->
    </footer> <!-- End the footer. -->

    <script src="/proyecto.html/assets/js/translation.js"></script> <!-- Load the language-switching code. -->
</body> <!-- End visible page content. -->
</html> <!-- End the HTML document. -->
