<?php // Open a PHP block executed on the server before the response reaches the browser.

// GET selects a view. The allowlist prevents including arbitrary server files.
$view = $_GET['view'] ?? ''; // Assign the GET view value, or an empty string if it is missing to $view. ?? uses an empty string when the key is missing or null.
if (is_string($view) && in_array($view, ['paginaprincipal', 'login', 'register'], true)) { // Require a string view in the three-entry allowlist; true makes the membership check strict.
    // __DIR__ uses this file's folder as the base, even when the browser URL changes.
    $viewFile = __DIR__ . '/pages/' . $view . '.php'; // Assign the view file path inside pages to $viewFile. the dot concatenates strings.
    if (file_exists($viewFile)) { // Only include the view when the constructed server file exists.
        include_once $viewFile; // Include and execute that view once within this PHP request.
        exit; // Stop the script immediately; a redirect header alone would not stop execution.
    } // Close the conditional branch opened on line 8; this brace ends that scope, not the whole file.
} // Close the conditional branch opened on line 5; this brace ends that scope, not the whole file.

// Location redirects the browser; exit stops the script after sending the redirect.
header('Location: /proyecto.html/pages/paginaprincipal.php'); // Send the Location header with the target URL; the browser makes another request.
exit; // Stop the script immediately; a redirect header alone would not stop execution.
