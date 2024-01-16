const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');

let posX = 2;
let posY = 1;
let direcction = 1;


const eating = new Audio('./eating-sound-effect-36186.mp3');
const death = new Audio('./negative_beeps-6008.mp3');

function start(){

    posX = 2;
    posY = 1;

    // direcction = 1;

const snake = [];
snake.push({
    x: 2,
    y: 1,
    xNext : 0,
    yNext: 0, 
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('💀', this.x * 20, this.y * 20);
    }
})
snake.push({
    x: 1,
    y: 1,
    xNext : 2,
    yNext: 1, 
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🔵', this.x * 20, this.y * 20);
    }
})
snake.push({
    x: 0,
    y: 1,
    xNext : 1,
    yNext: 1, 
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🔵', this.x * 20, this.y * 20);
    }
});
return snake;
}

let snake = start()

const comida = {
    x: 0,
    y: 0,
    aparece: function(){
        this.x = Math.floor(Math.random() * 25);
        this.y = Math.ceil(Math.random() * 15);
    },
    pinta: function(){
    ctx.font = '25px Serif';
    ctx.fillText('🍕', this.x * 20, this.y * 20);
}
}

function nextMove(){
    snake.forEach((bolita,index) => {
        if(index === 0){
            bolita.x = posX;
            bolita.y = posY;
        } else {
            bolita.x = bolita.xNext;
            bolita.y = bolita.yNext;
            bolita.xNext = snake[index - 1].x;
            bolita.yNext = snake[index - 1].y;
        }
    })
}

function checkEat(){
if(snake[0].x === comida.x && snake[0].y === comida.y){
eating.play();
snake.push({...snake[1]});
comida.aparece();

}

}

function gameOver () {
    for(let i = 1; i <snake.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            death.play();
            return true;
        }
    }
}



comida.aparece();

setInterval(() =>{
    ctx.fillRect(0,0,600,400);
    snake.forEach(bolita => bolita.pinta());

    comida.pinta();
    
    checkEat();

    if(gameOver()) {
        alert('Perdiste WEEEY');
        snake = start();
    }

    if(direcction === 1 ) posX++;
    else if(direcction === 2 ) posY++;
    else if (direcction === 3 ) posX--;
    else posY--;

    if(posX > 24 ) posX = 0;
    else if (posX<0) posX = 24;
    if(posY>15) posY=1;
    else if (posY<1 ) posY = 15;

    nextMove();
}, 500);

document.querySelector('body')
.addEventListener('keydown', function(e){
    switch(e.key){
        case 'ArrowUp':
            direcction = 4;
            break;
        case 'ArrowRight':
            direcction = 1;
            break;
        case 'ArrowLeft' :
            direcction = 3;
            break;
        case 'ArrowDown' :
            direcction = 2;
            break;
    }
});
document.querySelector('.container')
.addEventListener('click', (e) =>{
    if(e.target.classList.constains('btn')){
        const bText = e.tarjet.innerText;
        if(bText === 'ip') direction = 4
        else if (bText === 'Right') direcction = 1;
        else if(bText === 'Down') direcction = 2;
        else direcction =3;
    }
})