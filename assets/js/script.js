document.addEventListener("DOMContentLoaded", () => {   // Wait for the HTML to be ready.
  console.log("hola, estoy cargado"); // Shows this text in the console

  const feedback = document.getElementById("feedback"); // Find the feedback element to show messages.
  const params = new URLSearchParams(window.location.search); // Prepare PHP messages from the URL for display.

  if (feedback) { // Checks that this element exists
    if (params.has("error")) { // Check if the url has a parameter called "error"
      const errorMsg = params.get("error"); // Get the message and store it in errorMsg
      feedback.textContent = errorMsg; // Show the error message.
      if (errorMsg === "Invalid username or password") { // Check for this specific login error.
        feedback.setAttribute("data-i18n", "err-invalid-login"); // Set the translation key for this error.
        applyLanguage(); // Apply the current language.
      } // End this login error check.
      feedback.className = "error lbl-error"; // Apply the error CSS classes.
    } else if (params.has("success")) { // Otherwise, check for a success parameter.
      feedback.textContent = params.get("success"); // Get and show the success message.
      feedback.className = "success"; // Apply the success CSS class.
    }
  }

  const loginForm = document.getElementById("login-form"); // Find the login form.
  if (loginForm) { // Check that the form exists.
    loginForm.addEventListener("submit", function (event) { // Run this function when the form is submitted.
      const username = document.getElementById("username").value.trim(); // Read the username and remove surrounding spaces.
      const password = document.getElementById("password").value; // Read the password.

      if (!username || !password) { // Check whether either field is empty.
        event.preventDefault(); // Stop the form from being sent.
        if (feedback) { // Check that the message element exists.
          feedback.textContent = "Please fill in both username and password."; // Ask the user to fill in both fields.
          feedback.setAttribute("data-i18n", "err-fill-both"); // Set this message's translation key.
          applyLanguage(); // Apply the current language.
          feedback.className = "error lbl-error"; // Apply the error CSS classes.
        } // End the feedback check.
      } // End the empty-field check.
    }); // End the submit handler.
  } // End the form check.

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      const usernameLength = Array.from(username).length;
      const passwordLength = Array.from(password).length;
      const hasLetter = /[a-zA-Z]/.test(username);
      const hasNumber = /[0-9]/.test(username);
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/.test(
        password,
      );
      let errorKey = "";
      let errorMessage = "";

      if (
        usernameLength < 5 ||
        usernameLength > 20 ||
        passwordLength < 5 ||
        passwordLength > 20
      ) {
        errorKey = "err-length";
        errorMessage = "Username and password must be between 5 and 20 characters.";
      } else if (!hasLetter || !hasNumber) {
        errorKey = "err-letter-number";
        errorMessage = "Username must contain at least one letter and one number.";
      } else if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar) {
        errorKey = "err-special-char";
        errorMessage = "Password must contain a lowercase, uppercase, number, and special character.";
      }

      if (errorKey) {
        event.preventDefault();
        if (feedback) {
          feedback.textContent = errorMessage;
          feedback.setAttribute("data-i18n", errorKey);
          applyLanguage();
          feedback.className = "error";
        }
      }
    });
  }

  function localDate() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }

  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.min = localDate();
  }

  const bookingBack = document.getElementById("booking-back");
  if (bookingBack) {
    bookingBack.addEventListener("click", (e) => {
      if (document.referrer.startsWith(window.location.origin + "/proyecto.html/") && history.length > 1) {
        e.preventDefault();
        history.back();
      }
    });
  }

  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nameInput = document.getElementById("name");
      const nameError = document.getElementById("name-error");
      const words = nameInput.value.trim().split(/\s+/);

      if (words.length < 2 || words[1] === "") {
        nameError.classList.add("visible");
        nameInput.focus();
        return;
      }

      nameError.classList.remove("visible");

      const date = dateInput.value;
      const today = localDate();
      dateInput.min = today;
      if (!date || date < today) {
        alert("Please select a date from today onwards.");
        return;
      }

      document.getElementById("success-name").textContent =
        "Name: " + nameInput.value;
      document.getElementById("success-date").textContent = "Date: " + date;
      bookingForm.style.display = "none";
      document.getElementById("booking-success").style.display = "flex";
    });
  }
});
