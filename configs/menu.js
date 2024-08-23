// Archivo: script.js

// Función para verificar si el usuario tiene un rol específico
function hasRole(requiredRole) {
    const userRole = localStorage.getItem('rol');
    return userRole === 'admin' || userRole === 'root' || userRole === requiredRole;
  }
  
  // Función para abrir los ajustes
  function openSettings() {
    if (window.Android) {
      window.Android.openSettings();
    } else {
      alert("La interfaz Android no está disponible.");
    }
  }
  
  // Función para redireccionar a una página específica
  function redirectTo(page) {
    window.location.href = page;
  }
  
  // Verifica si el usuario actual puede acceder a Mantenimiento de Imágenes
  function verificaRolMi() {
    if (hasRole('admin')) {
      redirectTo('mantImagenes.html');
    } else {
      alert("Ups! No puedes acceder porque no eres administrador.");
    }
  }
  
  // Verifica si el usuario actual puede abrir los ajustes
  function verificaRolSettings() {
    if (hasRole('admin') || hasRole('root')) {
      openSettings();
    } else {
      alert("Ups! No puedes acceder porque no eres administrador.");
    }
  }
  
  // Verifica si el usuario actual puede acceder al actualizador
  function verificaRolUpdater() {
    if (hasRole('admin') || hasRole('root')) {
      redirectTo('updater.html');
    } else {
      alert("Ups! No puedes acceder porque no eres administrador.");
    }
  }
  
  // Verifica si el usuario actual es root
  function verificaRolRoot() {
    if (hasRole('root')) {
      redirectTo('menu_apis.html');
    } else {
      alert("Ups! No eres Superusuario. Solo rmendez puede acceder a este módulo.");
    }
  }
  
  // Obtener la versión desde un archivo de configuración (si es necesario)
  const version = CONFIG.version_number;
  
  // Mostrar la versión en el HTML
  document.getElementById("verNum").innerHTML = version;
  
  // Inicializar la aplicación
  function init() {
    // Aquí puedes agregar lógica adicional para verificar el rol del usuario al cargar la página
    // y redireccionarlo a la pantalla correspondiente si ya está autenticado
  }
  
  init();