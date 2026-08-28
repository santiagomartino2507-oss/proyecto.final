<?php

$servername = "localhost";
$username = "root";
$password = ""; // default password in xampp
$dbname = "registration"; // Name of database in SQL

// connecting with value from variables
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>