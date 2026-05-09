document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // 1. CARGAR DATOS Y FOTO
    if (user) {
        document.getElementById('sideName').textContent = user.full_name;
        document.getElementById('sideEmail').textContent = user.email;
        document.getElementById('inputName').value = user.full_name;
        document.getElementById('inputEmail').value = user.email;
        
        const photo = localStorage.getItem('user_photo');
        if (photo) {
            setProfilePic(photo);
        } else {
            updateInitials(user.full_name);
        }
    }

    // 2. MENÚ DE FOTO
    const btnMenu = document.getElementById('btnShowMenu');
    const menu = document.getElementById('photoMenu');
    btnMenu.onclick = (e) => { 
        e.stopPropagation(); 
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; 
    };
    document.onclick = () => menu.style.display = 'none';

    // 3. OPCIÓN GALERÍA
    const input = document.createElement('input'); 
    input.type = 'file'; 
    input.accept = 'image/*';
    document.getElementById('optionGallery').onclick = () => input.click();
    input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (ev) => saveAndSync(ev.target.result);
        reader.readAsDataURL(e.target.files[0]);
    };

    // 4. OPCIÓN CÁMARA
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('video');
    document.getElementById('optionCamera').onclick = async () => {
        modal.style.display = 'flex';
        video.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
    };
    document.getElementById('snap').onclick = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth; 
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        saveAndSync(canvas.toDataURL('image/png'));
        closeCam();
    };
    document.getElementById('closeCamera').onclick = closeCam;

    function closeCam() { 
        if (video.srcObject) video.srcObject.getTracks().forEach(t => t.stop()); 
        modal.style.display = 'none'; 
    }

    // 5. OPCIÓN ELIMINAR
    document.getElementById('optionDelete').onclick = () => {
        localStorage.removeItem('user_photo');
        updateInitials(user.full_name);
        showToast("Foto eliminada correctamente");
    };

    // FUNCIONES COMPARTIDAS
    function saveAndSync(base64) {
        setProfilePic(base64);
        localStorage.setItem('user_photo', base64);
        showToast("Foto actualizada");
    }

    function setProfilePic(src) {
        const div = document.getElementById('userInitials');
        div.innerHTML = `<img src="${src}" style="width:100%; height:100%; object-fit:cover;">`;
    }

    function updateInitials(name) {
        const ini = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        document.getElementById('userInitials').textContent = ini;
    }

    // 6. EVENTOS DE BOTONES ACCIÓN
    document.getElementById('btnGuardar').onclick = () => {
        showToast("Perfil actualizado con éxito");
    };

    document.getElementById('btnPass').onclick = () => {
        const p1 = document.getElementById('newPass').value;
        const p2 = document.getElementById('confirmPass').value;
        if(p1 === "" || p1 !== p2) {
            showToast("Las claves no coinciden o están vacías", "error");
        } else {
            showToast("Contraseña actualizada con éxito");
            document.getElementById('newPass').value = "";
            document.getElementById('confirmPass').value = "";
        }
    };
});

// FUNCIÓN DE MENSAJES (TOAST)
function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${type === 'success' ? '✅' : '❌'}</span> ${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => { 
        toast.classList.remove('show'); 
        setTimeout(() => toast.remove(), 500); 
    }, 3000);
}