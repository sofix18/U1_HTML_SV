document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Capturar todos los campos
            const name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-password-confirm').value;
            const role = document.getElementById('reg-role').value; // El nuevo campo de Rol
            const nivel = document.getElementById('nivel').value; // Nivel de condición física

            // 2. Validaciones básicas
            if (password !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Las contraseñas no coinciden'
                });
                return;
            }

            // 3. Preparar el objeto para la API (Payload)
            const payload = {
                full_name: name,
                email: email,
                password: password,
                role: role, // Importante: enviamos 'coach', 'admin' o 'user'
                fitness_level: nivel // Por si tu API lo requiere
            };

            try {
                // 4. Petición al Backend
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok) {
                    // Éxito: Guardamos registro y redirigimos
                    Swal.fire({
                        icon: 'success',
                        title: '¡Usuario Creado!',
                        text: `El usuario ${name} ha sido registrado como ${role.toUpperCase()}`,
                        confirmButtonColor: '#302b63'
                    }).then(() => {
                        // Redirigimos al dashboard para ver la tabla actualizada
                        window.location.href = 'dashboard_administrador.html';
                    });
                } else {
                    // Error de la API (ej: el correo ya existe)
                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo registrar',
                        text: data.message || 'Error en los datos enviados'
                    });
                }

            } catch (error) {
                console.error("Error en registro:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'Asegúrate de que el backend esté encendido (npm run dev)'
                });
            }
        });
    }
});