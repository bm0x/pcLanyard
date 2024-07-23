function updateBatteryStatus(battery) {
    const statusDiv = document.getElementById('bateria');
    statusDiv.innerHTML = `
        <p>Nivel de batería: ${Math.round(battery.level * 100)}%</p>
        <p>¿Cargando?: ${battery.charging ? 'Sí' : 'No'}</p>
        <p>Tiempo restante (si está cargando o descargando): ${battery.dischargingTime ? battery.dischargingTime / 60 + ' minutos' : 'N/A'}</p>
    `;
}

if (navigator.getBattery) {
    navigator.getBattery().then(function(battery) {
        updateBatteryStatus(battery);

        battery.addEventListener('levelchange', function() {
            updateBatteryStatus(battery);
        });
        
        battery.addEventListener('chargingchange', function() {
            updateBatteryStatus(battery);
        });
        
        battery.addEventListener('chargingtimechange', function() {
            updateBatteryStatus(battery);
        });
        
        battery.addEventListener('dischargingtimechange', function() {
            updateBatteryStatus(battery);
        });
    });
} else {
    document.getElementById('batteryStatus').innerText = 'La API de estado de batería no está soportada en este navegador.';
}