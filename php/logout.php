<?php

session_start();
session_unset();
session_destroy();
header('Location: /proyecto.html/pages/paginaprincipal.php');
exit();
?>