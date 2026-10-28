// Wait for the DOM before finding forms and attaching event listeners.
document.addEventListener("DOMContentLoaded", () => { // Register an arrow-function listener that runs after the HTML has been parsed.
  console.log("hola, estoy cargado"); // Log to the console to confirm that the script is loaded
  // Look up a translation; use the fallback text if fetch has not finished yet.
  function t(key, fallback) { // Declare t with key and fallback parameters to return a translation or its fallback.
    const lang = localStorage.getItem("preferredLang") || "en"; // Read the saved language from localStorage; || uses en when there is no truthy saved value.
    if ( // Start a condition continued on the following lines.
      typeof translations !== "undefined" && // Check that translations is available; && also requires the next condition.
      translations[lang] && // Check that the language or its key exists; brackets access object properties.
      translations[lang][key] // Check that the language or its key exists; brackets access object properties.
    ) { // Finish the multiline condition and open its statement block.
      return translations[lang][key]; // Return the text selected by language and key, ending this call to t.
    } // Close the multiline condition block; this brace ends that scope, not the whole file.
    return fallback; // Return the supplied fallback text when no translation was found.
  } // Close the t function opened on line 5; this brace ends that scope, not the whole file.

  // Messages arrive through GET after a PHP redirect. textContent does not interpret HTML.
  const feedback = // Declare feedback; the following line supplies its value.
    document.getElementById("feedback") || document.querySelector(".lbl-error"); // Find the element; || uses the second lookup when the first returns null.
  const params = new URLSearchParams(window.location.search); // Parse window.location.search so query parameters can be read by name.

  if (feedback) { // Only update feedback when its element exists.
    if (params.has("error")) { // Prioritize the error message when the URL has an error parameter.
      const errorMsg = params.get("error"); // Read the error parameter and store its value for feedback handling.
      if (errorMsg === "Invalid username or password") { // Recognize this specific error and associate its translation key; === compares without type conversion.
        feedback.textContent = t("err-invalid-login", errorMsg); // Set feedback text from t; its arguments continue below.
        feedback.setAttribute("data-i18n", "err-invalid-login"); // Associate feedback with the err-invalid-login translation key for later language changes.
      } else { // Close the previous branch and start its alternative.
        feedback.textContent = errorMsg; // Display the received error as text when it has no specific translation.
      } // Close the conditional branch opened on line 28; this brace ends that scope, not the whole file.
      feedback.className = "error lbl-error"; // Replace the feedback classes so CSS applies the specified error or success appearance.
    } else if (params.has("success")) { // If there was no error and the URL has success, enter the success-message branch.
      feedback.textContent = params.get("success"); // Display the URL parameter as plain text without interpreting HTML tags.
      feedback.className = "success"; // Replace the feedback classes so CSS applies the specified error or success appearance.
    } // Close the conditional branch opened on line 32; this brace ends that scope, not the whole file.
  } // Close the conditional branch opened on line 22; this brace ends that scope, not the whole file.

  // Login: reject empty fields; PHP validates them again before querying MySQL.
  const loginForm = // Declare loginForm; the following line supplies its value.
    document.getElementById("loginForm") || // Find the element; || uses the second lookup when the first returns null.
    document.getElementById("login-form"); // Find the element; || uses the second lookup when the first returns null.
  if (loginForm) { // Only attach validation if the login form exists on this page.
    loginForm.addEventListener("submit", function (event) { // Attach a submit listener to the element; the function receives the event object.
      const username = document.getElementById("username").value.trim(); // Find id=username and store its entered value as username and trim surrounding spaces for this check.
      const password = document.getElementById("password").value; // Find id=password and store its entered value as password.

      if (!username || !password) { // ! detects an empty string; reject when either field is empty.
        event.preventDefault(); // Cancel this event's default form submission or link navigation, depending on its handler.
        if (feedback) { // Only update feedback when its element exists.
          feedback.textContent = t( // Set feedback text from t; its arguments continue below.
            "err-fill-both", // Pass this dictionary key as the first argument to the translation helper.
            "Please fill in both username and password.", // Pass this fallback text as the second argument when the translation is unavailable.
          ); // Close the call arguments started above and finish the statement.
          feedback.setAttribute("data-i18n", "err-fill-both"); // Associate feedback with the err-fill-both translation key for later language changes.
          feedback.className = "error lbl-error"; // Replace the feedback classes so CSS applies the specified error or success appearance.
        } // Close the conditional branch opened on line 49; this brace ends that scope, not the whole file.
      } // Close the conditional branch opened on line 47; this brace ends that scope, not the whole file.
    }); // Close the loginForm submit callback opened on line 43 and its enclosing call; the semicolon ends the statement.
  } // Close the conditional branch opened on line 42; this brace ends that scope, not the whole file.

  // Registration: 5 to 20 characters, a letter and digit in the username, four character types in the password.
  const registerForm = document.getElementById("registerForm"); // Find id=registerForm and store its DOM element as registerForm.
  if (registerForm) { // Only attach validation when the registration form exists.
    registerForm.addEventListener("submit", function (event) { // Attach a submit listener to the element; the function receives the event object.
      const username = document.getElementById("username").value; // Find id=username and store its entered value as username.
      const password = document.getElementById("password").value; // Find id=password and store its entered value as password.

      // Count Unicode code points like mb_strlen in PHP, without changing the submitted value.
      const usernameLength = Array.from(username).length; // Store the username length in code points; Array.from counts Unicode code points rather than bytes.
      const passwordLength = Array.from(password).length; // Store the password length in code points; Array.from counts Unicode code points rather than bytes.
      if ( // Start a condition continued on the following lines.
        usernameLength < 5 || // Check whether the username length is less than 5; || combines rejection conditions.
        usernameLength > 20 || // Check whether the username length is greater than 20; || combines rejection conditions.
        passwordLength < 5 || // Check whether the password length is less than 5; || combines rejection conditions.
        passwordLength > 20 // Check whether the password length is greater than 20; || combines rejection conditions.
      ) { // Finish the multiline condition and open its statement block.
        event.preventDefault(); // Cancel this event's default form submission or link navigation, depending on its handler.
        if (feedback) { // Only update feedback when its element exists.
          feedback.textContent = t( // Set feedback text from t; its arguments continue below.
            "err-length", // Pass this dictionary key as the first argument to the translation helper.
            "Username and password must be between 5 and 20 characters.", // Pass this fallback text as the second argument when the translation is unavailable.
          ); // Close the call arguments started above and finish the statement.
          feedback.setAttribute("data-i18n", "err-length"); // Associate feedback with the err-length translation key for later language changes.
          feedback.className = "error"; // Replace the feedback classes so CSS applies the specified error or success appearance.
        } // Close the conditional branch opened on line 78; this brace ends that scope, not the whole file.
        return; // Return from the current function now, skipping its remaining instructions.
      } // Close the multiline condition block; this brace ends that scope, not the whole file.

      // test returns a boolean: these regular expressions search for character types in the input.
      const hasLetter = /[a-zA-Z]/.test(username); // Store whether the input contains an ASCII letter; test runs the regular expression.
      const hasNumber = /[0-9]/.test(username); // Store whether the input contains a digit; test runs the regular expression.
      if (!hasLetter || !hasNumber) { // Reject the username if it lacks an ASCII letter or a digit.
        event.preventDefault(); // Cancel this event's default form submission or link navigation, depending on its handler.
        if (feedback) { // Only update feedback when its element exists.
          feedback.textContent = t( // Set feedback text from t; its arguments continue below.
            "err-letter-number", // Pass this dictionary key as the first argument to the translation helper.
            "Username must contain at least one letter and one number.", // Pass this fallback text as the second argument when the translation is unavailable.
          ); // Close the call arguments started above and finish the statement.
          feedback.setAttribute("data-i18n", "err-letter-number"); // Associate feedback with the err-letter-number translation key for later language changes.
          feedback.className = "error"; // Replace the feedback classes so CSS applies the specified error or success appearance.
        } // Close the conditional branch opened on line 94; this brace ends that scope, not the whole file.
        return; // Return from the current function now, skipping its remaining instructions.
      } // Close the conditional branch opened on line 92; this brace ends that scope, not the whole file.

      const hasLowercase = /[a-z]/.test(password); // Store whether the input contains a lowercase ASCII letter; test runs the regular expression.
      const hasUppercase = /[A-Z]/.test(password); // Store whether the input contains an uppercase ASCII letter; test runs the regular expression.
      const hasDigit = /[0-9]/.test(password); // Store whether the input contains a digit; test runs the regular expression.
      const hasSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/.test( // Store whether the input contains a listed special character; test runs the regular expression.
        password, // Pass the password value to test to check for a required special character.
      ); // Close the call arguments started above and finish the statement.
      if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar) { // Reject the password if any required character type is missing.
        event.preventDefault(); // Cancel this event's default form submission or link navigation, depending on its handler.
        if (feedback) { // Only update feedback when its element exists.
          feedback.textContent = t( // Set feedback text from t; its arguments continue below.
            "err-special-char", // Pass this dictionary key as the first argument to the translation helper.
            "Password must contain a lowercase, uppercase, number, and special character.", // Pass this fallback text as the second argument when the translation is unavailable.
          ); // Close the call arguments started above and finish the statement.
          feedback.setAttribute("data-i18n", "err-special-char"); // Associate feedback with the err-special-char translation key for later language changes.
          feedback.className = "error"; // Replace the feedback classes so CSS applies the specified error or success appearance.
        } // Close the conditional branch opened on line 113; this brace ends that scope, not the whole file.
        return; // Return from the current function now, skipping its remaining instructions.
      } // Close the conditional branch opened on line 111; this brace ends that scope, not the whole file.
    }); // Close the registerForm submit callback opened on line 64 and its enclosing call; the semicolon ends the statement.
  } // Close the conditional branch opened on line 63; this brace ends that scope, not the whole file.

  // Use the visitor's local date. toISOString uses UTC and could return tomorrow at night in Uruguay.
  function localDate() { // Declare a function that builds the local date in year-month-day format.
    const now = new Date(); // Create a Date object to read the visitor's local year, month and day.
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`; // Build the local date with a template literal; add one to the zero-based month and pad month and day to two digits.
  } // Close the localDate function opened on line 127; this brace ends that scope, not the whole file.

  const dateInput = document.getElementById("date"); // Find id=date and store its DOM element as dateInput.
  if (dateInput) { // Avoid accessing the date input when it is absent on this page.
    // This file is shared by several pages, so check whether this input exists.
    dateInput.min = localDate(); // Set the date input's minimum to the current local day.
  } // Close the conditional branch opened on line 133; this brace ends that scope, not the whole file.

  const bookingBack = document.getElementById("booking-back"); // Find id=booking-back and store its DOM element as bookingBack.
  if (bookingBack) { // Only attach the back-link handler when the link exists.
    bookingBack.addEventListener("click", (e) => { // Attach a click listener to the element; the function receives the event object.
      // Go back when the visitor came from this site; otherwise use the link's fallback href.
      if (document.referrer.startsWith(window.location.origin + "/proyecto.html/") && history.length > 1) { // Check that the referrer belongs to this project and that a previous history entry exists.
        e.preventDefault(); // Cancel this event's default form submission or link navigation, depending on its handler.
        history.back(); // Ask the browser to move back one history entry.
      } // Close the conditional branch opened on line 142; this brace ends that scope, not the whole file.
    }); // Close the bookingBack click callback opened on line 140 and its enclosing call; the semicolon ends the statement.
  } // Close the conditional branch opened on line 139; this brace ends that scope, not the whole file.

  // Booking prototype: validate and update the screen. This does not send or store a reservation.
  const bookingForm = document.getElementById("booking-form"); // Find id=booking-form and store its DOM element as bookingForm.
  if (bookingForm) { // Only attach the booking preview when its form exists.
    bookingForm.addEventListener("submit", function (e) { // Attach a submit listener to the element; the function receives the event object.
      e.preventDefault(); // Cancel this event's default form submission or link navigation, depending on its handler.

      const nameInput = document.getElementById("name"); // Find id=name and store its DOM element as nameInput.
      const nameError = document.getElementById("name-error"); // Find id=name-error and store its DOM element as nameError.
      // trim removes surrounding spaces; split separates words using one or more whitespace characters.
      const words = nameInput.value.trim().split(/\s+/); // Trim surrounding spaces and split the name on one or more whitespace characters into words.

      if (words.length < 2 || words[1] === "") { // Require at least two words; index 1 refers to the second word.
        nameError.classList.add("visible"); // Add the visible class to show the name error.
        nameInput.focus(); // Move keyboard focus to the name input so the visitor can correct it.
        return; // Return from the current function now, skipping its remaining instructions.
      } // Close the conditional branch opened on line 160; this brace ends that scope, not the whole file.

      nameError.classList.remove("visible"); // Remove the visible class to hide the name error.

      const date = document.getElementById("date").value; // Find id=date and store its entered value as date.
      const today = localDate(); // Call localDate and store the current local day for the following comparison.
      dateInput.min = today; // Set the date input's minimum to the current local day.
      if (!date || date < today) { // Reject an empty or past date; YYYY-MM-DD strings preserve chronological ordering here.
        alert("Please select a date from today onwards."); // Display a browser alert; it does not send data to the server.
        return; // Return from the current function now, skipping its remaining instructions.
      } // Close the conditional branch opened on line 171; this brace ends that scope, not the whole file.

      // Use textContent for user input, hide the form and display the summary.
      document.getElementById("success-name").textContent = // Select the summary name paragraph and begin assigning its text.
        "Name: " + nameInput.value; // Concatenate the Name label with the entered name and finish the previous assignment.
      document.getElementById("success-date").textContent = "Date: " + date; // Write the Date label and selected date as summary text.
      bookingForm.style.display = "none"; // Apply an inline style that hides the form after validation.
      document.getElementById("booking-success").style.display = "flex"; // Show the summary as a Flex container; this does not store a reservation.
    }); // Close the bookingForm submit callback opened on line 152 and its enclosing call; the semicolon ends the statement.
  } // Close the conditional branch opened on line 151; this brace ends that scope, not the whole file.
}); // Close the document DOMContentLoaded callback opened on line 2 and its enclosing call; the semicolon ends the statement.
