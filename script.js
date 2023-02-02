let grid = document.querySelector(".grid");
let score = document.querySelector("#score");
let gameover = document.querySelector(".end");
let restartButton = document.querySelector("#restart");
let snakeSize = 1;
let snakePositions = [0];
let position;
let postionBehind;
let direction;
let apple;
let list;
let lastDirection;


let key = document.addEventListener("keydown", setDirection);
restartButton.addEventListener("click", restart);

function startGame(){
    vanishGameover();
    generateGrid();
    list = document.querySelectorAll(".grid-item");
    snakeSize = 1;
    snakePositions = [0];
    position = 0;
    direction = 3;
    lastDirection = 3;
    list[position].style.backgroundColor = "red";
    movementIntervalId  = setInterval(movement, 400);
    apple_generator();
}

function generateGrid() {
    for (let i = 0; i < 135; i++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");
        grid.appendChild(item);
    }
}

function setDirection(e) {
    switch (e.keyCode) {
        case 65:
            if(direction !== 3){
                direction = 1;
            }
            break;
        case 87:
            if(direction !== 4){
                direction = 2;
            }
            break;
        case 68:
            if(direction !== 1){
                direction = 3;
            }
            break;
        case 83:
            if(direction !== 2){
                direction = 4;
            }
            break;
    }
}

function apple_generator() {
    do{
        apple = Math.floor(Math.random() * 135);
    } while(snakePositions.includes(apple));
    list[apple].style.backgroundColor = "green";
}

function increaseSnake() {
    snakeSize ++;
    snakePositions.unshift(positionBehind(direction));
}

function positionBehind(dir){
    switch (dir) {
        case 1:
            return position + 1;
        case 2:
            return position + 15;
        case 3:
            return position - 1;
        case 4:
            return position - 15;
    }
}

function printSnake() {
    list[snakePositions[0]].style.backgroundColor = "white";


    for (let i = 0; i < snakePositions.length - 1; i++) {
        snakePositions[i] = snakePositions[i + 1];
        list[snakePositions[i]].style.backgroundColor = "red";
    }

    list[position].style.backgroundColor = "red";
    snakePositions[snakePositions.length - 1] = position;
}

function checkSnake() {
    if (snakePositions.includes(position)) {
        gameOver();
    }
}

function checkApple() {
    if (position === apple) {
        score.innerHTML = parseInt(score.innerHTML) + 10;
        apple_generator();
        increaseSnake();
    }
}

function vanishGameover() {
    gameover.style.display = "none";
}

function gameOver() {
    clearInterval(movementIntervalId);
    gameover.style.display = "flex";
}

function restart() {
    refreshGrid();
    score.innerHTML = 0;
    startGame();
}

function refreshGrid() {
    list[position].style.backgroundColor = "white";
    list[apple].style.backgroundColor = "white";
    grid.innerHTML = "";
}

function movement() {
    let originalPosition = position;
    let checkBackwards = positionBehind(lastDirection);
    switch (direction) {
        case 1:
            if (position % 15 === 0) {
                gameOver();
            } else{
                position --;
            }
            break;
        case 2:
            if (position < 15) {
                gameOver();
            } else{
                position -= 15;
            }
            break;
        case 3:
            if(position % 15 === 14){
                gameOver();
            } else{
                position ++;
            }
            break;
        case 4:
            if (position > 119) {
                gameOver();
            } else{
                position += 15;
            }
            break;
    }

    if(position === checkBackwards){
        position = originalPosition;
        direction = lastDirection;
        movement();
    } else{
        checkSnake();

        checkApple();

        printSnake();

        lastDirection = direction;
    }
}

startGame();

