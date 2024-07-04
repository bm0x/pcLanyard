// usuarios.js
const obtenerUsuarios = () => {
    const usuarios = localStorage.getItem('usuarios');
    return usuarios ? JSON.parse(usuarios) : {
        "ljorquera": { nombre:"Larry", apellido:"Jorquera", contraseña:"larry2024@", rol: "usuario" },
        "rmendez": { nombre: "Rafael", apellido: "Méndez", contraseña: "holasoybm0x28", rol: "admin" },
        "csanmartin": { nombre: "Carolina", apellido: "San Martín", contraseña: "lan2024@", rol: "admin" }
    };
};

const actualizarUsuarios = (usuarios) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
};

// Inicializar usuarios
let usuarios = obtenerUsuarios();
