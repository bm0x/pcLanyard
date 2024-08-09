function goFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
}

// Wait 5 seconds and then enter fullscreen
setTimeout(goFullscreen, 5000);