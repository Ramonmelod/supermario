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
  // chamada da função controller exportada do arquivo controller.js
  mario,
  pipe,
  gameOver,
  dialogo,
  pontos,
  animationTime,
  pontosControle,
  mostrarPontos
);

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
