const BOX = 32;
const popup = document.querySelector('.block-lose');
const buttonStart = popup.querySelector('.button-start');


const canvas = document.querySelector('#game');
const сontext = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/snake-field.png";

const food = new Image();
food.src = "img/food.jpg";

let score = 0;

let foodСoordinates = {
    x: Math.floor((Math.random() * 17 + 1)) * BOX,
    y: Math.floor((Math.random() * 15 + 3)) * BOX 
}

let snake = [];
snake[0] = {
    x: 9 * BOX,
    y: 10 * BOX
}

document.addEventListener("keydown", direction);
let dir;

function direction (event) {
    if(event.keyCode == 37 && dir != "right") {
        dir = "left";
    } else if(event.keyCode == 38 && dir != "down") {
        dir = "up";
    } else if(event.keyCode == 39 && dir != "left") {
        dir = "right";
    } else if(event.keyCode == 40 && dir != "up") {
        dir = "down";
    }
}

function eatTail(head, bodySnake) {
    for(let i = 0; i < bodySnake.length; i++){
        if(head.x == bodySnake[i].x && head.y == bodySnake[i].y)
        clearInterval(field);
    }
}

function drawGame () {
    сontext.drawImage(ground, 0, 0);
    сontext.drawImage(food, foodСoordinates.x, foodСoordinates.y);
    for(let i = 0; i < snake.length; i++){
        сontext.fillStyle = i == 0 ? 'green' : '#00FF00';
        сontext.fillRect(snake[i].x, snake[i].y, BOX, BOX)
    }
    сontext.fillStyle = "white";
    сontext.font = "50px Arial";
    сontext.fillText(score, BOX * 2.5, BOX * 1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == foodСoordinates.x && snakeY == foodСoordinates.y) {
        score++;
        foodСoordinates = {
            x: Math.floor((Math.random() * 17 + 1)) * BOX,
            y: Math.floor((Math.random() * 15 + 3)) * BOX 
        }
    } else {
        snake.pop();
    }

    if(snakeX < BOX || snakeX > BOX * 17 || snakeY < 3 * BOX || snakeY > BOX * 17) {
        clearInterval(field);
        popup.style.opacity = 1;
        buttonStart.addEventListener('click', function(){
            location.reload()
        })
    }

    if(dir == "left") {
        snakeX -= BOX;
    };
    if(dir == "right") {
        snakeX += BOX;
    };
    if(dir == "up") {
        snakeY -= BOX;
    };
    if(dir == "down") {
        snakeY += BOX;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake);

    snake.unshift(newHead);
}

const field = setInterval(drawGame, 200);
