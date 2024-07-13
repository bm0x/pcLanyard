const verNum = document.getElementById("verNum");

verNum.textContent = CONFIG.version_number

function openSettings() {
    if (window.Android) {
        window.Android.openSettings();
    } else {
        alert("La interfaz Android no está disponible.");
    }
}