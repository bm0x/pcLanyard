function loadImages() {
        var directoryPath = "/storage/emulated/0/Lanyard/";  // Cambia esta ruta a la ruta del directorio de imágenes en tu dispositivo
        var imagePaths = Android.getImages(directoryPath);
        var swiperWrapper = document.getElementById("swiper-wrapper");

        imagePaths.forEach(function (imagePath) {
            var slide = document.createElement("div");
            slide.className = "swiper-slide";
            var img = document.createElement("img");
            img.src = "file://" + imagePath;
            slide.appendChild(img);
            swiperWrapper.appendChild(slide);
        });

        var swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
            },
        });
    }

    window.onload = loadImages;