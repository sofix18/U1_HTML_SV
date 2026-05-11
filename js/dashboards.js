const API_REGISTER_URL = "http://localhost:3000/api/auth/register";

// --- PARTE 1: FUNCIONES GLOBALES (Para que el botón de la tabla las vea) ---

window.prepararEdicion = (id) => {
    // Buscamos al usuario en la memoria local o la base
    const locales = JSON.parse(localStorage.getItem('usuarios_local')) || [];
    const base = [
        { id: 1, name: "Claudio Diaz", email: "coach@sportclub.cl", role: "coach" },
        { id: 2, name: "Kiara Espinosa", email: "usuario@sportclub.cl", role: "user" }
    ];
    const u = [...base, ...locales].find(user => user.id == id);

    if (u) {
        // Llenamos el formulario de editar
        document.getElementById('editId').value = u.id;
        document.getElementById('editNombre').value = u.name;
        document.getElementById('editEmail').value = u.email;
        document.getElementById('editRol').value = u.role;
        // Mostramos el modal
        document.getElementById('modalEditar').style.display = 'flex';
    }
};

window.prepararBorrado = (id) => {
    window.idParaBorrar = id; // Guardamos el ID globalmente un momento
    document.getElementById('modalEliminar').style.display = 'flex';
};

// --- PARTE 2: LÓGICA DE CARGA (Cuando la página abre) ---

window.onload = () => {
    cargarTabla();

    const UI = {
        btnLogout: document.getElementById('btnLogout'),
        btnNuevo: document.getElementById('btnNuevoUsuario'),
        modalNuevo: document.getElementById('modalUsuario'),
        btnCerrarNuevo: document.getElementById('btnCerrarModal'),
        formNuevo: document.getElementById('formNuevoUsuario'),
        // Editar
        modalEditar: document.getElementById('modalEditar'),
        formEditar: document.getElementById('formEditarUsuario'),
        btnCerrarEditar: document.getElementById('btnCerrarEditar'),
        // Borrar
        modalBorrar: document.getElementById('modalEliminar'),
        btnSiBorrar: document.getElementById('confirmarBorradoBtn'),
        btnNoBorrar: document.getElementById('cancelarBorradoBtn')
    };

    // Cerrar Sesión
    if (UI.btnLogout) {
        UI.btnLogout.onclick = () => {
            localStorage.clear();
            window.location.href = 'login.html';
        };
    }

    // Nuevo Usuario
    if (UI.btnNuevo) UI.btnNuevo.onclick = () => UI.modalNuevo.style.display = 'flex';
    if (UI.btnCerrarNuevo) UI.btnCerrarNuevo.onclick = () => UI.modalNuevo.style.display = 'none';

    // Guardar Edición
    if (UI.formEditar) {
        UI.formEditar.onsubmit = (e) => {
            e.preventDefault();
            const id = document.getElementById('editId').value;
            let locales = JSON.parse(localStorage.getItem('usuarios_local')) || [];
            
            const index = locales.findIndex(u => u.id == id);
            const actualizado = {
                id: parseInt(id),
                name: document.getElementById('editNombre').value,
                email: document.getElementById('editEmail').value,
                role: document.getElementById('editRol').value
            };

            if (index !== -1) locales[index] = actualizado;
            else locales.push(actualizado);

            localStorage.setItem('usuarios_local', JSON.stringify(locales));
            UI.modalEditar.style.display = 'none';
            cargarTabla();
        };
    }
    if (UI.btnCerrarEditar) UI.btnCerrarEditar.onclick = () => UI.modalEditar.style.display = 'none';

    // Confirmar Borrado
    if (UI.btnSiBorrar) {
        UI.btnSiBorrar.onclick = () => {
            let locales = JSON.parse(localStorage.getItem('usuarios_local')) || [];
            locales = locales.filter(u => u.id !== window.idParaBorrar);
            localStorage.setItem('usuarios_local', JSON.stringify(locales));
            UI.modalBorrar.style.display = 'none';
            cargarTabla();
        };
    }
    if (UI.btnNoBorrar) UI.btnNoBorrar.onclick = () => UI.modalBorrar.style.display = 'none';
};

function cargarTabla() {
    const tabla = document.getElementById('tablaUsuariosBody');
    if (!tabla) return;
    const base = [
        { id: 1, name: "Claudio Diaz", email: "coach@sportclub.cl", role: "coach" },
        { id: 2, name: "Kiara Espinosa", email: "usuario@sportclub.cl", role: "user" }
    ];
    const adicionales = JSON.parse(localStorage.getItem('usuarios_local')) || [];
    const lista = [...base, ...adicionales];

    tabla.innerHTML = lista.map(u => `
        <tr>
            <td>${u.id}</td>
            <td style="padding:12px;">${u.name}</td>
            <td>${u.email}</td>
            <td><strong>${u.role}</strong></td>
            <td>11-05-2026</td>
            <td>
                <button onclick="prepararEdicion(${u.id})" style="background:#f39c12; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer;">Editar</button>
                <button onclick="prepararBorrado(${u.id})" style="background:#dc3545; color:white; border:none; padding:8px; border-radius:5px; cursor:pointer;">Borrar</button>
            </td>
        </tr>
    `).join('');
}