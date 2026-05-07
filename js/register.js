document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const full_name = document.getElementById('reg-name').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value.trim();
            const passwordConfirm = document.getElementById('reg-password-confirm').value.trim(); // NUEVO: Captura el segundo campo

            // NUEVO: Validación de igualdad
            if (password !== passwordConfirm) {
                Swal.fire({
                    title: '¡Error!',
                    text: 'Las contraseñas no coinciden. Inténtalo de nuevo.',
                    icon: 'error',
                    confirmButtonColor: '#4b1d6e',
                    confirmButtonText: 'Corregir'
                });
                return; // Importante: detiene el envío si no coinciden
            }

            try {
                const response = await fetch('http://localhost:3000/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        full_name, 
                        email, 
                        password,
                        role: 'user' 
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: '¡Registro Exitoso!',
                        text: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
                        icon: 'success',
                        confirmButtonColor: '#4b1d6e',
                        confirmButtonText: 'Ir al inicio'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = 'login.html';
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Error en el registro',
                        text: data.message || "Verifica los datos ingresados",
                        icon: 'error',
                        confirmButtonText: 'Reintentar'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Sin conexión',
                    text: 'El servidor no responde. ¿Encendiste el Backend?',
                    icon: 'warning',
                    confirmButtonText: 'Entendido'
                });
            }
        });
    }
});