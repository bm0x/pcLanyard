document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch JSON and generate carousel items
    function fetchAndGenerateCarousel(orientation) {
        fetch('https://bm0x.github.io/pcLanyard/dynamicImgs.json')
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
                        if (orientation === 'landscape') {
                            slide.className = 'swiper-slide flex justify-center items-center mx-auto';;
                        }
                        const img = document.createElement('img');
                        img.src = image.url + '?cache=' + Date.now();
                        img.alt = image.alt;
                        img.className = 'max-w-full max-h-full object-contain';

                        img.onload = function() {
                            slide.classList.add('loaded');
                            resolve(slide);
                        };
                        img.onerror = function() {
                            resolve(null);
                        };

                        const preloadImg = new Image();
                        preloadImg.src = img.src;
                        preloadImg.onload = function() {
                            img.src = preloadImg.src;
                        };
                        preloadImg.onerror = function() {
                            resolve(null);
                        };

                        slide.appendChild(img);
                    });
                });

                Promise.all(imagePromises).then(slides => {
                    swiperWrapper.innerHTML = '';
                    slides.forEach(slide => {
                        if (slide) {
                            swiperWrapper.appendChild(slide);
                        }
                    });

                    new Swiper('.swiper-container', {
                        pagination: {
                            el: '.swiper-pagination',
                        },
                        autoplay: {
                            delay: 7000,
                            disableOnInteraction: false,
                        },
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

    window.addEventListener('resize', checkOrientation);
    checkOrientation();

    //function reloadPage() {
    //    setTimeout(function() {
    //        location.reload();
    //    }, 3 * 60 * 1000);
    //}
    //reloadPage();

    setTimeout(function() {
        fetchAndGenerateCarousel(window.matchMedia("(orientation: portrait)").matches ? 'portrait' : 'landscape');
      }, 5 * 60 * 1000);
});
