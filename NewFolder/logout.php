<?php

session_start();
session_unset();
session_destroy();
header("Location: login.html?success=You have been successfully logged out.");
exit();
?>