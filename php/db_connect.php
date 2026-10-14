<?php

$servername = "localhost"; // Database host server (local machine)
$username = "root"; // default username in xampp
$password = ""; // default password in xampp
$dbname = "registration"; // Name of database in SQL


$conn = new mysqli($servername, $username, $password, $dbname); // Opens connection to the database

// Checks if the connection attempt failed
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>