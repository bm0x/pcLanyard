function updateBatteryStatus(battery) {
    const statusDiv = document.getElementById('bateria');
    
    if (battery.charging === true) {
        statusDiv.innerHTML = `
            <p>Nivel de batería: ${Math.round(battery.level * 100)}%</p>
            <p>Cargando</p>
        `;
    } else {
        statusDiv.innerHTML = `
            <p>Nivel de batería: ${Math.round(battery.level * 100)}%</p>
        `;
    }
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
    document.getElementById('bateria').innerText = 'La API de estado de batería no está soportada en este navegador.';
}