// usuarios.js
const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : {
        "rmendez": { nombre: "Rafael", apellido: "Méndez", contraseña: "holasoybm0x28", rol: "root" },
        "csanmartin": { nombre: "Carolina", apellido: "San Martín", contraseña: "lan2024@", rol: "admin" },
        "rsanchez": { nombre: "Rodrigo", apellido: "Sánchez", contraseña: "r0d02024@", rol: "admin" },
    };
};

const actualizarUsuarios = (usuarios) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

// Inicializar usuarios
let usuarios = obtenerUsuarios();
