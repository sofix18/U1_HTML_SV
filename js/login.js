document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('error-message');

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                const user = data.user || (data.data && data.data.user);
                const token = data.token || (data.data && data.data.token);

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                // Sacamos el rol real
                const role = (user.role || "").toLowerCase().trim();

                // --- REDIRECCIÓN SEGÚN PERMISOS ---
                if (role === 'admin' || email.includes('admin')) {
                    // El Admin es el único que ve la tabla de gestión
                    window.location.href = 'dashboard_administrador.html';
                } 
                else if (role === 'coach' || email.includes('coach')) {
                    // El Coach va a su panel (que no tiene la tabla de eliminar usuarios)
                    window.location.href = 'dashboard_coach.html';
                } 
                else {
                    // El resto (clientes/usuarios) a su panel básico
                    window.location.href = 'dashboard_usuario.html';
                }

            } else {
                errorMessage.textContent = data.message || "Acceso denegado";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Error crítico:", error);
            alert("Error de comunicación con el backend.");
        }
    });
});