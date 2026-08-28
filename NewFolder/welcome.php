<?php
session_start();

// If user is not logged in, redirect to login
if (!isset($_SESSION['username'])) {
    header("Location: paginaaaa/login.php?error=Please log in first");
    exit();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="welcome">
        Welcome, <?php echo htmlspecialchars($_SESSION['username']); ?>! 
    </div>

    <div class="logout">
        <a href="logout.php">Logout</a>
    </div>
</body>
</html>