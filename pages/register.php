<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register | Pitch Point</title>
    <link rel="stylesheet" href="/proyecto.html/assets/css/style.css">
</head>

<body>
    <a href="/proyecto.html/pages/paginaprincipal.php" class="back-button" data-i18n="back-btn">← Back</a>


    <button id="lang-toggle" class="lang-btn-fixed" onclick="toggleLanguage()">
        <img id="lang-flag" src="https://flagcdn.com/24x18/mx.png" alt="Switch to Spanish">
    </button>

    <div class="profile">
        <h1 data-i18n="register-title">Create Account</h1>
        <form id="registerForm" action="/proyecto.html/php/register.php" method="post">
            <label for="username" data-i18n="register-username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" />
            <label for="password" data-i18n="register-password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
            <label id="feedback"></label>
            <button type="submit" data-i18n="register-btn">Register</button>
        </form>
        <span>
            <span data-i18n="register-login-text">Already have an account?</span>
            <a href="/proyecto.html/index.php?view=login" data-i18n="register-login-link">Login</a>
        </span>
    </div>

    <script src="/proyecto.html/assets/js/script.js"></script>
    <script src="/proyecto.html/assets/js/translation.js"></script>
</body>

</html>