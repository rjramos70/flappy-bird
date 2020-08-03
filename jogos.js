console.log('Flappy Bird');

// [ Efeitos ]
const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const som_CAIU = new Audio();
som_CAIU.src = './efeitos/caiu.wav';

const som_PONTO = new Audio();
som_PONTO.src = './efeitos/ponto.wav';

const som_PULO = new Audio();
som_PULO.src = './efeitos/pulo.wav';



const sprites = new Image();
sprites.src = './imgs/sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

let frames = 0;

// [ Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    posX: 0,
    posY: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.posX, planoDeFundo.posY,
            planoDeFundo.largura, planoDeFundo.altura,
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.posX + planoDeFundo.largura), planoDeFundo.posY,
            planoDeFundo.largura, planoDeFundo.altura,
        ); 
    }
}

function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.posY + (flappyBird.altura + 10);
    const chaoY = chao.posY;

    
    if(flappyBirdY > chaoY){
        console.log('Fez colisão....');
        // console.log("flappyBirdY :: " + flappyBirdY);
        // console.log("chaoY :: " + chaoY);
        return true;
    }

    return false;
}

// [ Chão ]
function criaChao(){
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        posX: 0,
        posY: canvas.height - 112,
        atualiza(){
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.posX - movimentoDoChao;
            // calculo para que o chão fique se movendo infinitamente.
            chao.posX = movimentacao % repeteEm;
        },
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.posX, chao.posY,
                chao.largura, chao.altura,
            );
    
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.posX + chao.largura), chao.posY,
                chao.largura, chao.altura,
            ); 
        }
    }
    return chao;
}

function criaFlappyBird(){

    // [ Flappy Bird ]
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        posX: 10,
        posY: 50,
        pulo: 4.6,
        pula(){
            console.log('devo pular...');
            console.log('velocidade [Antes] :: ' + flappyBird.velocidade);
            flappyBird.velocidade = - flappyBird.pulo;
            console.log('velocidade [Depois] :: ' + flappyBird.velocidade);
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                
                som_HIT.play();

                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                }, 500);
                return;
            }
    
            flappyBird.velocidade += flappyBird.gravidade;
            flappyBird.posY = flappyBird.posY + flappyBird.velocidade;
        },
        frameAtual: 0,
        atualizaFrameAtual(){
            const intervaloDeFrames = 10;
            const passouOIntervalo = frames % intervaloDeFrames === 0;

            if(passouOIntervalo){
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + this.frameAtual;
                const baseRepeticao = this.movimentos.length;
                this.frameAtual = incremento % baseRepeticao;
            }
        
        },
        movimentos: [
            { spriteX: 0, spriteY: 0, },    // asa acima
            { spriteX: 0, spriteY: 26, },   // asa meio
            { spriteX: 0, spriteY: 52, },   // asa abaixo
        ],
        desenha(){
            this.atualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[this.frameAtual];
            contexto.drawImage(
                sprites,
                spriteX, spriteY,    // sprite X, sprite Y
                flappyBird.largura, flappyBird.altura, // tamanho do recorte da imagem
                flappyBird.posX, flappyBird.posY,
                flappyBird.largura, flappyBird.altura,
            );
        }
        
    }

    return flappyBird;
}


// [ Mensagem Get Ready ]
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    posX: (canvas.width / 2) - 174 / 2,
    posY: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.posX, mensagemGetReady.posY,
            mensagemGetReady.largura, mensagemGetReady.altura,
        );

    }
}

// 
// [ Telas ]
// 
const globais = {};
let telaAtiva = {};

function mudaParaTela(novaTela){
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }
}

const Telas = {
    INICIO: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){
            globais.chao.atualiza();
        }
    }


};

Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha();
        globais.chao.desenha();
        globais.flappyBird.desenha();
    },
    click(){
        globais.flappyBird.pula();
    },
    atualiza(){
        globais.flappyBird.atualiza();
    }
}


function loop(){
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    // incrementa a variavel 'frames' em + 1
    frames++;

    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();