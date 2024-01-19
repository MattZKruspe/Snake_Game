const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');

let posX = 2;
let posY = 1;
let direction = 1;

const eathing = new Audio('./eating-sound-effect-36186.mp3');
const death = new Audio('./negative_beeps-6008.mp3');

function start(){

    posX = 2;
    posY = 1;
    direction = 1;

    const snake = [];
snake.push({
    x: 2,
    y: 1,
    xNext: 0,
    yNext: 0,
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🟢', this.x * 20, this.y * 20);
    }
});
snake.push({
    x: 1,
    y: 1,
    xNext: 2,
    yNext: 1,
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🟡', this.x * 20, this.y * 20);
    }
});
snake.push({
    x: 0,
    y: 1,
    xNext: 1,
    yNext: 1,
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🟡', this.x * 20, this.y * 20);
    }
})
return snake;
}

let snake = start();

const comida = {
    x: 0,
    y: 0,
    aparece: function(){
        this.x = Math.floor(Math.random() * 25);
        this.y = Math.ceil(Math.random() * 15);
    },
    pinta: function(){
    ctx.font = '25px Serif';
    ctx.fillText('🟡', this.x * 20, this.y * 20);
}
}
function nextMove(){
    snake.forEach((bolita, index) => {
        if(index === 0){
            bolita.x = posX;
            bolita.y = posY;
        }else{
            bolita.x = bolita.xNext;
            bolita.y = bolita.yNext;
            bolita.xNext = snake[index - 1].x;
            bolita.yNext = snake[index - 1].y;
        }
    })
}

function checkEat(){
    if(snake[0].x === comida.x && snake [0].y === comida.y){
        eathing.play();
        snake.push({...snake[1]});
        comida.aparece();
    }
}

function gameOver(){
    for(let i=1; i<snake.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    return false;
}



comida.aparece();

setInterval(() =>{
    ctx.fillRect(0,0,600,400);
    snake.forEach(bolita => bolita.pinta());
    comida.pinta();

    checkEat();

    if(gameOver()){
        death.play();
        alert('😂!!Perdiste!!😂');
        snake = start();
    } 

    
    if(direction ===1 ) posX++;
    else if (direction === 2 ) posY ++;
    else if (direction === 3) posX--;
    else posY--; 

    if(posX > 25) posX = 0;
    else if(posX < 0) posX = 25;
    if(posY > 15) posY = 1;
    else if(posY < 1) posY =15;
    nextMove();
}, 200);

document.querySelector('body')
.addEventListener('keydown', function(e){
    switch(e.key){
        case 'ArrowUp':
            direction = 4;
            break;
        case 'ArrowRight':
            direction = 1;
            break;
        case 'ArrowLeft':
            direction = 3;
            break;
        case 'ArrowDown':
            direction = 2;
            break;}
})
document.querySelector('.container')
    .addEventListener('click', (e) => {
        if(e.target.classList.contains('btn')){
            const bText = e.target.innerText;
            if(bText === 'Up') direction = 4;
            else if(bText === 'Right') direction = 1;
            else if(bText === 'Down') direction = 2;
            else direction = 3;
        }
    })