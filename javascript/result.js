const audio = document.getElementById("audio");

// Pausar e reiniciar o áudio
audio.pause();
audio.currentTime = 0;
audio.play();

// Obter parâmetros da URL
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Atualizar a pontuação total e o número total de questões na página
const getScore = document.querySelector(".correct");
const getTotal = document.querySelector(".from");

// Verificar se os parâmetros existem antes de atualizar os elementos HTML
if (params.score !== undefined && params.total !== undefined) {
  getScore.textContent = params.score;
  getTotal.textContent = params.total;
}