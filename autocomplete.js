let palavraChaves = [
    'Guia Introdução',
    'Jogador',
];

const resultsBox = document.querySelector(".result-box");
const inputBox = document.getElementById("input-div");

inputBox.onkeyup = function(){
    let result = [];
    let input = inputBox.value; 
    if(input.length){
        result = palavraChaves.filter((chave)=>{
            return chave.toLowerCase().includes(input.toLowerCase());
        });
        console.log(result);
    };
}