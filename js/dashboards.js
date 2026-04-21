document.addEventListener("DOMContentLoaded", () => {
    // Recuperar el usuario del localStorage
    const sessionData = localStorage.getItem("user");
    const user = JSON.parse(sessionData);

    // 2. Seguridad: Si no hay usuario, expulsar al login
    if (!user) {
        window.location.href = "index.html";
        return;
    }

    //  Personalización: Buscar el ID 'userNameDisplay' y escribir el nombre
    const nameDisplay = document.getElementById("userNameDisplay");
    if (nameDisplay) {
        nameDisplay.textContent = user.name;
    }

    //  Lógica de Logout: Buscar el botón de cerrar sesión
    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener("click", (e) => {
            e.preventDefault(); // Evitar que el enlace navegue antes de limpiar
            
            // Limpiar datos y redirigir
            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    }
});