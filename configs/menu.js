const version = CONFIG.version_number;

document.getElementById("verNum").innerHTML = version;

function openSettings() {
    if (window.Android) {
        window.Android.openSettings();
    } else {
        alert("La interfaz Android no está disponible.");
    }
}