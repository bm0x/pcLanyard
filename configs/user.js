const saludoElement = document.getElementById('saludoUser');
const nombreUsuario = localStorage.getItem('usuario');
const saludoNick = document.getElementById('saludoNick');
const nickUsuario = localStorage.getItem('nick');


if (nombreUsuario) {
  saludoElement.textContent = `Bienvenid@, ${nombreUsuario}`;
  saludoNick.textContent = `Usuario: ${nickUsuario}`;
} else {
  saludoElement.textContent = `Bienvenido, No has Iniciado Sesión`;
  // Redirigir al login si no hay usuario almacenado
  alert("Usted no está logueado a la Intranet de pcFactory Lanyard \nPor favor Inicie Sesión.");
  //Android.showAlert("Usted no está logueado a la Intranet de pcFactory Lanyard \nPor favor Inicie Sesión.");
  window.location.href = "login.html";
}


function cerrarSesion() {
    localStorage.removeItem('usuario');
    alert("Has Salido Exitosamente del sistema \nVolverás al login.");
    //Android.showAlert("Has Salido Exitosamente del sistema \nVolverás al login.");
    window.location.href = "login.html";
}