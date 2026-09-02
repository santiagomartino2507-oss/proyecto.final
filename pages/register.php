<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>profile</title>
    <link rel="stylesheet" href="/proyecto.html/assets/css/style.css">
</head>
<body>

<a href="/proyecto.html/index.php" class="back-button">← Back</a>

    <div class="profile">

        <h1>Create Account</h1>
        <form  id="registerForm" action="/proyecto.html/php/register.php" method="post">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter your username">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password">
                <label id="feedback"></label>
                <button type="submit">Register</button>
        </form>
        <span>
                Already have an account?
                <a href="/proyecto.html/index.php?view=login" >Login</a>
        </span>
    </div>
    <script src="/proyecto.html/assets/js/coso.js"></script>
</body>
</html>