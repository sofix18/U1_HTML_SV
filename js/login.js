document.addEventListener('DOMContentLoaded', () => { 
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorMessage = document.getElementById('error-message');

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (data.ok) {
                    // Guardamos token y datos del usuario
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('user', JSON.stringify(data.data.user));

                    // Redirección por ROL según la API
                    const role = data.data.user.role;
                    if (role === 'admin') {
                        window.location.href = 'dashboard_administrador.html';
                    } else if (role === 'coach') {
                        window.location.href = 'dashboard_coach.html';
                    } else if (role === 'user') {
                        window.location.href = 'dashboard_usuario.html';
                    }
                } else {
                    errorMessage.textContent = data.message || "Credenciales inválidas";
                    errorMessage.style.display = "block";
                }
            } catch (error) {
                console.error("Error:", error);
                errorMessage.textContent = "Error al conectar con el servidor";
                errorMessage.style.display = "block";
            }
        });
    }
});