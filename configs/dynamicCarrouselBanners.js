document.addEventListener('DOMContentLoaded', function () {
    let swiperInstance;

    // Function to fetch JSON and generate carousel items
    function fetchAndGenerateCarousel(orientation) {
        fetch('https://bm0x.github.io/pcLanyard/dynamicBannersImgs.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const swiperWrapper = document.getElementById('swiper-wrapper');
                const images = orientation === 'portrait' ? data.portraitImages : data.landscapeImages;
                const imagePromises = images.map(image => {
                    return new Promise((resolve, reject) => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide flex justify-center items-center mx-auto';
                        const img = document.createElement('img');
                        
                        // Fetch the image with the required header
                        fetch(image.url, {
                            headers: {
                                'ngrok-skip-browser-warning': 'true'
                            }
                        })
                        .then(response => response.blob())
                        .then(blob => {
                            img.src = URL.createObjectURL(blob);
                            img.alt = image.alt;
                            img.className = 'max-w-full max-h-full object-contain';

                            img.onload = function() {
                                slide.classList.add('loaded');
                                resolve(slide);
                            };
                            img.onerror = function() {
                                console.error('Error loading image:', image.url);
                                resolve(null);
                            };

                            slide.appendChild(img);
                        })
                        .catch(error => {
                            console.error('Error fetching image:', error);
                            resolve(null);
                        });
                    });
                });

                Promise.all(imagePromises).then(slides => {
                    swiperWrapper.innerHTML = '';
                    slides.forEach(slide => {
                        if (slide) {
                            swiperWrapper.appendChild(slide);
                        }
                    });

                    // Destroy the existing Swiper instance if it exists
                    if (swiperInstance) {
                        swiperInstance.destroy(true, true);
                    }

                    // Initialize a new Swiper instance
                    swiperInstance = new Swiper('.swiper-container', {
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        autoplay: {
                            delay: 7000,
                            disableOnInteraction: false,
                        },
                        loop: true, // Ensure the carousel loops
                    });
                });
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    function checkOrientation() {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        const orientation = isPortrait ? 'portrait' : 'landscape';
        fetchAndGenerateCarousel(orientation);
    }

    // Add event listener for orientation change
    window.addEventListener('resize', checkOrientation);

    // Initial check on page load
    checkOrientation();

    function recargaIslaCarousel() {
        checkOrientation();
        console.log("Complemento recargado, no estamos usando location.reload :D");

        // Volver a ejecutar la función cada 5 minutos
        setTimeout(recargaIslaCarousel, 5 * 60 * 1000);
    }

    // Iniciar el bucle
    recargaIslaCarousel();
});
