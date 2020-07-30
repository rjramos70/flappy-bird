console.log('Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

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



// [ Chão ]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    posX: 0,
    posY: canvas.height - 112,
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


// [ Flappy Bird ]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    posX: 10,
    posY: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        flappyBird.velocidade += flappyBird.gravidade;
        console.log("velocidade :: " + flappyBird.velocidade);
        flappyBird.posY = flappyBird.posY + flappyBird.velocidade;
    },
    desenha(){
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,    // sprite X, sprite Y
            flappyBird.largura, flappyBird.altura, // tamanho do recorte da imagem
            flappyBird.posX, flappyBird.posY,
            flappyBird.largura, flappyBird.altura,
        );
    }
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
let telaAtiva = {};

function mudaParaTela(novaTela){
    telaAtiva = novaTela;
}

const Telas = {
    INICIO: {
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            mensagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO);
        },
        atualiza(){

        }
    }


};

Telas.JOGO = {
    desenha(){
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza(){
        flappyBird.atualiza();
    }
}


function loop(){
    
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();