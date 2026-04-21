// js/dashboards.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mostrar el nombre del usuario logueado en el <span>
    const userData = JSON.parse(localStorage.getItem("user"));
    const userNameDisplay = document.getElementById('userNameDisplay');

    if (userData && userNameDisplay) {
        userNameDisplay.textContent = userData.name;
    }

    // 2. Lógica para el botón de Cerrar Sesión
    const btnLogout = document.getElementById('btnLogout');

    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que el enlace '#' recargue la página
            
            // Borramos los datos de sesión para que nadie entre sin permiso
            localStorage.removeItem("user");
            
            // Redirigimos al login
            window.location.href = "login.html";
        });
    }
});