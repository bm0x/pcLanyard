let yt_key = localStorage.getItem("yt_key");

if (yt_key === null) {  // Verifica si no hay una API Key almacenada
    var API_KEY = prompt("No hay Clave Ingresada. \nIngresa tu clave de YouTube");
    localStorage.setItem("yt_key", API_KEY);
} else {
    var API_KEY = yt_key; // Recupera la API Key desde localStorage
    alert("API Key de YouTube cargada! \nTu clave de YouTube es: " + yt_key);
}

const YOUTUBE_API_KEY = API_KEY; // Usa la API Key recuperada o ingresada
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

async function buscarVideosEnYouTube(query) {
    try {
        const response = await fetch(`${YOUTUBE_API_URL}?key=${YOUTUBE_API_KEY}&part=snippet&q=${query}&type=video&maxResults=5`);
        const data = await response.json();

        const videos = data.items.map(item => ({
            titulo: item.snippet.title,
            videoId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.high.url,
            canal: item.snippet.channelTitle
        }));

        mostrarVideosConLiteYouTube(videos);

    } catch (error) {
        console.error('Error al buscar videos en YouTube:', error);
    }
}

function mostrarVideosConLiteYouTube(videos) {
    const contenedor = document.getElementById('videos-container');
    contenedor.innerHTML = ''; // Limpiar el contenedor

    videos.forEach(video => {
        const liteYouTubeElement = document.createElement('lite-youtube');
        liteYouTubeElement.setAttribute('videoid', video.videoId);
        liteYouTubeElement.setAttribute('playlabel', video.titulo);

        const titulo = document.createElement('h3');
        titulo.textContent = video.titulo;

        contenedor.appendChild(titulo);
        contenedor.appendChild(liteYouTubeElement);
    });
}

async function autocompletar(query) {
    try {
        const response = await fetch(`${YOUTUBE_API_URL}?key=${YOUTUBE_API_KEY}&part=snippet&q=${query}&type=video&maxResults=5`);
        const data = await response.json();

        mostrarSugerencias(data.items);
    } catch (error) {
        console.error('Error al autocompletar:', error);
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

document.getElementById('search-query').addEventListener('input', function() {
    const query = this.value;
    if (query.length > 2) {
        autocompletar(query);
    } else {
        document.getElementById('autocomplete-container').innerHTML = ''; // Limpiar si la entrada es corta
    }
});
