let images = document.querySelectorAll('.carrousel img');
let currentImage = 0;

// Oculta todas las imágenes excepto la primera
for (let i = 1; i < images.length; i++) {
    images[i].style.display = 'none';
}

function changeImage() {
    images[currentImage].style.display = 'none';

    currentImage++;
    if (currentImage >= images.length) {
        currentImage = 0;
    }

    images[currentImage].style.display = 'block';
}

setInterval(changeImage, 7000); // Cambia la imagen cada 3 segundos