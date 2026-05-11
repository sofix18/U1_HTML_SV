document.addEventListener('DOMContentLoaded', () => { 
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    // Mostrar nombre del usuario logueado
    const nameDisplay = document.getElementById('userNameDisplay');
    if (user && user.full_name && nameDisplay) {
        nameDisplay.textContent = user.full_name;
    }

    // Cargar la tabla si es personal autorizado (Admin o Coach)
    const role = (user.role || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    if (role === 'admin' || role === 'coach' || email.includes('admin') || email.includes('coach')) {
        cargarUsuarios();
    }

    // Lógica del botón de Logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear(); 
            window.location.href = 'login.html';
        });
    }

    // Botón para ir al registro (Nuevo Usuario)
    const btnNuevo = document.getElementById('btnNuevoUsuario');
    if (btnNuevo) {
        btnNuevo.addEventListener('click', () => {
            localStorage.removeItem('editUser');
            window.location.href = 'register.html'; 
        });
    }
});

async function cargarUsuarios() {
    const token = localStorage.getItem('token');
    const tablaCuerpo = document.getElementById('tablaUsuariosBody');
    if (!tablaCuerpo) return;

    try {
        const res = await fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-cache'
            }
        });

        const data = await res.json();
        const usuarios = Array.isArray(data) ? data : (data.users || data.data || []);

        tablaCuerpo.innerHTML = ''; 
        
        usuarios.forEach(u => {
            const fecha = u.createdAt ? new Date(u.createdAt).toLocaleDateString('es-CL') : 'N/A';
            const uRole = (u.role || "").toLowerCase();
            const uEmail = (u.email || "").toLowerCase();

            // --- LÓGICA DE COLORES FORZADA ---
            let colorFondo = '#007bff'; // Azul por defecto (User)
            let textoMostrar = 'USER';

            if (uRole === 'admin' || uEmail.includes('admin')) {
                colorFondo = '#4b1d6e'; // Morado
                textoMostrar = 'ADMIN';
            } else if (uRole === 'coach' || uEmail.includes('coach')) {
                colorFondo = '#dc3545'; // Rojo
                textoMostrar = 'COACH';
            }

            tablaCuerpo.innerHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td><strong>${u.full_name || 'Sin nombre'}</strong></td>
                    <td>${u.email}</td>
                    <td>
                        <span style="background:${colorFondo}; color:white; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:bold; display:inline-block; min-width:70px; text-align:center;">
                            ${textoMostrar}
                        </span>
                    </td>
                    <td>${fecha}</td>
                    <td>
                        <button class="btn-action" style="background:#ffc107; border:none; padding:5px 8px; border-radius:4px; cursor:pointer; margin-right:5px;" onclick='prepararEdicion(${JSON.stringify(u)})'>✏️</button>
                        <button class="btn-action" style="background:#dc3545; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;" onclick="eliminarUsuario(${u.id})">🗑️</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Error cargando usuarios:", error);
    }
}

// Funciones para el CRUD
window.prepararEdicion = function(usuario) {
    localStorage.setItem('editUser', JSON.stringify(usuario));
    window.location.href = 'register.html';
}

// --- Versión del mensaje eliminar ---
window.eliminarUsuario = function(id) {
    const modal = document.getElementById('modalEliminar');
    const btnSi = document.getElementById('confirmarSi');
    const btnNo = document.getElementById('confirmarNo');

    // Mostrar el modal
    modal.style.display = 'flex';

    // Si el usuario se arrepiente
    btnNo.onclick = () => {
        modal.style.display = 'none';
    };

    // Si el usuario confirma
    btnSi.onclick = async () => {
        modal.style.display = 'none';
        const token = localStorage.getItem('token');
        
        try {
            const res = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.ok) {
                cargarUsuarios(); // Recarga la tabla
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };
};