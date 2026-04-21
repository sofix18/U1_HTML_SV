//  Lista de usuarios
const users = [
    { user: "usuario@sportclub.cl", password: "1234", role: "user", name: "Kiara Espinosa" }, 
    { user: "coach@sportclub.cl", password: "1234", role: "coach", name: "Claudio Diaz" },
    { user: "administrador@sportclub.cl", password: "1234", role: "admin", name: "Admin Central" }
];

// tiempo de esperar a que el HTML esté listo
document.addEventListener('DOMContentLoaded', () => { // 
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue

            // Capturar datos y limpiar espacios vacíos
            const emailInput = document.getElementById('email').value.trim();
            const passwordInput = document.getElementById('password').value.trim();
            const errorMessage = document.getElementById('error-message');

            // Buscar coincidencia
            const foundUser = users.find(u => u.user === emailInput && u.password === passwordInput);

            if (foundUser) {
                // Guardar la sesión en el navegador
                localStorage.setItem("user", JSON.stringify(foundUser));

                // 4. Redirección por ROL
                if (foundUser.role === "admin") {
                    window.location.href = "dashboard_administrador.html";
                } else if (foundUser.role === "coach") {
                    window.location.href = "dashboard_coach.html";
                } else {
                    window.location.href = "dashboard_usuario.html";
                }
            } else {
                //  mostrar el mensaje rojo
                errorMessage.textContent = "Usuario o contraseña incorrectos";
                errorMessage.style.display = "block";
            }
        });
    }
});