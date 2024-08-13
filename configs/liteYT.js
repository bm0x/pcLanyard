let videoIndex = 0;
let videosList = []; // Lista global para almacenar los videos

// Asegúrate de que la clave de la API esté configurada correctamente
let yt_key = localStorage.getItem("yt_key");

if (!yt_key) {  // Si la clave no existe o es nula
    yt_key = prompt("Ingresa tu clave de YouTube");
    if (yt_key) {
        localStorage.setItem("yt_key", yt_key);
        alert("API Key de YouTube cargada! \nTu clave de YouTube es: " + yt_key);
    } else {
        alert("No se ingresó una API Key. No se puede proceder.");
        throw new Error("API Key es requerida para realizar búsquedas en YouTube.");
    }
}

const YOUTUBE_API_KEY = localStorage.getItem("yt_key");
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

async function buscarVideosEnYouTube(query) {
    try {
        const response = await fetch(`${YOUTUBE_API_URL}?key=${YOUTUBE_API_KEY}&part=snippet&q=${query}&type=video&maxResults=10`);
        const data = await response.json();
        
        // Actualiza la lista global de videos
        videosList = data.items.map(item => ({
            titulo: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high.url,
            canal: item.snippet.channelTitle
        }));

        videoIndex = 0; // Reinicia el índice de videos
        mostrarVideoActual();

    } catch (error) {
        console.error('Error al buscar videos en YouTube:', error);
    }
}

function mostrarVideoActual() {
    const contenedor = document.getElementById('videos-container');
    contenedor.innerHTML = ''; // Limpiar el contenedor
    
    if (videosList.length > 0 && videoIndex < videosList.length) {
        const video = videosList[videoIndex];

        // Crear el elemento lite-youtube
        const liteYouTubeElement = document.createElement('lite-youtube');
        liteYouTubeElement.setAttribute('videoid', video.videoId);
        liteYouTubeElement.setAttribute('playlabel', video.titulo);

        // Crear el título del video
        const titulo = document.createElement('h3');
        titulo.textContent = video.titulo;

        // Agregar el título y el elemento lite-youtube al contenedor
        contenedor.appendChild(titulo);
        contenedor.appendChild(liteYouTubeElement);
    }
}

function mostrarSugerencias(videos) {
    const contenedor = document.getElementById('autocomplete-container');
    contenedor.innerHTML = ''; // Limpiar sugerencias anteriores

    videos.forEach(video => {
        const sugerencia = document.createElement('div');
        sugerencia.classList.add('autocomplete-suggestion');
        sugerencia.textContent = video.snippet.title;
        sugerencia.addEventListener('click', () => {
            document.getElementById('search-query').value = video.snippet.title;
            buscarVideosEnYouTube(video.snippet.title);
            contenedor.innerHTML = ''; // Limpiar sugerencias
        });

        contenedor.appendChild(sugerencia);
    });
}

// Función para mostrar el siguiente video
function mostrarSiguienteVideo() {
    videoIndex++;
    if (videoIndex < videosList.length) {
        mostrarVideoActual();
    } else {
        alert('No hay más videos disponibles.');
    }
}

document.getElementById('search-query').addEventListener('input', function() {
    const query = this.value;
    if (query.length > 2) {
        autocompletar(query);
    } else {
        document.getElementById('autocomplete-container').innerHTML = ''; // Limpiar si la entrada es corta
    }
});

document.getElementById('load-more').addEventListener('click', mostrarSiguienteVideo);

async function autocompletar(query) {
    try {
        const response = await fetch(`${YOUTUBE_API_URL}?key=${YOUTUBE_API_KEY}&part=snippet&q=${query}&type=video&maxResults=5`);
        const data = await response.json();

        mostrarSugerencias(data.items);
    } catch (error) {
        console.error('Error al autocompletar:', error);
    }
}
