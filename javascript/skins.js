// Pega o modal
var modal = document.getElementById("myModal");
var buyModal = document.getElementById("buyModal");
// Pega o elemento que abre o modal
var cadeado = document.getElementById("cadeado");
// Pega o elemento que abre o modal
var cadeado2 = document.getElementById("cadeado2");
// Pega o elemento <span> que fecha o modal
var cadeado3 = document.getElementById("cadeado3");
// Pega o elemento que abre o modal
var cadeado4 = document.getElementById("cadeado4");
// Pega o elemento <span> que fecha o modal
var cadeado5 = document.getElementById("cadeado5");
// Pega o elemento <span> que fecha o modal
var spans = document.getElementsByClassName("close");
// Pega os botões do segundo modal
var confirmBuyBtn = document.getElementById("confirmBuyBtn");
var cancelBuyBtn = document.getElementById("cancelBuyBtn");
// Pega o modal do vídeo
var videoModal = document.getElementById("videoModal");
// Pega o botão para fechar o modal do vídeo
var videoModalClose = videoModal.querySelector(".close");
// Pega o botão "Assistir Anúncio"
var watchAdBtn = document.getElementById("watchAdBtn");
// Quando o usuário clicar no cadeado, abre o modal
cadeado.onclick = function() {
    modal.style.display = "block";
    modal.dataset.skinId = "cadeado";
}
cadeado2.onclick = function() {
    modal.style.display = "block";
    modal.dataset.skinId = "cadeado2";
}
cadeado3.onclick = function() {
    modal.style.display = "block";
    modal.dataset.skinId = "cadeado3";
}
cadeado4.onclick = function() {
    modal.style.display = "block";
    modal.dataset.skinId = "cadeado4";
}
cadeado5.onclick = function() {
    modal.style.display = "block";
    modal.dataset.skinId = "cadeado5";
}

// Quando o usuário clicar no <span> (x), fecha o modal
Array.from(spans).forEach(function(span) {
    span.onclick = function() {
        modal.style.display = "none";
        buyModal.style.display = "none";
    };
});


// Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == buyModal) {
        buyModal.style.display = "none";
    }
}
// Event listeners para os botões do primeiro modal
watchAdBtn.onclick = function() {
    alert("Assistir Anúncio clicado!");
    modal.style.display = "none";
    buyModal.style.display = "none";
    // Passa o ID da skin para unlockImage
    unlockImage(modal.dataset.skinId); 
};
/*
buyBtn.onclick = function() {
    modal.style.display = "none";
    buyModal.style.display = "block";
}

// Event listeners para os botões do segundo modal
confirmBuyBtn.onclick = function() {
    alert("Compra confirmada!");
    buyModal.style.display = "none";
    // Passa o ID da skin para unlockImage
    unlockImage(modal.dataset.skinId); 
};


cancelBuyBtn.onclick = function() {
    buyModal.style.display = "none";
}*/

// Event listener para abrir o modal do vídeo ao clicar em "Assistir Anúncio"
watchAdBtn.addEventListener('click', function() {
    videoModal.style.display = "block";
    var video = videoModal.querySelector("video");
    if (video.paused) {
        video.play(); // Inicia o vídeo se estiver pausado

    }
    video.addEventListener('ended', function() {
        videoModal.style.display = "none";
        modal.style.display = "none"; // Esconde também o modal principal
        buyModal.style.display = "none"; // Esconde também o modal de compra
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        unlockImage(modal.dataset.skinId); 

    });
});
function unlockImage(skinId) {
    var imageToUnlock = document.getElementById(skinId);
    if (imageToUnlock && imageToUnlock.classList.contains('locked')) {
        imageToUnlock.classList.remove('locked');
    }
}
// Event listener para fechar o modal do vídeo ao clicar no botão de fechar
videoModalClose.onclick = function() {

};
        // Adiciona um evento de clique ao elemento com o ID 'cadeado'
        document.getElementById('watchAdBtn').addEventListener('click', function() {
          
        });