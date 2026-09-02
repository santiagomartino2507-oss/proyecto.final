<?php
session_start();

// If user is not logged in, redirect to login
if (!isset($_SESSION['username'])) {
    header('Location: /proyecto.html/index.php?view=login&error=Please log in first');
    exit();
}
else {
    header('Location: /proyecto.html/pages/paginaprincipal.php');
    exit();
}
