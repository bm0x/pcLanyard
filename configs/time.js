window.onload = reloj();

function reloj() {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = meses[fecha.getMonth()];
    var año = fecha.getFullYear();
    var hora = fecha.getHours();
    var minuto = fecha.getMinutes().toString().padStart(2, '0');;

    document.getElementById("fecha").innerHTML = dia + " de " + mes + " de " + año;
    document.getElementById("hora").innerHTML = hora + ":" + minuto;

    setTimeout(reloj, 1000);
}