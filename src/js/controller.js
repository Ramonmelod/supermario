import { pontosIncremento, pontosControleAlter } from "./script.js";
export const controller = (
  mariocontroller,
  pipecontroller,
  gameOvercontroller,
  dialogocontroller,
  pontoscontroller,
  animationTimecontroller,
  pontosControlecontroller,
  mostrarPontoscontroller,
  highlandcontroller,
  goombacontroller
) => {
  const moveLeft = () => {
    const marioPosition = mariocontroller.offsetLeft;
    mariocontroller.style.left = marioPosition - 7 + "px";
  };
  const moveright = () => {
    const marioPosition = mariocontroller.offsetLeft;
    mariocontroller.style.left = marioPosition + 7 + "px";
  };

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

  const enableMirror = document.addEventListener("keydown", (event) => {
    // ativa a função que espelha o personagem Mario
    if (event.key === "ArrowLeft") {
      mariocontroller.classList.add("mirror");
      moveLeft();
    }
  });

  const disableMirror = document.addEventListener("keydown", (event) => {
    // desativa a função que espelha o personagem Mario
    if (event.key === "ArrowRight") {
      mariocontroller.classList.remove("mirror");
      moveright();
    }
  });

  const loop1 = setInterval(() => {
    const highlandPosition = highlandcontroller.offsetLeft; // monitora o posicionamento da highland
    const pipePosition = pipecontroller.offsetLeft; // monitora o posicionamento class pipecontroller
    const marioPosition = mariocontroller.offsetTop; //monitora o posicionamento class mariocontroller
    const goombaPosition = goombacontroller.offsetLeft; //monitora o posicionamento class mariocontroller
    const marioLeftPosition = mariocontroller.offsetLeft; //monitora o posicionamento class mariocontroller

    animationTimecontroller = animationTimecontroller - 0.0005; //decremento da variavel animationTimecontroller. Isto acelera o cano
    pipecontroller.style.animation = `coming-animation ${animationTimecontroller}s infinite linear`;
    if (pipePosition < 0) {
      highlandcontroller.style.display = "block"; //troca o estado da propriedade display da highland assim que o pipe some
    }
    if (
      (pipePosition - marioLeftPosition < 60 &&
        pipePosition - marioLeftPosition > 0 &&
        marioPosition < 353) || // pipe death condition
      (goombaPosition - marioLeftPosition < 30 &&
        goombaPosition - marioLeftPosition > -35 && // foi colocado um valor menor que zero para evitar que o Mario passe muito rapido pelo Goomba e não morra
        marioPosition < 353)
    ) {
      mostrarPontoscontroller.innerHTML = pontosIncremento(); // altera o mostrador dos pontos esta função é exportada do script.js
    } else if (
      (pipePosition - marioLeftPosition < 60 &&
        pipePosition - marioLeftPosition > 0 &&
        marioPosition > 353) || // pipe death condition
      (goombaPosition - marioLeftPosition < 30 &&
        goombaPosition - marioLeftPosition > -15 && // foi colocado um valor menor que zero para evitar que o Mario passe muito rapido pelo Goomba e não morra
        marioPosition > 353) // goomba death condition
    ) {
      // condição de game over
      pipecontroller.style.animation = "none"; // desliga o movimento do cano
      gameOvercontroller.style.top = marioPosition + "px"; // define a altura do mario Game Over para a altura do personagem mario
      gameOvercontroller.style.left = marioLeftPosition + "px"; // define a esquerda do mario Game Over para a altura do personagem mario
      gameOvercontroller.style.display = "block"; // mostra o desenho de game-over do mariocontroller
      mariocontroller.style.display = "none"; // esconde o gif do mariocontroller andando
      pipecontroller.style.left = pipePosition + "px"; //concatenação de pipeposition com px
      pontosControleAlter(); // função exportada do script.js
      highlandcontroller.style.animation = "none"; // para a movimentação do elemento highland
      highlandcontroller.style.left = highlandPosition + "px";
      pontosControlecontroller = false; //altera a variável pontosControlecontroller para que a condição que altera o mostrador dos pontos não seja incrementada

      dialogocontroller.style.display = "block";
    }
  }, 100);
  return pontoscontroller;
};
