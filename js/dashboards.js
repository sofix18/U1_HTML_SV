const API_REGISTER_URL = "http://localhost:3000/api/auth/register";

window.onload = () => {
    cargarTabla();

    // Referencias a elementos de la interfaz
    const UI = {
        btnNuevo: document.getElementById('btnNuevoUsuario'),
        modalNuevo: document.getElementById('modalUsuario'),
        btnCerrarNuevo: document.getElementById('btnCerrarModal'),
        formNuevo: document.getElementById('formNuevoUsuario'),
        modalBorrar: document.getElementById('modalEliminar'),
        btnSiBorrar: document.getElementById('confirmarBorradoBtn'),
        btnNoBorrar: document.getElementById('cancelarBorradoBtn'),
        displayNombre: document.getElementById('userNameDisplay'),
        btnLogout: document.getElementById('btnLogout') // BOTÓN CERRAR SESIÓN
    };

    // Saludo inicial
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && UI.displayNombre) UI.displayNombre.textContent = user.name;

    // --- LÓGICA CERRAR SESIÓN (AGREGADO) ---
    if (UI.btnLogout) {
        UI.btnLogout.onclick = (e) => {
            e.preventDefault();
            localStorage.clear(); // Limpia el usuario del storage
            window.location.href = 'login.html'; // Te echa al login
        };
    }

    // --- LÓGICA MODALES ---
    if(UI.btnNuevo) UI.btnNuevo.onclick = () => UI.modalNuevo.style.display = 'flex';
    if(UI.btnCerrarNuevo) UI.btnCerrarNuevo.onclick = () => UI.modalNuevo.style.display = 'none';

    // Guardar (Registro en API o Local)
    if(UI.formNuevo) {
        UI.formNuevo.onsubmit = async (e) => {
            e.preventDefault();
            const data = {
                name: document.getElementById('inputNombre').value,
                email: document.getElementById('inputEmail').value,
                password: "User123!",
                role: document.getElementById('selectRol').value
            };

            try {
                const res = await fetch(API_REGISTER_URL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                });
                if(res.ok) mostrarToast("Registrado en API", "success");
            } catch (err) {
                let locales = JSON.parse(localStorage.getItem('usuarios_local')) || [];
                locales.push({...data, id: Date.now()});
                localStorage.setItem('usuarios_local', JSON.stringify(locales));
                mostrarToast("Guardado localmente", "success");
            }
            UI.modalNuevo.style.display = 'none';
            UI.formNuevo.reset();
            cargarTabla();
        };
    }

    // --- LÓGICA BORRADO ---
    let idEliminar = null;
    window.prepararBorrado = (id) => {
        idEliminar = id;
        if(UI.modalBorrar) UI.modalBorrar.style.display = 'flex';
    };

    if(UI.btnSiBorrar) {
        UI.btnSiBorrar.onclick = () => {
            let locales = JSON.parse(localStorage.getItem('usuarios_local')) || [];
            locales = locales.filter(u => u.id !== idEliminar);
            localStorage.setItem('usuarios_local', JSON.stringify(locales));
            UI.modalBorrar.style.display = 'none';
            mostrarToast("Usuario eliminado", "error");
            cargarTabla();
        };
    }

    if(UI.btnNoBorrar) UI.btnNoBorrar.onclick = () => UI.modalBorrar.style.display = 'none';
};

// --- RENDERIZADO Y OTROS ---

function cargarTabla() {
    const tabla = document.getElementById('tablaUsuariosBody');
    if(!tabla) return;
    const base = [
        { id: 1, name: "Claudio Diaz", email: "coach@sportclub.cl", role: "coach" },
        { id: 2, name: "Kiara Espinosa", email: "usuario@sportclub.cl", role: "user" }
    ];
    const locales = JSON.parse(localStorage.getItem('usuarios_local')) || [];
    const lista = [...base, ...locales];

    tabla.innerHTML = lista.map(u => `
        <tr>
            <td>${u.id}</td>
            <td style="padding: 15px;">${u.name}</td>
            <td>${u.email}</td>
            <td><span style="background:#eee; padding:5px 10px; border-radius:6px; font-weight:bold; font-size:12px;">${u.role}</span></td>
            <td>11-05-2026</td>
            <td><button onclick="prepararBorrado(${u.id})" style="background:#dc3545; color:white; border:none; padding:8px 12px; border-radius:6px; cursor:pointer; font-weight:bold;">Eliminar</button></td>
        </tr>
    `).join('');
}

function mostrarToast(msj, tipo) {
    const container = document.getElementById('notificacionContainer');
    if(!container) return;
    const toast = document.createElement('div');
    toast.style.cssText = `background:${tipo==='success'?'#28a745':'#302b63'}; color:white; padding:15px 25px; border-radius:8px; margin-bottom:10px; box-shadow:0 5px 15px rgba(0,0,0,0.3); font-family:sans-serif;`;
    toast.innerHTML = msj;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}