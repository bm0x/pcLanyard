function openSettings() {
    if (window.Android) {
        window.Android.openSettings();
    } else {
        alert("La interfaz Android no está disponible.");
    }
}