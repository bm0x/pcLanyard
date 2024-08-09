document.addEventListener("DOMContentLoaded", function() {
    // Espera 5 segundos y luego intenta activar el fullscreen
    setTimeout(() => {
        // Verifica si el navegador soporta la API de Fullscreen
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari y Opera
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
        }
    }, 5000); // 5000ms = 5 segundos
});