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

        <h1>Welcome Back</h1>
        <form  id="login-form" action="/proyecto.html/php/login.php" method="post">

            <label for="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter your username">

            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter your password">

            <?php
                if(isset($_GET['error']))
                    echo "<label class='lbl lbl-error' >". $_GET['error']. "</label>";
            ?>

            <button type="submit">Sign In</button>

        </form>
        <span>
            Don't have an account?
            <a href="/proyecto.html/index.php?view=register" >Register</a>
        </span>
    </div>

</body>
</html>