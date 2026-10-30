document.addEventListener("DOMContentLoaded", () => {
  // Wait for the HTML to be ready.
  console.log("hola, estoy cargado"); // Shows this text in the console

  const feedback = document.getElementById("feedback"); // Find the feedback element to show messages.
  const params = new URLSearchParams(window.location.search); // Prepare PHP messages from the URL for display.

  if (feedback) {
    // Checks that this element exists
    if (params.has("error")) {
      // Check if the url has a parameter called "error"
      const errorMsg = params.get("error"); // Get the message and store it in errorMsg
      feedback.textContent = errorMsg; // Show the error message.
      if (errorMsg === "Invalid username or password") {
        // Check for this specific login error.
        feedback.setAttribute("data-i18n", "err-invalid-login"); // Set the translation key for this error.
        applyLanguage(); // Apply the current language.
      } // End this login error check.
      feedback.className = "error lbl-error"; // Apply the error CSS classes.
    } else if (params.has("success")) {
      // Otherwise, check for a success parameter.
      feedback.textContent = params.get("success"); // Get and show the success message.
      feedback.className = "success"; // Apply the success CSS class.
    }
  }

  const loginForm = document.getElementById("login-form"); // Find the login form.
  if (loginForm) {
    // Check that the form exists.
    loginForm.addEventListener("submit", function (event) {
      // Run this function when the form is submitted.
      const username = document.getElementById("username").value.trim(); // Read the username and remove surrounding spaces.
      const password = document.getElementById("password").value; // Read the password.

      if (!username || !password) {
        // Check whether either field is empty.
        event.preventDefault(); // Stop the form from being sent.
        if (feedback) {
          // Check that the message element exists.
          feedback.textContent = "Please fill in both username and password."; // Ask the user to fill in both fields.
          feedback.setAttribute("data-i18n", "err-fill-both"); // Set this message's translation key.
          applyLanguage(); // Apply the current language.
          feedback.className = "error lbl-error"; // Apply the error CSS classes.
        } // End the feedback check.
      } // End the empty-field check.
    }); // End the submit handler.
  } // End the form check.

  const registerForm = document.getElementById("registerForm"); // Find the register form.
  if (registerForm) {
    //Check that the form exists.
    registerForm.addEventListener("submit", function (event) {
      // Run this function when the form is submitted.
      const username = document.getElementById("username").value; // Read the username.
      const password = document.getElementById("password").value; // Read the password.

      const usernameLength = Array.from(username).length; // Convert the username to an array
      const passwordLength = Array.from(password).length; // Convert the password to an array
      const hasLetter = /[a-zA-Z]/.test(username); // Check if the username contains at least one letter.
      const hasNumber = /[0-9]/.test(username); // Check if the username contains at least one number.
      const hasLowercase = /[a-z]/.test(password); // Check if the password contains at least one lowercase letter.
      const hasUppercase = /[A-Z]/.test(password); // Check if the password contains at least one uppercase letter.
      const hasDigit = /[0-9]/.test(password); // Check if the password contains at least one number.
      const hasSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/.test(
        // Check for at least one of these special characters.
        password, // Test the password against the pattern above.
      );
      let errorKey = ""; // Store the translation key if an error is found.
      let errorMessage = ""; // Store the error message if an error is found.

      if (
        // Check if either field is outside the allowed length.
        usernameLength < 5 ||
        usernameLength > 20 ||
        passwordLength < 5 ||
        passwordLength > 20
      ) {
        errorKey = "err-length"; // Store the translation key for the length error.
        errorMessage =
          "Username and password must be between 5 and 20 characters."; // Store the message to display later.
      } else if (!hasLetter || !hasNumber) {
        // Otherwise, check if the username is missing a letter or a number.
        errorKey = "err-letter-number"; // Store the translation key for the username error.
        errorMessage =
          "Username must contain at least one letter and one number."; // Store the message to display later.
      } else if (
        !hasLowercase ||
        !hasUppercase ||
        !hasDigit ||
        !hasSpecialChar
      ) {
        // Otherwise, check if the password is missing a required character type.
        errorKey = "err-special-char"; // Store the translation key for the password error.
        errorMessage =
          "Password must contain a lowercase, uppercase, number, and special character."; // Store the message to display later.
      }

      if (errorKey) {
        event.preventDefault(); // Stop the form from being sent.
        if (feedback) {
          // Check that the message element exists.
          feedback.textContent = errorMessage; // Show the error message.
          feedback.setAttribute("data-i18n", errorKey); // Set this message's translation key.
          applyLanguage(); // Apply the current language.
          feedback.className = "error"; // Apply the error CSS class.
        } // End the feedback check.
      }
    }); // End the submit handler.
  } // End the form check.

  function localDate() {
    // Create a function to get today's date.
    const now = new Date(); // Get the current date and time.
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; // Return the date as year-month-day.
  } // End the function.

  const dateInput = document.getElementById("date"); // Find the date input.
  if (dateInput) {
    // Check that the input exists.
    dateInput.min = localDate(); // Set today as the minimum allowed date.
  }

  const bookingBack = document.getElementById("booking-back"); // Find the back button.
  if (bookingBack) {
    // Check that the button exists.
    bookingBack.addEventListener("click", (e) => {
      // Run this function when the user clicks the button.
      if (
        document.referrer.startsWith(
          window.location.origin + "/proyecto.html/",
        ) &&
        history.length > 1
      ) {
        // Check where the user came from and the history size.
        e.preventDefault(); // Stop the link's normal action.
        history.back(); // Go back to the previous page.
      }
    });
  }

  const bookingForm = document.getElementById("booking-form"); // Find the booking form.
  if (bookingForm) {
    // Check that the form exists.
    bookingForm.addEventListener("submit", function (e) {
      // Run this function when the form is submitted.
      e.preventDefault(); // Stop the form from being sent.

      const nameInput = document.getElementById("name"); // Find the name input.
      const nameError = document.getElementById("name-error"); // Find the name error element.
      const words = nameInput.value.trim().split(/\s+/); // Remove surrounding spaces and split the name into words.

      if (words.length < 2 || words[1] === "") { // Check if the name has fewer than two words or the second word is empty.
        nameError.classList.add("visible"); // Add the visible class to show the error message.
        nameInput.focus(); // Put the cursor in the name input.
        return; // Stop this function.
      }

      nameError.classList.remove("visible"); // Remove the visible class to hide the error message.

      const date = dateInput.value; // Get the selected date and store it in date.

      document.getElementById("success-name").textContent = // Set the name in the confirmation.
        "Name: " + nameInput.value;
      document.getElementById("success-date").textContent = "Date: " + date; // Show the selected date.
      bookingForm.style.display = "none"; // Hide the form.
      document.getElementById("booking-success").style.display = "flex"; // Show the confirmation.
    });
  }
});
