import { query } from "./query.js";
import { save } from "./post.js";
const urlGet =
  "https://ramonmelod-servidor-node-recordistas-mario.vercel.app" ||
  "http://localhost:8080";
const urlPost =
  "https://ramonmelod-servidor-node-recordistas-mario.vercel.app/post" ||
  "http://localhost:8080/post ";

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameOver = document.querySelector(".gameOver");
let pontos = 0;
let pontosControle = true; // apenas para controle do registro de pontuação
const dialogo = document.querySelector(".dialogo");
let animationTime = 2; // tempo que o cano leva pa

let btnEnterControle = true; // controla se o botão enter para envio do nome do jogador já foi apertado

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
}, 100);

let dataRecordistas = [];

for (let i = 1; i < 11; i++) {
  dataRecordistas.push(document.querySelector(`#r0${i}`)); // declaração dos elementos html que compõe a lista de recordistas
}

const getRecordistsList = async () => {
  //função que recebe resultado da consulta feita pelo modulo query.js
  const call = await query(urlGet);

  return call;
};

getRecordistsList().then((data) => {
  // mascara impressão lista recordistas
  for (let i = 0; i < data.length; i++) {
    dataRecordistas[i].innerHTML =
      data[i].s_nome_listarecordistas +
      " -------  " +
      data[i].i_pontuacao_listarecordistas +
      " pts";
  }
});

getRecordistsList().then((data) => {
  //monitora a pontuação para alterar o texto do dialogo
  setInterval(() => {
    if (
      pontos > data[data.length - 1].i_pontuacao_listarecordistas &&
      btnEnterControle
    ) {
      dialogo.innerHTML =
        "Parabéns! para registro da pontuação <br> digite seu nome e aperte Enter";
    }
  }, 10);
});

const add = async (rec, pts, urlP) => {
  // Função que chama modulo que posta novo recordista
  const store = await save(rec, pts, urlP);
};
getRecordistsList().then((data) => {
  //envio do novo recordista
  const caixa = document.querySelector(".caixa"); // caixa de dialogo com captura do texto com a tecla enter

  caixa
    .addEventListener("keydown", (event) => {
      // captura o nome do recordista
      let recordista = caixa.value;

      if (
        (pontos > data[data.length - 1].i_pontuacao_listarecordistas) |
          (data.length < 10) && // condição true caso haja menos que 10 recordistas
        !pontosControle &&
        btnEnterControle
      ) {
        // condições inciais:ser maior que o ultimo elemento e ter morrido

        if (event.key === "Enter") {
          btnEnterControle = false;
          add(recordista, pontos, urlPost); //----------------- chamada da função que faz o post

          caixa.value = ""; // apaga o nome digitado na caixa de dialogo
          dialogo.innerHTML = "Parabéns, você está entre os 10 melhores!"; // atualiza a mensagem para o jogador
        }
      }
    })
    .catch((error) => {
      if (error) {
        // if para limitar mensagem de erro para apenas quando houver mensagem de erro
        console.error("Erro:", error);
      }
    });
});
