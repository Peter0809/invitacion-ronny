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