// 1. Configuración de la API 
// Antes decía /api/login, ahora debe decir /api/auth/login
const API_URL = "http://localhost:3000/api/auth/login";

// Usuarios de respaldo (Para que tu login funcione aunque no haya internet/API)
const usersFallback = [
    { user: "usuario@sportclub.cl", password: "1234", role: "user", name: "Kiara Espinosa" }, 
    { user: "coach@sportclub.cl", password: "1234", role: "coach", name: "Claudio Diaz" },
    { user: "administrador@sportclub.cl", password: "1234", role: "admin", name: "Admin Central" }
];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('email').value.trim();
            const passwordInput = document.getElementById('password').value.trim();
            const errorMessage = document.getElementById('error-message');

            // Limpiar mensaje de error previo
            errorMessage.style.display = "none";

            try {
                // --- INTENTO DE CONEXIÓN CON LA API (DINÁMICO) ---
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        email: emailInput, 
                        password: passwordInput 
                    })
                });

                if (response.ok) {
                    const result = await response.json();
                    
                    // GUARDAR EN LOCALSTORAGE (Lo que te faltaba en la foto)
                    // Punto 2.1.3 de la rúbrica
                    localStorage.setItem("user", JSON.stringify(result.user));
                    
                    // Redirección Dinámica
                    ejecutarRedireccion(result.user.role);
                    return; // Detiene el código aquí si la API funcionó
                }
            } catch (error) {
                console.warn("API no detectada o apagada. Usando validación local.");
            }

            // --- RESPALDO: VALIDACIÓN CON TU LISTA (MEZCLA) ---
            const foundUser = usersFallback.find(u => u.user === emailInput && u.password === passwordInput);

            if (foundUser) {
                // Guardamos los datos locales para que el dashboard no salga vacío
                localStorage.setItem("user", JSON.stringify(foundUser));
                ejecutarRedireccion(foundUser.role);
            } else {
                // MOSTRAR ERROR (Punto 2.1.2 de la rúbrica)
                errorMessage.textContent = "Usuario o contraseña incorrectos";
                errorMessage.style.display = "block";
            }
        });
    }
});

// Función para manejar las rutas según el rol
function ejecutarRedireccion(role) {
    if (role === "admin") {
        window.location.href = "dashboard_administrador.html";
    } else if (role === "coach") {
        window.location.href = "dashboard_coach.html";
    } else {
        window.location.href = "dashboard_usuario.html";
    }
}