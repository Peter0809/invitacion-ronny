function toggleMusica() {
    const audio = document.getElementById("bg-music");
    const btn = document.getElementById("music-toggle");

    if (audio.paused) {
        audio.play();
        btn.innerText = "🔊 Pausar música";
        btn.style.background = "#1DB954";
        btn.style.color = "white";
    } else {
        audio.pause();
        btn.innerText = "🎵 Reproducir música";
        btn.style.background = "#222";
        btn.style.color = "#1DB954";
    }
}

// Inicia automáticamente la música al hacer el primer clic en cualquier parte de la página
document.addEventListener("click", function iniciarAudio() {
    const audio = document.getElementById("bg-music");
    if (audio.paused) {
        audio.play().then(() => {
            document.getElementById("music-toggle").innerText = "🔊 Pausar música";
            document.getElementById("music-toggle").style.background = "#1DB954";
            document.getElementById("music-toggle").style.color = "white";
        }).catch(() => {});
    }
}, { once: true });



const supabaseUrl = "https://rluqpkxzfjcxjqjmfrrj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsdXFwa3h6ZmpjeGpxam1mcnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NzAyNjAsImV4cCI6MjEwNTI0NjI2MH0.GfxqlUPxsmOoQA7tTTzVjl2DFalGfXrr7Bklmpou2lc";

const client = supabase.createClient(
    supabaseUrl,
    supabaseKey
);

async function guardarCancion(){

    const song =
        document.getElementById("song").value;

    if(!song.trim()){
        alert("Escribe una canción");
        return;
    }

    const { error } =
        await client
        .from("song_requests")
        .insert([
            {
                song: song
            }
        ]);

    if(error){
        document.getElementById("status").innerText =
        "❌ Error al guardar";
        return;
    }

    document.getElementById("status").innerText =
    "✅ Canción enviada";

    document.getElementById("song").value = "";
}

function toggleMusica() {
    const audio = document.getElementById("bg-music");
    const btn = document.getElementById("music-toggle");

    if (audio.paused) {
        audio.play();
        btn.innerText = "🔊 Pausar música";
    } else {
        audio.pause();
        btn.innerText = "🎵 Reproducir música";
    }
}
