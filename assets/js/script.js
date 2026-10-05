document.addEventListener("DOMContentLoaded", () => {
  console.log("hola, estoy cargado");

  const feedback = document.getElementById("feedback");
  const params = new URLSearchParams(window.location.search);

  if (feedback) {
    if (params.has("error")) {
      feedback.textContent = params.get("error");
      feedback.className = "error";
    } else if (params.has("success")) {
      feedback.textContent = params.get("success");
      feedback.className = "success";
    }
  }

  // Login Form Validation
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value;

      if (!username || !password) {
        event.preventDefault();
        if (feedback) {
          feedback.textContent = "Please fill in both username and password.";
          feedback.className = "error";
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
          feedback.textContent =
            "Username and password must be between 5 and 20 characters.";
          feedback.className = "error";
        }
        return;
      }

      const hasLetter = /[a-zA-Z]/.test(username);
      const hasNumber = /[0-9]/.test(username);
      if (!hasLetter || !hasNumber) {
        event.preventDefault();
        if (feedback) {
          feedback.textContent =
            "Username must contain at least one letter and one number.";
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
          feedback.textContent =
            "Password must contain a lowercase, uppercase, number, and special character.";
          feedback.className = "error";
        }
        return;
      }
    });
  }

  // Booking Form
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
      document.getElementById("success-name").textContent =
        "Name: " + nameInput.value;
      document.getElementById("success-date").textContent = "Date: " + date;
      bookingForm.style.display = "none";
      document.getElementById("booking-success").style.display = "flex";
    });
  }
});
