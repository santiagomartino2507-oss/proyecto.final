<?php // Open a PHP block executed on the server before the response reaches the browser.
// Local XAMPP MySQL credentials; change them before publishing the project.
$servername = "localhost"; // Assign the MySQL server address to $servername.
$username = "root"; // Assign the MySQL connection user, not the website visitor to $username.
$password = ""; // Assign the MySQL connection password; it is empty in this local setup to $password.
$dbname = "registration"; // Assign the database name to $dbname.

// mysqli connects PHP to MySQL. Strict mode lets us catch database errors as exceptions.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Enable mysqli errors and strict exceptions so catch can handle failures.
try { // Start the operations block whose MySQL errors are handled by catch.
    $conn = new mysqli($servername, $username, $password, $dbname); // Create the connection with server, username, password and database name; failure can throw an exception.
    // utf8mb4 supports accented letters and other Unicode characters.
    $conn->set_charset('utf8mb4'); // Set utf8mb4 for text exchanged between PHP and MySQL; this does not alter table columns.
} catch (mysqli_sql_exception $error) { // End try and receive a mysqli exception in $error to handle the failure.
    // Keep technical details in the server log and show a controlled message to the visitor.
    error_log($error->getMessage()); // Write the exception details to the server log instead of the page.
    http_response_code(503); // Mark the response as service unavailable after the connection failure.
    exit('Database unavailable. Please try again later.'); // Stop the script and send a controlled message as the response body.
} // Close the exception handler opened on line 14; this brace ends that scope, not the whole file.
