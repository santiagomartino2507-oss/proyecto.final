<?php

session_start();
session_unset();
session_destroy();
header('Location: /proyecto.html/index.php?view=login&success=You have been successfully logged out.');
exit();
?>