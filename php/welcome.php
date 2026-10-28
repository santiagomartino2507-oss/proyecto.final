<?php // Open a PHP block executed on the server before the response reaches the browser.
session_start(); // Start or resume the session identified by the browser cookie.

// This check protects this entry point; other pages do not become private automatically.
if (!isset($_SESSION['username'])) { // Detect a missing session username and reject access through this entry point.
    header('Location: /proyecto.html/index.php?view=login&error=Please log in first'); // Send the Location header with the target URL; the browser makes another request.
    exit(); // Stop the script immediately; a redirect header alone would not stop execution.
} // Close the conditional branch opened on line 5; this brace ends that scope, not the whole file.
// The home page is public and changes its buttons according to the session state.
header('Location: /proyecto.html/pages/paginaprincipal.php'); // Send the Location header with the target URL; the browser makes another request.
exit(); // Stop the script immediately; a redirect header alone would not stop execution.
