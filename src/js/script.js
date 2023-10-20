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

document.addEventListener('keydown',jump);

const loop1 = setInterval (() =>{
    
    const pipePosition = pipe.offsetLeft;        // monitora o posicionamento class pipe
    const marioPosition = mario.offsetTop;         //monitora o posicionamento class mario
        
    if((pipePosition < 68)&&(marioPosition < 243) &&(pontosControle)){  // condição de pontuação
             pontos++;
             const mostrarPontos = document.getElementsByClassName('pontuacao')[0];// recebe o primeiro elemento da classe pontos
             mostrarPontos.innerHTML = pontos;                       // altera o mostrador dos pontos
    }
    else if((pipePosition < 68 ) & (marioPosition > 398)){  // condição de game over
            
            pipe.style.animation = 'none';                       // desliga o movimento do cano
            gameOver.style.bottom = marioPosition - 350 + 'px'; // concatenação - 350
            gameOver.style.display ='block';                    // mostra o desenho de game-over do mario
            mario.style.display = 'none';                       // esconde o gif do mario andando
            pipe.style.left = pipePosition + 'px';             //concatenação de pipepisitioncom px
            pontosControle = false;
    
    
}
},100);

