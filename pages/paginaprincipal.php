<!DOCTYPE html> <!-- Declare document type as HTML5 standard -->
<html lang="en"> <!-- Set the language of the document to English -->

<head> <!-- Document metadata, configurations, and external resources -->
    <meta charset="UTF-8"> <!-- Character encoding: prevents broken accents and symbols -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Viewport setup: enables responsive mobile scaling -->

    <title>Pitch Point</title> <!-- Set the title of the webpage -->

    <link rel="stylesheet" href="/proyecto.html/assets/css/style.css">
    <!-- Link to external CSS stylesheet for styling -->
</head>

<body> <!-- Visible content and UI elements displayed to the user -->

    <header> <!-- Header section containing navigation and branding -->

        <div class="logo"> <!-- Container -->
            <img src="https://static.vecteezy.com/system/resources/thumbnails/049/883/193/small_2x/a-white-and-black-soccer-ball-isolated-on-transparent-background-png.png"
                alt="Logo">
            <!-- Alternative text for the image -->

            <h1 class="title-logo">PITCH <br> POINT</h1>
        </div>

        <input type="checkbox" id="nav-toggle" class="nav-toggle">

        <label for="nav-toggle" class="hamburger">&#9776;</label>

        <nav>
            <section data-i18n-block="navbar">
                <a href="/proyecto.html/pages/info.html">Info</a>
                <a href="/proyecto.html/pages/bookings.html">Bookings</a>
                <a href="/proyecto.html/pages/contacts.html">Contact</a>
            </section>

            <button id="lang-toggle" onclick="toggleLanguage()">
                <img id="lang-flag" src="https://flagcdn.com/24x18/mx.png" alt="Switch to Spanish">
            </button>
        </nav>

        <div class="user-actions">
            <?php
            session_start();

            if (isset($_SESSION['username'])) {
                echo '<div class="welcome-message">' . htmlspecialchars($_SESSION['username']) . '</div>';
                echo '<a href="/proyecto.html/php/logout.php" data-i18n="logout" class="logout-button">Logout</a>';
            } else {
                echo '<a href="/proyecto.html/index.php?view=login" id="login-btn" data-i18n="account" class="login-button">Account</a>';
            }
            ?>
        </div>

    </header>

    <div class="inicio">
        <section data-i18n-block="welcome">
            <h2>Welcome</h2>
            <p>Ready to book your field?</p>
            <a href="/proyecto.html/pages/bookings.html" class="book-now">Book Now</a>
        </section>
    </div>

    <footer class="footer">

        <div class="footer-content">

            <section data-i18n-block="footer">
                <p class="footer-question">Questions? Contact us.</p>
            </section>

            <div class="footer-column">
                <a href="https://www.instagram.com/santiagomartino_/">Instagram</a>
                <a href="https://www.tiktok.com">TikTok</a>
                <a href="https://www.youtube.com">YouTube</a>
            </div>

        </div>

        <p class="footer-copy">© 2026 Pitch Point. All rights reserved..</p>

    </footer>

    <script src="/proyecto.html/assets/js/translation.js"></script>

</body>

</html>