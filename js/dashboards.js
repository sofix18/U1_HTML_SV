const API_REGISTER_URL = "http://localhost:3000/api/auth/register";

window.onload = () => {
    cargarTabla();

    // Referencias seguras
    const UI = {
        btnNuevo: document.getElementById('btnNuevoUsuario'),
        modalNuevo: document.getElementById('modalUsuario'),
        btnCerrarNuevo: document.getElementById('btnCerrarModal'),
        formNuevo: document.getElementById('formNuevoUsuario'),
        modalBorrar: document.getElementById('modalEliminar'),
        btnSiBorrar: document.getElementById('confirmarBorradoBtn'),
        btnNoBorrar: document.getElementById('cancelarBorradoBtn'),
        displayNombre: document.getElementById('userNameDisplay')
    };

    // Saludo
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && UI.displayNombre) UI.displayNombre.textContent = user.name;

    // Abrir/Cerrar Nuevo Usuario
    if(UI.btnNuevo) UI.btnNuevo.onclick = () => UI.modalNuevo.style.display = 'flex';
    if(UI.btnCerrarNuevo) UI.btnCerrarNuevo.onclick = () => UI.modalNuevo.style.display = 'none';

    // Guardar (Registro)
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
                if(res.ok) alert("Registrado en API");
            } catch (err) {
                let locales = JSON.parse(localStorage.getItem('usuarios_local')) || [];
                locales.push({...data, id: Date.now()});
                localStorage.setItem('usuarios_local', JSON.stringify(locales));
            }
            UI.modalNuevo.style.display = 'none';
            UI.formNuevo.reset();
            cargarTabla();
        };
    }

    // Borrado
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
            cargarTabla();
        };
    }

    if(UI.btnNoBorrar) UI.btnNoBorrar.onclick = () => UI.modalBorrar.style.display = 'none';
};

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
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td><span style="background:#eee; padding:4px 8px; border-radius:4px; font-weight:bold;">${u.role}</span></td>
            <td>11-05-2026</td>
            <td><button onclick="prepararBorrado(${u.id})" style="background:#dc3545; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Eliminar</button></td>
        </tr>
    `).join('');
}