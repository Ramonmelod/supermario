import { pontosIncremento, pontosControleAlter } from "./script.js";
export const controller = (
  mariocontroller,
  pipecontroller,
  gameOvercontroller,
  dialogocontroller,
  pontoscontroller,
  animationTimecontroller,
  pontosControlecontroller,
  mostrarPontoscontroller
) => {
  const jump = () => {
    mariocontroller.classList.add("jump");
    setTimeout(() => {
      mariocontroller.classList.remove("jump"); //setTimeout faz com que o código espere algum tempo até ir para  a função anônima
    }, 1000);
  };

  const ativaJump = document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      jump();
    }
  });

  const loop1 = setInterval(() => {
    const pipePosition = pipecontroller.offsetLeft; // monitora o posicionamento class pipecontroller
    const marioPosition = mariocontroller.offsetTop; //monitora o posicionamento class mariocontroller
    animationTimecontroller = animationTimecontroller - 0.0005; //decremento da variavel animationTimecontroller. Isto acelera o cano
    pipecontroller.style.animation = `pipe-animation ${animationTimecontroller}s infinite linear`;

    if (pipePosition < 65 && marioPosition < 353 && pontosControlecontroller) {
      mostrarPontoscontroller.innerHTML = pontosIncremento(); // altera o mostrador dos pontos esta função é exportada do script.js
    } else if ((pipePosition < 65) & (marioPosition > 353)) {
      // condição de game over

      pipecontroller.style.animation = "none"; // desliga o movimento do cano
      gameOvercontroller.style.bottom = marioPosition - 330 + "px"; // concatenação - 350
      gameOvercontroller.style.display = "block"; // mostra o desenho de game-over do mariocontroller
      mariocontroller.style.display = "none"; // esconde o gif do mariocontroller andando
      pipecontroller.style.left = pipePosition + "px"; //concatenação de pipeposition com px
      pontosControleAlter(); // função exportada do script.js

      pontosControlecontroller = false; //altera a variável pontosControlecontroller para que a condição que altera o mostrador dos pontos não seja incrementada

      dialogocontroller.style.display = "block";
    }
  }, 100);
  return pontoscontroller;
};
