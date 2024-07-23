const formularioLogin = document.getElementById('formulario-login');
        const nombreUsuarioInput = document.getElementById('nombre_usuario');
        const contrasenaInput = document.getElementById('contrasena');

        formularioLogin.addEventListener('submit', (event) => {
            event.preventDefault();

const nombreUsuario = nombreUsuarioInput.value.trim();
const contrasena = contrasenaInput.value.trim();
usuarios = obtenerUsuarios();

if (usuarios.hasOwnProperty(nombreUsuario) && usuarios[nombreUsuario].contraseña === contrasena) {
    const usuario = usuarios[nombreUsuario];
    const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;
    localStorage.setItem('usuario', nombreCompleto);
    localStorage.setItem('nick', nombreUsuario);
    localStorage.setItem('rol', usuario.rol);
    window.location.href = "menu_admin.html";
} 
else {
    alert("Usuario o contraseña incorrectos.");
}});

function vueltaMenu() {
    window.location.href = "menu.html";
}