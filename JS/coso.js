console.log("hola, estoy cargado")

var form = document.getElementById('registerForm');


form.addEventListener('submit', function(e) {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var feedback = document.getElementById('feedback');
    if (
                username.length < 5 || username.length > 20 ||
                password.length < 5 || password.length > 20
        ) {
            e.preventDefault();
            if (feedback) {
            feedback.textContent = "Username and password must be between 5 and 20 characters.";
            feedback.className = "error";
        }
        return;
    }
});

