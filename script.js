// Configuración de Supabase
        const supabaseUrl = "https://rluqpkxzfjcxjqjmfrrj.supabase.co";
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsdXFwa3h6ZmpjeGpxam1mcnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NzAyNjAsImV4cCI6MjEwNTI0NjI2MH0.GfxqlUPxsmOoQA7tTTzVjl2DFalGfXrr7Bklmpou2lc";
        const client = supabase.createClient(supabaseUrl, supabaseKey);

        let searchTimer;

        // Búsqueda en vivo utilizando la API pública de iTunes
        function buscarCanciones() {
            clearTimeout(searchTimer);
            const query = document.getElementById("search").value.trim();
            const resultsContainer = document.getElementById("results");

            if (!query) {
                resultsContainer.innerHTML = "";
                return;
            }

            // Espera 300ms a que el usuario deje de escribir
            searchTimer = setTimeout(async () => {
                try {
                    const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`);
                    const data = await response.json();

                    resultsContainer.innerHTML = "";

                    if (data.results.length === 0) {
                        resultsContainer.innerHTML = `<div style="padding: 12px; color: #888;">No se encontraron resultados</div>`;
                        return;
                    }

                    data.results.forEach(track => {
                        const item = document.createElement("div");
                        item.className = "song-item";
                        const songString = `${track.trackName} - ${track.artistName}`;

                        item.innerHTML = `
                            <img src="${track.artworkUrl60}" alt="Cover">
                            <div class="song-info">
                                <div class="song-title">${track.trackName}</div>
                                <div class="song-artist">${track.artistName}</div>
                            </div>
                        `;

                        // Al hacer clic se selecciona y guarda en Supabase
                        item.onclick = () => seleccionarYGuardar(songString);
                        resultsContainer.appendChild(item);
                    });
                } catch (error) {
                    console.error("Error al buscar en iTunes API:", error);
                }
            }, 300);
        }

        // Inserta la canción en la tabla "song_requests" de Supabase
        async function seleccionarYGuardar(nombreCancion) {
            document.getElementById("results").innerHTML = "";
            document.getElementById("search").value = "";
            document.getElementById("status").innerText = "Enviando...";

            const { error } = await client
                .from("song_requests")
                .insert([{ song: nombreCancion }]);

            if (error) {
                document.getElementById("status").innerText = "❌ Error al guardar en Supabase";
                console.error(error);
                return;
            }

            document.getElementById("status").innerText = `✅ ¡Añadida: "${nombreCancion}"!`;
        }

        // Control del reproductor de música
        function toggleMusica() {
            const audio = document.getElementById("bg-music");
            const btn = document.getElementById("music-toggle");

            if (audio.paused) {
                audio.play().then(() => {
                    btn.innerText = "🔊 Pausar música";
                    btn.style.background = "#1DB954";
                    btn.style.color = "white";
                }).catch(e => console.log("Se requiere interacción para reproducir audio:", e));
            } else {
                audio.pause();
                btn.innerText = "🎵 Reproducir música";
                btn.style.background = "#222";
                btn.style.color = "#1DB954";
            }
        }