function downloadImages() {
    Android.downloadImagesFromJson("https://bm0x.github.io/pcLanyard/imagenes.json");
}

// Función para eliminar un archivo
function deleteFile(fileName) {
    Android.deleteFile(fileName);
}

// Función para obtener las imágenes desde el directorio en Android
function getImagesFromAndroid() {
    var directoryPath = '/storage/emulated/0/Lanyard/'; // Directorio donde se guardan las imágenes en Android
    var images = Android.getImages(directoryPath);
    displayImages(images);
}

// Función para mostrar las imágenes en la página HTML
function displayImages(images) {
    var container = document.getElementById('imageContainer');
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas imágenes

    images.forEach(function(imageUrl) {
        var img = document.createElement('img');
        img.src = imageUrl; // Ruta completa de la imagen en el dispositivo
        img.alt = 'Imagen';
        container.appendChild(img);
    });
}

function deleteAllImages() {
    Android.deleteAllImages();
    alert("Todas las imágenes han sido eliminadas.");
}

function refreshImagesFromJson() {
    var jsonUrl = "https://bm0x.github.io/pcLanyard/imagenes.json"; // Reemplaza con la URL real del JSON
    Android.refreshImagesFromJson(jsonUrl);
    alert("Se han actualizado las imágenes desde el JSON.");
}