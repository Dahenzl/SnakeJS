let grid = document.querySelector(".grid");
let score = document.querySelector("#score");
let gameover = document.querySelector(".end");
let message = document.querySelector("#message");
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
    message.innerHTML = "Game over";
    restartButton.innerHTML = "Restart";
    list = document.querySelectorAll(".grid-item");
    snakeSize = 1;
    snakePositions = [0];
    position = 0;
    direction = 3;
    lastDirection = 3;
    list[position].style.backgroundColor = "red";
    movementIntervalId  = setInterval(movement, 300);
    apple_generator();
}

function generateGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < 135; i++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");
        if(i%2===0){
            item.style.backgroundColor = "green";
        } else{
            item.style.backgroundColor = "lightgreen";
        }
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
    let lastApple = apple;
    do{
        apple = Math.floor(Math.random() * 135);
    } while(snakePositions.includes(apple) || apple === lastApple);
    list[apple].style.backgroundImage = "url('images/apple.png')";
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
    if(snakePositions[0]%2===0){
        list[snakePositions[0]].style.backgroundColor = "green";
    } else{
        list[snakePositions[0]].style.backgroundColor = "lightgreen";
    }

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
        list[apple].style.backgroundImage = "none";
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
    generateGrid();
    score.innerHTML = 0;
    startGame();
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

generateGrid();
