// Funciones de apertura de módulos

// Función separada de apertura de Ajustes.

function openSettings() {
    if (window.Android) {
        window.Android.openSettings();
    } else {
        alert("La interfaz Android no está disponible.");
    }
}

 // Verifica si el usuario actual es admin
 function verificaRolMi(){
    const rol = localStorage.getItem('rol');
        if (rol !== 'admin') {
            alert("Ups! \nno puedes acceder porque no eres administrador");
        }
        else if (rol === 'admin' || rol === 'root') {
            window.location.href = "mantImagenes.html";
        }
}

// Verifica si el usuario actual es admin
function verificaRolSettings(){
    const rol = localStorage.getItem('rol');
        if (rol !== 'admin') {
            alert("Ups! \nno puedes acceder porque no eres administrador");
        }
        else if (rol === 'admin' || rol === 'root') {
            openSettings();
        }
}

 // Verifica si el usuario actual es admin
 function verificaRolUpdater(){
    const rol = localStorage.getItem('rol');
        if (rol !== 'admin') {
            alert("Ups! \nno puedes acceder porque no eres administrador");
        }
        else if (rol === 'admin' || rol === 'root') {
            window.location.href = "updater.html";
        }
}

// Verifica si el usuario actual es root
function verificaRolRoot(){
    const rol = localStorage.getItem('rol');
        if (rol !== 'root') {
            alert("Ups! no eres Superusuario. \nsolo rmendez puede acceder a este módulo.");
        }
        else if (rol === 'root') {
            window.location.href = "menu_apis.html";
        }
}

// Control de Versiones

const version = CONFIG.version_number;

document.getElementById("verNum").innerHTML = version;