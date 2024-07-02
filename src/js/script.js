import { query } from "./query.js";
import { save } from "./post.js";
import { controller } from "./controller.js";

const urlGet =
  "https://ramonmelod-servidor-node-recordistas-mario.vercel.app" ||
  "http://localhost:8080";
const urlPost =
  "https://ramonmelod-servidor-node-recordistas-mario.vercel.app/post" ||
  "http://localhost:8080/post ";

const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const gameOver = document.querySelector(".gameOver");
const dialogo = document.querySelector(".dialogo");
const mostrarPontos = document.getElementsByClassName("pontuacao")[0]; // recebe o primeiro elemento da classe pontos
let pontos = 0;
let animationTime = 2; // tempo que o cano leva pa
let pontosControle = true; // apenas para controle do registro de pontuação
let btnEnterControle = true; // controla se o botão enter para envio do nome do jogador já foi apertado
export const pontosIncremento = () => {
  pontos++;
  return pontos; // retorna o valor da variavel pontos para o controller.js
};
export const pontosControleAlter = () => {
  pontosControle = false;
};
controller(
  mario,
  pipe,
  gameOver,
  dialogo,
  pontos,
  animationTime,
  pontosControle,
  mostrarPontos
);

/*
//------------------------movimento-------------------------------------
const loop1 = setInterval(() => {
  const pipePosition = pipe.offsetLeft; // monitora o posicionamento class pipe
  const marioPosition = mario.offsetTop; //monitora o posicionamento class mario

  animationTime = animationTime - 0.0005; //decremento da variavel animationTime. Isto acelera o cano
  pipe.style.animation = `pipe-animation ${animationTime}s infinite linear`;

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

//------------------------movimento-------------------------------------

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
    console.log(pontos);
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
  console.log(pontos);
  //console.log(data[data.length - 1].i_pontuacao_listarecordistas);
  //console.log(btnEnterControle);
  const caixa = document.querySelector(".caixa"); // caixa de dialogo com captura do texto com a tecla enter

  caixa
    .addEventListener("keydown", (event) => {
      // captura o nome do recordista
      let recordista = caixa.value;

      if (
        (pontos > data[data.length - 1].i_pontuacao_listarecordistas) |
          (data.length < 11) && // condição true caso haja menos que 10 recordistas
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
