const formularioRegistro = document.getElementById('formulario-registro');

const registrarUsuario = (nombreUsuario, nombre, apellido, contraseña) => {
    usuarios = obtenerUsuarios();
    if (usuarios.hasOwnProperty(nombreUsuario)) {
        return false;
    }
    usuarios[nombreUsuario] = { nombre, apellido, contraseña, rol: "usuario" };
    actualizarUsuarios(usuarios);
    return true;
};

formularioRegistro.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombre_usuario_registro').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const contrasena = document.getElementById('contrasena_registro').value.trim();
    const confirmarContrasena = document.getElementById('confirmar_contrasena').value.trim();

    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    if (registrarUsuario(nombreUsuario, nombre, apellido, contrasena)) {
        alert("Usuario registrado exitosamente.");
        formularioRegistro.reset();
    } else {
        alert("El nombre de usuario ya existe.");
    }
});