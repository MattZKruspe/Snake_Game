const lienzo = document.querySelector('#lienzo');
const ctx = lienzo.getContext('2d');

let posX = 2;
let posY = 1;

const snake = [];
snake.push({
    x: 2,
    y: 1,
    xNext : 0,
    yNext: 0, 
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🐍', this.x * 20, this.y * 20);
    }
})
snake.push({
    x: 1,
    y: 1,
    xNext : 2,
    yNext: 1, 
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🟢', this.x * 20, this.y * 20);
    }
})
snake.push({
    x: 0,
    y: 1,
    xNext : 1,
    yNext: 1, 
    pinta: function(){
        ctx.font = '25px Serif';
        ctx.fillText('🟢', this.x * 20, this.y * 20);
    }
});

const comida = {
    x: 0,
    y: 0,
    aparece: function(){
        this.x = Math.floor(Math.random() * 30);
        this.y = Math.ceil(Math.random() * 20);
    },
    pinta: function(){
    ctx.font = '25px Serif';
    ctx.fillText('🍎', this.x * 20, this.y * 20);
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
let direcction = 1;

setInterval(() =>{
    ctx.fillRect(0,0,600,400);
    // comida.aparece();
    // comida.pinta();
    snake.forEach(bolita => bolita.pinta());
    if(direcction === 1 ) posX++;
    else if(direcction === 2 ) posY++;
    else if (direcction === 3 ) posX--;
    else posY--;
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