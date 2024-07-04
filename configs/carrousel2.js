document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch JSON and generate carousel items
    function fetchAndGenerateCarousel() {
        fetch('https://bm0x.github.io/pcLanyard/imagenes.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const swiperWrapper = document.getElementById('swiper-wrapper');
                const imagePromises = data.images.map(image => {
                    return new Promise((resolve, reject) => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide flex justify-center items-center bg-white';
                        const img = document.createElement('img');
                        // Add a dynamic parameter to force image reload
                        img.src = image.url + '?cache=' + Date.now();
                        img.alt = image.alt;
                        img.className = 'max-w-full max-h-full object-contain';

                        // Check if image exists before loading
                        img.onload = function() {
                            slide.classList.add('loaded');
                            resolve(slide);
                        };
                        img.onerror = function() {
                            resolve(null);
                        };

                        // Preload the image to check existence
                        const preloadImg = new Image();
                        preloadImg.src = img.src;
                        preloadImg.onload = function() {
                            // Image exists, load it
                            img.src = preloadImg.src;
                        };
                        preloadImg.onerror = function() {
                            // Image does not exist, resolve with null
                            resolve(null);
                        };

                        slide.appendChild(img);
                    });
                });

                Promise.all(imagePromises).then(slides => {
                    swiperWrapper.innerHTML = ''; // Clear existing slides
                    slides.forEach(slide => {
                        if (slide) {
                            swiperWrapper.appendChild(slide);
                        }
                    });

                    // Initialize Swiper after adding slides
                    new Swiper('.swiper-container', {
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        autoplay: {
                            delay: 7000, // 7 seconds
                            disableOnInteraction: false,
                        },
                    });
                });
            })
            .catch(error => console.error('Error loading JSON:', error));
    }

    // Function to reload the page every 5 minutes
    function reloadPage() {
        setTimeout(function() {
            location.reload();
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
    }

    // Initial load of carousel
    fetchAndGenerateCarousel();

    // Call reloadPage() to start the auto-reload timer
    reloadPage();
});