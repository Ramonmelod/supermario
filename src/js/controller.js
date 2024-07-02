export const controller = () => {
  const mario = document.querySelector(".mario");
  const jump = () => {
    mario.classList.add("jump");
    setTimeout(() => {
      mario.classList.remove("jump"); //setTimeout faz com que o código espere algum tempo até ir para  a função anônima
    }, 1000);
  };

  const ativaJump = document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      jump();
    }
  });
};
/*
const loop1 = setInterval(() => {
    animationTime = animationTime - 0.0005; //decremento da variavel animationTime. Isto acelera o cano
    pipe.style.animation = `pipe-animation ${animationTime}s infinite linear`;
    const pipePosition = pipe.offsetLeft; // monitora o posicionamento class pipe
    const marioPosition = mario.offsetTop; //monitora o posicionamento class mario
    if (pipePosition < 65 && marioPosition < 353 && pontosControle) {
      // condição de pontuação
      pontos++;
      const mostrarPontos = document.getElementsByClassName("pontuacao")[0]; // recebe o primeiro elemento da classe pontos
      mostrarPontos.innerHTML = pontos; // altera o mostrador dos pontos
    } else if ((pipePosition < 65) & (marioPosition > 353)) {
      // condição de game over
  
      pipe.style.animation = "none"; // desliga o movimento do cano
      gameOver.style.bottom = marioPosition - 330 + "px"; // concatenação - 350
      gameOver.style.display = "block"; // mostra o desenho de game-over do mario
      mario.style.display = "none"; // esconde o gif do mario andando
      pipe.style.left = pipePosition + "px"; //concatenação de pipeposition com px
      pontosControle = false;
      dialogo.style.display = "block";
    }
  }, 100);*/
