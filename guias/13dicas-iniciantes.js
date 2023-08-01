const elementoFixo = document.querySelector('.recommended');
const distanciaTopo = 100; // Distância do topo da página onde o elemento deve começar a se mover

window.addEventListener('scroll', function() {
    if (window.scrollY > distanciaTopo) {
        elementoFixo.style.top = '20px'; 
        elementoFixo.style.position = fixed;
        // Distância do elemento para o topo da tela quando começa a se mover
    } else {
        elementoFixo.style.top = distanciaTopo - window.scrollY + 'px';
    }
});