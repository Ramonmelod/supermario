const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOver = document.querySelector('.gameOver');

const jump = ()=>{
    mario.classList.add('jump');
    setTimeout(() => {
        mario.classList.remove("jump"); //setTimeout faz com que o código espere algum tempo até ir para  a função anônima  
    }, 1000);
    
}

document.addEventListener('keydown',jump);

const loop = setInterval (() =>{
    const pipePosition = pipe.offsetLeft;        // monitora o posicionamento class pipe
    const marioPosition = mario.offsetTop;       //monitora o posicionamento class mario
    
    if((pipePosition < 68 ) & (marioPosition > 408)){
    pipe.style.animation = 'none';
    gameOver.style.display ='block';
    mario.style.display = 'none';

    
}
},10);

