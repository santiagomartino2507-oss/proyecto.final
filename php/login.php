<?php // Open a PHP block executed on the server before the response reaches the browser.
// The session remembers the user between HTTP requests. Start it before sending HTML.
session_start(); // Start or resume the session identified by the browser cookie.

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { // Detect non-POST requests so they can be redirected to the form view.
    header('Location: /proyecto.html/index.php?view=login'); // Send the Location header with the target URL; the browser makes another request.
    exit; // Stop the script immediately; a redirect header alone would not stop execution.
} // Close the conditional branch opened on line 5; this brace ends that scope, not the whole file.

$input_user = $_POST['username'] ?? ''; // Assign the username submitted by the login form to $input_user. ?? uses an empty string when the key is missing or null.
$input_pass = $_POST['password'] ?? ''; // Assign the password submitted by the login form to $input_pass. ?? uses an empty string when the key is missing or null.
// A request can reach this controller without using the form or JavaScript.
if (!is_string($input_user) || !is_string($input_pass) || trim($input_user) === '' || $input_pass === '') { // Reject non-string fields, a username empty after trimming, or an empty password; || rejects when any check fails.
    header('Location: /proyecto.html/index.php?view=login&error=' . urlencode('Please fill in both username and password.')); // Send the Location header with the target URL; the browser makes another request. urlencode encodes the message as a query parameter value.
    exit; // Stop the script immediately; a redirect header alone would not stop execution.
} // Close the conditional branch opened on line 13; this brace ends that scope, not the whole file.

require_once __DIR__ . '/db_connect.php'; // Load the connection once; __DIR__ uses the controller folder and require stops execution if the file is missing.
$location = '/proyecto.html/index.php?view=login&error=' . urlencode('Invalid username or password'); // Assign the next redirect URL to $location. the dot concatenates strings; urlencode encodes the message as a URL parameter.
try { // Start the operations block whose MySQL errors are handled by catch.
    // The username fills the ? placeholder as data, without changing the SQL instruction.
    $stmt = $conn->prepare('SELECT username, password FROM users WHERE username = ?'); // Prepare a SELECT of username and password hash filtered by username; ? is a parameter placeholder.
    $stmt->bind_param('s', $input_user); // Bind variables to the query placeholders in order; each s declares one string parameter.
    $stmt->execute(); // Execute the prepared statement with its currently bound values.
    $result = $stmt->get_result(); // Get the SELECT result as a mysqli_result object for reading rows.

    if ($result->num_rows === 1) { // Only verify credentials when the SELECT returned exactly one row.
        $user = $result->fetch_assoc(); // Read the row as an associative array with username and password column keys.
        // Compare the submitted password with the hash stored during registration.
        if (password_verify($input_pass, $user['password'])) { // Compare the submitted password with the row's hash and enter when verification succeeds.
            // Regenerate the identifier after authentication to prevent reusing the previous session ID.
            session_regenerate_id(true); // Generate a new session identifier and delete the old identifier's session storage.
            $_SESSION['username'] = $user['username']; // Store the database username in the session to recognize the user in later requests.
            $location = '/proyecto.html/php/welcome.php'; // Assign the next redirect URL to $location.
        } // Close the conditional branch opened on line 30; this brace ends that scope, not the whole file.
    } // Close the conditional branch opened on line 27; this brace ends that scope, not the whole file.
    $stmt->close(); // Release the prepared-statement resource when it is no longer needed.
} catch (mysqli_sql_exception $error) { // End try and receive a mysqli exception in $error to handle the failure.
    error_log($error->getMessage()); // Write the exception details to the server log instead of the page.
    $location = '/proyecto.html/index.php?view=login&error=' . urlencode('Login unavailable. Please try again later.'); // Assign the next redirect URL to $location. the dot concatenates strings; urlencode encodes the message as a URL parameter.
} // Close the exception handler opened on line 38; this brace ends that scope, not the whole file.

$conn->close(); // Close the MySQL connection before the controller ends.
// Use the same message for an unknown username and an incorrect password.
header('Location: ' . $location); // Send the Location header with the target URL; the browser makes another request.
exit; // Stop the script immediately; a redirect header alone would not stop execution.
