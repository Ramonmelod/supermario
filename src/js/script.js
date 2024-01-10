const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const gameOver = document.querySelector('.gameOver')
let pontos = 0
let pontosControle = true                        // apenas para controle do registro de pontuação
const dialogo = document.querySelector('.dialogo')
let animationTime = 2                           // tempo que o cano leva pa

let btnEnterControle = true                    // controla se o botão enter para envio do nome do jogador já foi apertado


const jump = ()=>{
    mario.classList.add('jump')
    setTimeout(() => {
        mario.classList.remove("jump") //setTimeout faz com que o código espere algum tempo até ir para  a função anônima  
    }, 1000)
    
}

const ativaJump = document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        jump() 
    }

}       )        



const loop1 = setInterval (() =>{
    animationTime = animationTime - 0.0005          //decremento da variavel animationTime. Isto acelera o cano
    pipe.style.animation = `pipe-animation ${animationTime}s infinite linear`
    const pipePosition = pipe.offsetLeft        // monitora o posicionamento class pipe
    const marioPosition = mario.offsetTop        //monitora o posicionamento class mario
    if((pipePosition < 65)&&(marioPosition < 353) &&(pontosControle)){  // condição de pontuação
             pontos++
             const mostrarPontos = document.getElementsByClassName('pontuacao')[0]// recebe o primeiro elemento da classe pontos
             mostrarPontos.innerHTML = pontos                       // altera o mostrador dos pontos
             

    }
    else if((pipePosition < 65 ) & (marioPosition > 353)){  // condição de game over
            
            pipe.style.animation = 'none'                       // desliga o movimento do cano
            gameOver.style.bottom = marioPosition - 330 + 'px' // concatenação - 350
            gameOver.style.display ='block'                    // mostra o desenho de game-over do mario
            mario.style.display = 'none'                       // esconde o gif do mario andando
            pipe.style.left = pipePosition + 'px'             //concatenação de pipeposition com px
            pontosControle = false
            dialogo.style.display = 'block'
            
            
            
}
},100)




let arrayRecordistas = []

arrayRecordistas.push(document.querySelector('#r01'))                    // declaração dos elementos html que compõe a lista de recordistas
arrayRecordistas.push(document.querySelector('#r02'))
arrayRecordistas.push(document.querySelector('#r03'))
arrayRecordistas.push(document.querySelector('#r04'))
arrayRecordistas.push(document.querySelector('#r05'))
arrayRecordistas.push(document.querySelector('#r06'))
arrayRecordistas.push(document.querySelector('#r07'))
arrayRecordistas.push(document.querySelector('#r08'))
arrayRecordistas.push(document.querySelector('#r09'))
arrayRecordistas.push(document.querySelector('#r10'))

const urlGet ='https://ramonmelod-servidor-node-recordistas-mario.vercel.app' //'http://localhost:8080' //

fetch(urlGet)                             //captura dos dados em json da api de leitura e registro de recordes
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na solicitação da API')
    }
    return response.json()
  })
  .then(data => {
    let array = []                                       // declaração da array de elementos que receberá o json da api
    for (let i = 0; i < data.length; i++) {              // adição dos elementos json para dentro da array
      array.push(data[i])
  }

    for(let i =0; i < array.length; i ++){
      arrayRecordistas[i].innerHTML = array[i].s_nome_listarecordistas + ' -------  ' + array[i].i_pontuacao_listarecordistas +' pts' // mascara impressão lista recordistas

    }

    setInterval(()=>{if (pontos > array[array.length-1].i_pontuacao_listarecordistas&&(btnEnterControle)){
      dialogo.innerHTML = 'Parabéns! para registro da pontuação <br> digite seu nome e aperte Enter'
      
    }},10) //monitora a pontuação para alterar o texto do dialogo 
 
    const caixa = document.querySelector('.caixa')               // caixa de dialogo com captura do texto com a tecla enter
    
   caixa.addEventListener('keydown', (event) => { // captura o nome do recordista
        let recordista = caixa.value                                
        if ((pontos > array[array.length-1].i_pontuacao_listarecordistas) && (!pontosControle)&&(btnEnterControle)) {    // condições inciais:ser maior que o ultimo elemento e ter morrido
          

//------------------------------------Área de Post do código------------------------------------
          if(event.key === 'Enter'){
                btnEnterControle = false
                const urlPost = 'https://ramonmelod-servidor-node-recordistas-mario.vercel.app/post' //'http://localhost:8080/post '
                let nomeDigitado ={
                    nome:recordista,
                    pontuacao: pontos
            
                }        
                let cabecalho = {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(nomeDigitado)
                }
            
               
                 fetch(urlPost,cabecalho)
                 .catch(error => {
                  console.error('Erro na solicitação:', error);
              })
              
                 
//------------------------------------------------------------------------------------------------------
                 caixa.value = ''  // apaga o nome digitado na caixa de dialogo
                 dialogo.innerHTML = 'Parabéns, você está entre os 10 melhores!'   // atualiza a mensagem para o jogador

                 
                }
                 

              }
              
    }) 

  })
  .catch(error => {
    if(error){                       // if para limitar mensagem de erro para apenas quando houver mensagem de erro
    console.error('Erro:', error)
    }
  })