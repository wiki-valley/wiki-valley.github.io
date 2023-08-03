document.addEventListener("DOMContentLoaded", function () {

    const palavraChaves = [
        { text: 'Guia Introdução', link: 'http://localhost:5500/guias/tables/guia-introducao.html' },
        { text: 'Jogador', link: 'http://localhost:5500/guias/tables/oJogador.html' },
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

        // Funçoes para ativar e desativar o Display
      function showDisplay() {
        resultsBox.style.display = "block";
      }
      function hideDisplay() {
        resultsBox.style.display = "none";
      }

      inputBox.onkeyup = function(event){
          let result = [];
          let input = inputBox.value; 
          if(input.length){
              result = palavraChaves.filter((chavefodida)=>{
                  return chavefodida.text.toLowerCase().includes(input.toLowerCase());
              });
            }
          display(result);
          enterKeyPress(event,result);
      }
      
      function display(result){
          const content = result.map((chavefodida)=>{
              return `<li><a href="${chavefodida.link}">${chavefodida.text}</a></li>`;
          });

          //Ocultar resultando quando o valor for vazio.
        if (content.length === 0){
            hideDisplay();
        }else{
            showDisplay();

            const limitedResults = result.slice(0, 5);

            const content = limitedResults.map((chavefodida) =>{
                return `<p><a href="${chavefodida.link}">${chavefodida.text}</a></p>`
            })
            resultsBox.innerHTML = content.join("");
        }
    
      }
    
      function enterKeyPress(event, result) {
        //Verificar se a tecla enter foi pressionada.
        if(event.keyCode === 13 && result.length === 1){
            //Se ouver apenas um resultado e a tecla enter for pressionada redirecionar para o link.
            window.location.href = result[0].link;
        }
      }

  });