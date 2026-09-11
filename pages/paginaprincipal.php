<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pitch Point</title>
    <link rel="stylesheet" href="/proyecto.html/assets/css/style.css">
</head>

<body>
    <header>
        <div class="logo">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/049/883/193/small_2x/a-white-and-black-soccer-ball-isolated-on-transparent-background-png.png"
                alt="Logo">
            <h1 class="title-logo">PITCH <br> POINT</h1>
        </div>
        <nav>
            <a href="/proyecto.html/pages/info.html">Info</a>
            <a href="/proyecto.html/pages/bookings.html">Bookings</a>
            <a href="/proyecto.html/pages/contacts.html">Contact</a>
            <button id="lang-toggle" onclick="toggleLanguage()">
                <img id="lang-flag" src="https://flagcdn.com/24x18/mx.png" alt="Switch to Spanish">
            </button>
        </nav>

        <div class="user-actions"> <!-- Wraps user info and login/logout button into a single grid item -->
            <?php
            session_start();
            if (isset($_SESSION['username'])) {
                echo '<div class="welcome-message">' . htmlspecialchars($_SESSION['username']) . '</div>';
                echo '<a href="/proyecto.html/php/logout.php" class="logout-button">Logout</a>';
            } else {
                echo '<a href="/proyecto.html/index.php?view=login" class="login-button">Account</a>';
            }
            ?>
        </div>
    </header>

    <div class="inicio">
        <section data-i18n-block="welcome"></section>
    </div>

    </div>
    <footer class="footer">
        <div class="footer-content">

            <p class="footer-question">Questions? Contact us.</p>

            <div class="footer-links">
                <div class="footer-column">
                    <a href="/proyecto.html/pages/paginaprincipal.php">Home</a>
                    <a href="/proyecto.html/pages/bookings.html">Bookings</a>
                    <a href="/proyecto.html/pages/contacts.html">Contact</a>
                    <a href="/proyecto.html/pages/info.html">Info</a>
                </div>

                <div class="footer-column">
                    <a href="https://www.instagram.com/santiagomartino_/">Instagram</a>
                    <a href="https://www.tiktok.com">TikTok</a>
                    <a href="https://www.youtube.com">YouTube</a>
                </div>
            </div>

            <p class="footer-copy">© 2026 Pitch Point. All rights reserved..</p>
        </div>
    </footer>
    <script src="/proyecto.html/assets/js/translation.js"></script>
</body>

</html>