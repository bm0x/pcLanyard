// Funciones de apertura de módulos

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
        else {
            alert("Aplicación Ajustes no compatible.");
        }
}

// Control de Versiones

const version = CONFIG.version_number;

document.getElementById("verNum").innerHTML = version;