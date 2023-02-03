let grid = document.querySelector(".grid");
let score = document.querySelector("#score");
let gameover = document.querySelector(".end");
let message = document.querySelector("#message");
let restartButton = document.querySelector("#restart");
let snakeSize;
let snakePositions;
let position;
let postionBehind;
let direction;
let apple;
let list;
let lastDirection;
let originalPosition;

let startSound = new Audio('audios/start.wav');

let key = document.addEventListener("keydown", setDirection);
restartButton.addEventListener("click", restart);

function startGame(){
    startSound.play();
    vanishGameover();
    message.innerHTML = "Game over";
    restartButton.innerHTML = "Restart";
    list = document.querySelectorAll(".grid-item");
    snakeSize = 3;
    snakePositions = [60,61,62];
    position = 62;
    direction = 3;
    lastDirection = 3;
    movementIntervalId  = setInterval(movement, 100);
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
    list[apple].style.backgroundImage = randomFruit();
}

function randomFruit(){
    let fruit = Math.floor(Math.random() * 4);
    switch(fruit){
        case 0:
            list[apple].style.backgroundSize = "9vmin";
            return "url('images/apple.png')";
        case 1:
            list[apple].style.backgroundSize = "11vmin";
            return "url('images/banana.png')";
        case 2:
            list[apple].style.backgroundSize = "7vmin";
            return "url('images/pina.png')";
        case 3:
            list[apple].style.backgroundSize = "8vmin";
            return "url('images/uvas.png')";
    }
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
    list[snakePositions[0]].style.backgroundImage = "none";

    for (let i = 0; i < snakePositions.length - 1; i++) {
        snakePositions[i] = snakePositions[i + 1];
    }

    printHead();
    printBody();
    printTail();

    snakePositions[snakePositions.length - 1] = position;
}

function printHead() {
        switch (direction) {
            case 1:
                list[position].style.backgroundImage = "url('images/snake/headLEFT.png')";
                break;
            case 2:
                list[position].style.backgroundImage = "url('images/snake/headUP.png')";
                break;
            case 3:
                list[position].style.backgroundImage = "url('images/snake/headRIGHT.png')";
                break;
            case 4:
                list[position].style.backgroundImage = "url('images/snake/headDOWN.png')";
                break;
        }
}

function printBody() {
    switch(direction){
        case 1:
            //up to left
            if(lastDirection === 2){
                list[originalPosition].style.backgroundImage = "url('images/snake/rightDown.png')";
            //down to left
            } else if(lastDirection === 4){
                list[originalPosition].style.backgroundImage = "url('images/snake/rightUP.png')";
            //left to left
            } else{
                list[originalPosition].style.backgroundImage = "url('images/snake/bodyHor.png')";
            }
            break;
        case 2:
            //left to up
            if(lastDirection === 1){
                list[originalPosition].style.backgroundImage = "url('images/snake/leftUP.png')";
            //right to up
            } else if(lastDirection === 3){
                list[originalPosition].style.backgroundImage = "url('images/snake/rightUP.png')";
            //up to up
            } else{
                list[originalPosition].style.backgroundImage = "url('images/snake/bodyVer.png')";
            }
            break;
        case 3:
            //up to right
            if(lastDirection === 2){
                list[originalPosition].style.backgroundImage = "url('images/snake/leftDown.png')";
            //down to right
            } else if(lastDirection === 4){
                list[originalPosition].style.backgroundImage = "url('images/snake/leftUP.png')";
            //right to right
            } else{
                list[originalPosition].style.backgroundImage = "url('images/snake/bodyHor.png')";
            }
            break;
        case 4:
            //left to down
            if(lastDirection === 1){
                list[originalPosition].style.backgroundImage = "url('images/snake/leftDown.png')";
            //right to down
            } else if(lastDirection === 3){
                list[originalPosition].style.backgroundImage = "url('images/snake/rightDown.png')";
            //down to down
            } else{
                list[originalPosition].style.backgroundImage = "url('images/snake/bodyVer.png')";
            }
            break;
    }
}

function printTail(){
    let tail = snakePositions[0];
    let next = snakePositions[1];
    //left
    if(tail === next + 1){
        list[tail].style.backgroundImage = "url('images/snake/tailLEFT.png')";
    //downd
    } else if(tail === next + 15){
        list[tail].style.backgroundImage = "url('images/snake/tailDOWN.png')";
    //right 
    } else if(tail === next - 1){
        list[tail].style.backgroundImage = "url('images/snake/tailRIGHT.png')";
    //up 
    } else{
        list[tail].style.backgroundImage = "url('images/snake/tailUP.png')";
    }
}

function checkApple() {
    if (position === apple) {
        score.innerHTML = parseInt(score.innerHTML) + 10;
        list[apple].style.backgroundImage = "none";
        list[apple].style.backgroundSize = "cover";
        let eatSound = new Audio('audios/eat.wav');
        eatSound.play();
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
    originalPosition = position;
    let checkBackwards = positionBehind(lastDirection);
    switch (direction) {
        //left
        case 1:
            if (position % 15 === 0) {
                gameOver();
                return;
            } else{
                position --;
            }
            break;
        //up
        case 2:
            if (position < 15) {
                gameOver();
                return;
            } else{
                position -= 15;
            }
            break;
        //right
        case 3:
            if(position % 15 === 14){
                gameOver();
                return;
            } else{
                position ++;
            }
            break;
        //down
        case 4:
            if (position > 119) {
                gameOver();
                return;
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
        if (snakePositions.includes(position)) {
            gameOver();
            return;
        }

        checkApple();

        printSnake();

        lastDirection = direction;
    }
}

generateGrid();
