const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOver = document.querySelector('.gameOver');
let pontos = 0;
let pontosControle = true;                         // apenas para controle do registro de pontuação

const jump = ()=>{
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove("jump"); //setTimeout faz com que o código espere algum tempo até ir para  a função anônima  
    }, 1000);
    
}

const ativaJump = document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        jump(); 
    }

}       )                         

const loop1 = setInterval (() =>{
    
    const pipePosition = pipe.offsetLeft;        // monitora o posicionamento class pipe
    const marioPosition = mario.offsetTop;         //monitora o posicionamento class mario
    if((pipePosition < 65)&&(marioPosition < 353) &&(pontosControle)){  // condição de pontuação
             pontos++;
             const mostrarPontos = document.getElementsByClassName('pontuacao')[0];// recebe o primeiro elemento da classe pontos
             mostrarPontos.innerHTML = pontos;                       // altera o mostrador dos pontos
    }
    else if((pipePosition < 65 ) & (marioPosition > 353)){  // condição de game over
            
            pipe.style.animation = 'none';                       // desliga o movimento do cano
            gameOver.style.bottom = marioPosition - 330 + 'px'; // concatenação - 350
            gameOver.style.display ='block';                    // mostra o desenho de game-over do mario
            mario.style.display = 'none';                       // esconde o gif do mario andando
            pipe.style.left = pipePosition + 'px';             //concatenação de pipeposition com px
            pontosControle = false;
    
    
}
},100);

const caixa = document.querySelector('.caixa')               // caixa de dialogo com captura do texto com a tecla enter
const nomeDigitado = document.querySelector('.nomeDigitado')

const digitacao = caixa.addEventListener('keydown', (event) => {
    let a = caixa.value
    if (event.key === 'Enter') {
        console.log(a)
        if(!pontosControle){
            nomeDigitado.innerHTML = a                      //libera a digitação para a tabela de recordes apenas com o fim do jogo
        }
        
    }
})

const r01 = document.querySelector('#r01')                    // declaração dos elementos html que compõe a lista de recordistas
const r02 = document.querySelector('#r02')
const r03 = document.querySelector('#r03')
const r04 = document.querySelector('#r04')
const r05 = document.querySelector('#r05')
const r06 = document.querySelector('#r06')
const r07 = document.querySelector('#r07')
const r08 = document.querySelector('#r08')
const r09 = document.querySelector('#r09')
const r10 = document.querySelector('#r10')


fetch('https://ramonmelod-servidor-node-recordistas-mario.vercel.app')                             //captura dos dados em json da api de leitura e registro de recordes
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na solicitação da API')
    }
    return response.json();
  })
  .then(data => {
    let array = []                                       // declaração da array de elementos que receberá o json da api
    for (let i = 0; i < data.length; i++) {              // adição dos elementos json para dentro da array
      array.push(data[i]);
  }
    r01.innerHTML = array[0].s_nome_listarecordistas + ' -------  ' + array[0].i_pontuacao_listarecordistas +' pts'  // impressão lista recordistas
    r02.innerHTML = array[1].s_nome_listarecordistas + ' -------  ' + array[1].i_pontuacao_listarecordistas +' pts'
    r03.innerHTML = array[2].s_nome_listarecordistas + ' -------  ' + array[2].i_pontuacao_listarecordistas +' pts'
    r04.innerHTML = array[3].s_nome_listarecordistas + ' -------  ' + array[3].i_pontuacao_listarecordistas +' pts'
    r05.innerHTML = array[4].s_nome_listarecordistas + ' -------  ' + array[4].i_pontuacao_listarecordistas +' pts'
    r06.innerHTML = array[5].s_nome_listarecordistas + ' -------  ' + array[5].i_pontuacao_listarecordistas +' pts'
    r07.innerHTML = array[6].s_nome_listarecordistas + ' -------  ' + array[6].i_pontuacao_listarecordistas +' pts'
    r08.innerHTML = array[7].s_nome_listarecordistas + ' -------  ' + array[7].i_pontuacao_listarecordistas +' pts'
    r09.innerHTML = array[8].s_nome_listarecordistas + ' -------  ' + array[8].i_pontuacao_listarecordistas +' pts'
    r10.innerHTML = array[9].s_nome_listarecordistas + ' -------  ' + array[9].i_pontuacao_listarecordistas +' pts'

  })
  .catch(error => {
    console.error('Erro:', error)
  });
