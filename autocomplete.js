document.addEventListener("DOMContentLoaded", function () {

  const palavraChaves = [
    { text: 'Guia Introdução', link: '/guias/html/guia-introducao.html' },
    { text: 'Jogador', link: '/guias/html/oJogador.html' },
    { text: 'Energia', link: '/guias/html/energia.html' },
    { text: 'Ciclo do Dia', link: '/guias/html/ciclo-do-dia.html' },
    { text: 'Saúde', link: '/guias/html/saude.html' },
    { text: 'Inventário', link: '/guias/html/inventario.html' },
    { text: 'Controles', link: '/guias/html/controles.html' },
    { text: 'Habilidades', link: '/guias/html/habilidades.html' },
    { text: 'Mapas da Fazenda', link: '/guias/html/mapas-da-fazenda.html' },
    { text: 'Lavouras', link: '/guias/html/lavouras.html' },
    { text: 'Arvores Frutiferas', link: '/guias/html/arvores-frutiferas.html' },
    { text: 'Caverna', link: '/guias/html/caverna.html' },
    { text: 'Entregas', link: '/guias/html/entregas.html' },
    { text: 'Arvores Frutiferas', link: '/guias/html/arvores-frutiferas.html'},
    { text: 'Mercadorias Artesanais', link: '/guias/html/mercadorias-artesanais.html' },
    { text: 'Estufa', link: '/guias/html/estufa.html' },
    { text: 'Animais', link: '/guias/html/animais.html' },
    { text: 'Casa da Fazenda', link: '/guias/html/casa-da-fazenda.html' },
    { text: 'Casa', link: '/guias/html/casa.html' },
  ];

  const resultsBox = document.querySelector(".result-box");
  const inputBox = document.getElementById("input-box");

  // Funçoes para ativar e desativar o Display
  function showDisplay() {
    resultsBox.style.display = "block";
  }
  function hideDisplay() {
    resultsBox.style.display = "none";
  }

  inputBox.onkeyup = function (event) {
    let result = [];
    let input = inputBox.value;
    if (input.length) {
      result = palavraChaves.filter((chavefodida) => {
        return chavefodida.text.toLowerCase().includes(input.toLowerCase());
      });
    }
    display(result);
    enterKeyPress(event, result);
  }

  function display(result) {
    const content = result.map((chavefodida) => {
      return `<li><a href="${chavefodida.link}">${chavefodida.text}</a></li>`;
    });

    //Ocultar resultando quando o valor for vazio.
    if (content.length === 0) {
      hideDisplay();
    } else {
      showDisplay();

      const limitedResults = result.slice(0, 5);

      const content = limitedResults.map((chavefodida) => {
        return `<p><a href="${chavefodida.link}">${chavefodida.text}</a></p>`
      })
      resultsBox.innerHTML = content.join("");
    }

  }

  function enterKeyPress(event, result) {
    //Verificar se a tecla enter foi pressionada.
    if (event.keyCode === 13 && result.length === 1) {
      //Se ouver apenas um resultado e a tecla enter for pressionada redirecionar para o link.
      window.location.href = result[0].link;
    }
  }

});