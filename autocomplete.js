document.addEventListener("DOMContentLoaded", function () {

    const palavraChaves = [
        { text: 'Guia Introdução', link: 'guias/tables/guia-introducao.html' },
        { text: 'Jogador', link: 'guias/tables/oJogador.html' },
        { text: 'Energia', link: '' },
        { text: 'Ciclo do Dia', link: '' },
        { text: 'Saúde', link: '' },
        { text: 'Inventário', link: '' },
        { text: 'Controles', link: '' },
        { text: 'Habilidades', link: '' },
        { text: 'Mapas da Fazenda', link: '' },
        { text: 'Lavouras', link: '' },
        { text: 'Arvores Frutiferas', link: '' },
        { text: 'Caverna', link: '' },
        { text: 'Entregas', link: '' },
        { text: 'Mercadorias Artesanais', link: '' },
        { text: 'Estufa', link: '' },
        { text: 'Animais', link: '' },
        { text: 'Casa da Fazenda', link: '' },
        { text: 'Casa', link: '' },
      ];
      
      const resultsBox = document.querySelector(".result-box");
      const inputBox = document.getElementById("input-box");
      resultsBox.computedStyleMap.display = 'none';
      inputBox.onkeyup = function(){
          let result = [];
          let input = inputBox.value; 
          if(input.length){
              result = palavraChaves.filter((chavefodida)=>{
                  return chavefodida.text.toLowerCase().includes(input.toLowerCase());
              });
          }else if(input.length == null){
            resultsBox.computedStyleMap.display = 'none';
          }
          display(result);
      }
      
      function display(result){
          const content = result.map((chavefodida)=>{
              return `<li><a href="${chavefodida.link}">${chavefodida.text}</a></li>`;
          });
      
          resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
      }
    
  });