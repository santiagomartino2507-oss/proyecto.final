document.addEventListener("DOMContentLoaded", () => { // Wait for the HTMl to be fully load
  console.log("hola, estoy cargado"); // Log to the console to confirm that the script is loaded

  const feedback =
    document.getElementById("feedback") || document.querySelector(".lbl-error");
  const params = new URLSearchParams(window.location.search);

  if (feedback) {
    if (params.has("error")) {
      const errorMsg = params.get("error");
      if (errorMsg === "Invalid username or password") {
        feedback.textContent = t("err-invalid-login", errorMsg);
        feedback.setAttribute("data-i18n", "err-invalid-login");
      } else {
        feedback.textContent = errorMsg;
      }
      feedback.className = "error lbl-error";
    } else if (params.has("success")) {
      feedback.textContent = params.get("success");
      feedback.className = "success";
    }
  }

  // Login Form Validation
  const loginForm =
    document.getElementById("loginForm") ||
    document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (!username || !password) {
        event.preventDefault();
        if (feedback) {
          feedback.textContent = t(
            "err-fill-both",
            "Please fill in both username and password.",
          );
          feedback.setAttribute("data-i18n", "err-fill-both");
          feedback.className = "error lbl-error";
        }
      }
    });
  }

  // Register Form Validation
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (
        username.length < 5 ||
        username.length > 20 ||
        password.length < 5 ||
        password.length > 20
      ) {
        event.preventDefault();
        if (feedback) {
          feedback.textContent = t(
            "err-length",
            "Username and password must be between 5 and 20 characters.",
          );
          feedback.setAttribute("data-i18n", "err-length");
          feedback.className = "error";
        }
        return;
      }

      const hasLetter = /[a-zA-Z]/.test(username);
      const hasNumber = /[0-9]/.test(username);
      if (!hasLetter || !hasNumber) {
        event.preventDefault();
        if (feedback) {
          feedback.textContent = t(
            "err-letter-number",
            "Username must contain at least one letter and one number.",
          );
          feedback.setAttribute("data-i18n", "err-letter-number");
          feedback.className = "error";
        }
        return;
      }

      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasDigit = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/.test(
        password,
      );
      if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar) {
        event.preventDefault();
        if (feedback) {
          feedback.textContent = t(
            "err-special-char",
            "Password must contain a lowercase, uppercase, number, and special character.",
          );
          feedback.setAttribute("data-i18n", "err-special-char");
          feedback.className = "error";
        }
        return;
      }
    });
  }

  // Booking Form & Date Restriction
  const dateInput = document.getElementById("date"); // Find id="date" in the booking form
  if (dateInput) {
    // Checks if date input exists on current page
    const today = new Date().toISOString().split("T")[0]; // Gets today's date
    dateInput.min = today; // Sets the minimum date to today
  }

  const bookingBack = document.getElementById("booking-back");
  if (bookingBack) {
    bookingBack.addEventListener("click", (e) => {
      e.preventDefault();
      history.back();
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

      const date = document.getElementById("date").value;
      const today = new Date().toISOString().split("T")[0];
      if (date < today) {
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
