<?php // Open a PHP block executed on the server before the response reaches the browser.

// Resume the session, clear its variables and destroy its data on the server.
session_start(); // Start or resume the session identified by the browser cookie.
session_unset(); // Clear the variables stored in the current session.
session_destroy(); // Destroy the session data on the server; this alone does not delete the browser cookie.
// The home page now displays the account button for a visitor.
header('Location: /proyecto.html/pages/paginaprincipal.php'); // Send the Location header with the target URL; the browser makes another request.
exit(); // Stop the script immediately; a redirect header alone would not stop execution.
