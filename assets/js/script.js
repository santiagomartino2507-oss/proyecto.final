
document.addEventListener("DOMContentLoaded", () => {
    //  Feedback for both register.html and login.html
    const feedback = document.getElementById("feedback");
    const params = new URLSearchParams(window.location.search);

    // Check whether query string is (?error= or ?success=)
    if (params.has("error")) {
        feedback.textContent = params.get("error");
        feedback.className = "error";
    } else if (params.has("success")) {
        feedback.textContent = params.get("success");
        feedback.className = "success";
    }

    //  Registration Form Validation 
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Username validation checking if it has lowercase, uppercase and a number
            const hasLetter = /[a-zA-Z]/.test(username); 
            const hasNumber = /[0-9]/.test(username); 

            if (!hasLetter || !hasNumber) {
                event.preventDefault(); // prevent empty submission
                feedback.textContent = "Username must contain at least one letter and one number.";
                feedback.className = "error";
                return; 
            }

            // Password validation checking if password has lowercase, uppercase a number and a symbol
            const hasLowercase = /[a-z]/.test(password); 
            const hasUppercase = /[A-Z]/.test(password); 
            const hasDigit = /[0-9]/.test(password); 
            const hasSpecialChar = /[!@#\$%\^&\*\(\)_\+\-=\[\]{};':"\\|,.<>\/?]/.test(password); 

            if (!hasLowercase || !hasUppercase || !hasDigit || !hasSpecialChar) {
                event.preventDefault(); // prevent empty submission
                feedback.textContent = "Password must contain a lowercase, uppercase, number, and special character.";
                feedback.className = "error";
                return;
            }
            
            // If it reaches here, the form submits normally to register.php
        });
    }
});