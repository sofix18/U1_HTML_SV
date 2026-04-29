document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const full_name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value.trim();

            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        full_name, 
                        email, 
                        password,
                        role: 'user' // Agregamos el rol por defecto
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    alert("¡Registro exitoso!");
                    window.location.href = 'login.html';
                } else {
                    alert(data.message || "Error en los datos");
                }
            } catch (error) {
                alert("Servidor no responde");
            }
        });
    }
});