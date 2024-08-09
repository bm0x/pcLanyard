function goFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}

// Reproduce un video en silencio para intentar habilitar fullscreen
const video = document.getElementById('hidden-video');
video.src = './video/videoplayback.mp4'; // Ruta a un pequeño video
video.play().then(() => {
    // Intenta entrar en fullscreen después de que el video comience a reproducirse
    setTimeout(goFullscreen, 1000);
}).catch(error => {
    console.log('Error al reproducir el video:', error);
});