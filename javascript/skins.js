// Pega o modal
var modal = document.getElementById("myModal");
var buyModal = document.getElementById("buyModal");
// Pega o elemento que abre o modal
var cadeado = document.getElementById("cadeado");
// Pega o elemento que abre o modal
var cadeado2 = document.getElementById("cadeado2");
// Pega o elemento <span> que fecha o modal
var spans = document.getElementsByClassName("close");
// Pega os botões do segundo modal
var confirmBuyBtn = document.getElementById("confirmBuyBtn");
var cancelBuyBtn = document.getElementById("cancelBuyBtn");
// Quando o usuário clicar no cadeado, abre o modal
cadeado.onclick = function () {
    modal.style.display = "block";
}
// Quando o usuário clicar no cadeado, abre o modal
cadeado2.onclick = function () {
    modal.style.display = "block";
}

// Quando o usuário clicar no <span> (x), fecha o modal
Array.from(spans).forEach(function (span) {
    span.onclick = function () {
        modal.style.display = "none";
        buyModal.style.display = "none";
    };
});


// Quando o usuário clicar em qualquer lugar fora do modal, fecha o modal
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    } else if (event.target == buyModal) {
        buyModal.style.display = "none";
    }
}
// Event listeners para os botões do primeiro modal
watchAdBtn.onclick = function () {
    alert("Assistir Anúncio clicado!"); // Adicione a funcionalidade desejada aqui
    modal.style.display = "none";
    buyModal.style.display = "none";
    unlockImage();
}

buyBtn.onclick = function () {
    modal.style.display = "none";
    buyModal.style.display = "block";
}

// Event listeners para os botões do segundo modal
confirmBuyBtn.onclick = function () {
    alert("Compra confirmada!"); // Adicione a funcionalidade desejada aqui
    buyModal.style.display = "none";
    unlockImage();
}

cancelBuyBtn.onclick = function () {
    buyModal.style.display = "none";
}
function unlockImage() {
    var lockImage = document.querySelector('.skin-image.locked');
    if (lockImage.classList.contains('locked')) {
        lockImage.classList.remove("locked");
    }
}

// Adiciona um evento de clique ao elemento com o ID 'cadeado'
document.getElementById('watchAdBtn').addEventListener('click', function () {
    window.open('https://www.youtube.com/watch?v=cOjYAFS24gc', '_blank');
});