// Bloquear el botón de retroceso del navegador
window.addEventListener('popstate', function (event) {
    history.pushState(null, null, window.location.href);
});

// Método que se llamará desde Android para ir atrás
function goBack() {
    window.history.back();
}