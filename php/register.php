<?php // Open a PHP block executed on the server before the response reaches the browser.
// This controller handles POST. The form view is in pages/register.php.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { // Detect non-POST requests so they can be redirected to the form view.
    header('Location: /proyecto.html/index.php?view=register'); // Send the Location header with the target URL; the browser makes another request.
    exit; // Stop the script immediately; a redirect header alone would not stop execution.
} // Close the conditional branch opened on line 3; this brace ends that scope, not the whole file.

$user = $_POST['username'] ?? ''; // Assign the submitted username, or an empty string if it is missing to $user. ?? uses an empty string when the key is missing or null.
$pass = $_POST['password'] ?? ''; // Assign the submitted password without transforming it to $pass. ?? uses an empty string when the key is missing or null.
$message = ''; // Assign the validation or result message to $message.

// JavaScript can be disabled, so PHP must repeat the form validation rules.
// Keep the password unchanged and escape the username only when displaying it in HTML.
if (!is_string($user) || !is_string($pass) || // Reject non-string inputs; || stops evaluating after a true condition. Further checks may continue below.
    mb_strlen($user, 'UTF-8') < 5 || mb_strlen($user, 'UTF-8') > 20 || // Count the username Unicode characters with UTF-8 and reject lengths below 5 or above 20.
    mb_strlen($pass, 'UTF-8') < 5 || mb_strlen($pass, 'UTF-8') > 20) { // Count the password Unicode characters with UTF-8 and reject lengths below 5 or above 20.
    $message = 'Username and password must be between 5 and 20 characters.'; // Assign the validation or result message to $message.
} elseif (!preg_match('/[a-zA-Z]/', $user) || !preg_match('/[0-9]/', $user)) { // Search for an ASCII letter and digit in the username; ! rejects a missing match.
    $message = 'Username must contain at least one letter and one number.'; // Assign the validation or result message to $message.
} elseif (!preg_match('/[a-z]/', $pass) || !preg_match('/[A-Z]/', $pass) || // Require lowercase, uppercase, a digit and a listed symbol; preg_match tests each pattern and || rejects a missing type. \x27 represents an apostrophe.
    !preg_match('/[0-9]/', $pass) || !preg_match('/[!@#$%^&*()_+\-=\[\]{};\x27":\\\\|,.<>\/?]/', $pass)) { // Require lowercase, uppercase, a digit and a listed symbol; preg_match tests each pattern and || rejects a missing type. \x27 represents an apostrophe.
    $message = 'Password must contain a lowercase, uppercase, number, and special character.'; // Assign the validation or result message to $message.
} // Close the conditional branch opened on line 21; this brace ends that scope, not the whole file.

if ($message !== '') { // If validation produced a message, take the error path before connecting to MySQL.
    header('Location: /proyecto.html/index.php?view=register&error=' . urlencode($message)); // Send the Location header with the target URL; the browser makes another request. urlencode encodes the message as a query parameter value.
    exit; // Stop the script immediately; a redirect header alone would not stop execution.
} // Close the conditional branch opened on line 25; this brace ends that scope, not the whole file.

require_once __DIR__ . '/db_connect.php'; // Load the connection once; __DIR__ uses the controller folder and require stops execution if the file is missing.
try { // Start the operations block whose MySQL errors are handled by catch.
    // BCRYPT creates a salted hash. We do not store the original password or decrypt the hash.
    $hashed_password = password_hash($pass, PASSWORD_BCRYPT); // Generate a BCRYPT hash with an automatic salt; do not store the original password as plain text.
    // The ? placeholders separate data from SQL; "ss" means two string parameters.
    $stmt = $conn->prepare('INSERT INTO users (username, password) VALUES (?, ?)'); // Prepare an INSERT with username and hash placeholders, keeping data separate from SQL.
    $stmt->bind_param('ss', $user, $hashed_password); // Bind variables to the query placeholders in order; each s declares one string parameter.
    $stmt->execute(); // Execute the prepared statement with its currently bound values.
    $stmt->close(); // Release the prepared-statement resource when it is no longer needed.
    $location = '/proyecto.html/index.php?view=login&success=' . urlencode('Registration successful! Please log in.'); // Assign the next redirect URL to $location. the dot concatenates strings; urlencode encodes the message as a URL parameter.
} catch (mysqli_sql_exception $error) { // End try and receive a mysqli exception in $error to handle the failure.
    // 1062 means a duplicate key; username needs a UNIQUE index in the database.
    error_log($error->getMessage()); // Write the exception details to the server log instead of the page.
    $message = $error->getCode() === 1062 // Start a ternary that identifies MySQL error 1062, a duplicate unique key.
        ? 'Registration failed. Username may exist.' // True ternary branch: use the duplicate-username message.
        : 'Registration failed. Please try again later.'; // False ternary branch: use a generic message for other MySQL failures.
    $location = '/proyecto.html/index.php?view=register&error=' . urlencode($message); // Assign the next redirect URL to $location. the dot concatenates strings; urlencode encodes the message as a URL parameter.
} // Close the exception handler opened on line 40; this brace ends that scope, not the whole file.

// Close the connection before exit: code after exit never runs.
$conn->close(); // Close the MySQL connection before the controller ends.
header('Location: ' . $location); // Send the Location header with the target URL; the browser makes another request.
exit; // Stop the script immediately; a redirect header alone would not stop execution.
