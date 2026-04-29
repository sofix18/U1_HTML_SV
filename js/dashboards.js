document.addEventListener('DOMContentLoaded', () => { 
    //Recuperar datos del usuario desde el localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    //Mostrar el nombre real en el Dashboard
    const nameDisplay = document.getElementById('userNameDisplay');
    if (user && user.full_name && nameDisplay) {
        nameDisplay.textContent = user.full_name;
    }

    //Configurar el botón de Cerrar Sesión
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Limpia toda la sesión
            localStorage.clear(); 
            
            // Redirige al login de inmediato
            window.location.href = 'login.html';
        });
    }
});