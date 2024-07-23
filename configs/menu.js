// Funciones de apertura de módulos

// Saludo Menu Principal

const hi1 = CONFIG.saludo1;
const hi2 = CONFIG.saludo2;

document.getElementById("saludoMenu").innerHTML = hi1;
document.getElementById("saludoMenu2").innerHTML = hi2;

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
            alert("No tienes permiso para acceder a este módulo ya que no tienes rol de Administrador.");
        }
        else if (rol === 'admin') {
            window.location.href = "mantImagenes.html";
        }
}

// Verifica si el usuario actual es admin
function verificaRolSettings(){
    const rol = localStorage.getItem('rol');
        if (rol !== 'admin') {
            alert("No tienes permiso para acceder a este módulo ya que no tienes rol de Administrador.");
        }
        else if (rol === 'admin') {
            openSettings();
        }
}

 // Verifica si el usuario actual es admin
 function verificaRolUpdater(){
    const rol = localStorage.getItem('rol');
        if (rol !== 'admin') {
            alert("No tienes permiso para acceder a este módulo ya que no tienes rol de Administrador.");
        }
        else if (rol === 'admin') {
            window.location.href = "updater.html";
        }
}

// Control de Versiones

const version = CONFIG.version_number;

document.getElementById("verNum").innerHTML = version;