<?php
session_start(); 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Pull in single database connection script.
require_once 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Passwords must be hashed exactly as the user typed them to prevent authentication bugs if they use special characters.
    $user = htmlspecialchars($_POST['username']);
    $pass = $_POST['password'];

    $hashed_password = password_hash($pass, PASSWORD_BCRYPT);

    // Prepare the SQL statement to prevent SQL injection
    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?,?)");
    $stmt->bind_param("ss", $user, $hashed_password);

    if ($stmt->execute()) {
        header('Location: /proyecto.html/index.php?view=login&success=Registration successful! Please log in.');
        exit();
    } else {
        // Redirect back to the register page if something fails (ex: username taken).
        header('Location: /proyecto.html/index.php?view=register&error=Registration failed. Username may exist.');
        exit();
    }

    $stmt->close();
    $conn->close();
}
?>