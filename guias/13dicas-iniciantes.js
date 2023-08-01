window.addEventListener('scroll', function() {
    const guides = document.querySelectorAll('.guide');

    const distanciaTopo = 100; // Distância do topo da página onde o elemento deve começar a se mover

    guides.forEach(guide => {
        if (window.scrollY > distanciaTopo) {
            guide.classList.add('guide-fixo');
        } else {
            guide.classList.remove('guide-fixo');
        }
    });
});