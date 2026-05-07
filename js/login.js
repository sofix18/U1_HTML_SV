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
                    const user = data.data.user;
                    const token = data.data.token;
                    
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));

                    const role = (user.role || user.rol || "").toLowerCase();

                    if (role.includes('coach') || user.email.includes('coach')) {
                        window.location.href = 'dashboard_coach.html';
                    } else if (role.includes('admin') || user.email.includes('admin')) {
                        window.location.href = 'dashboard_administrador.html';
                    } else {
                        window.location.href = 'dashboard_usuario.html';
                    }
                } else {
                    errorMessage.textContent = data.message || "Credenciales inválidas";
                    errorMessage.style.display = "block";
                }
            } catch (error) {
                console.error("Error:", error);
                errorMessage.textContent = "Servidor apagado. Ejecuta npm run dev";
                errorMessage.style.display = "block";
            }
        });
    }
});