let grid = document.querySelector(".grid");
let score = document.querySelector("#score");
let gameover = document.querySelector(".end");
let message = document.querySelector("#message");
let restartButton = document.querySelector("#restart");
let pauseButton = document.querySelector("#pause");
let columns = 23;
let rows = 14;
let sizeGrid = columns * rows;
let snakeSize;
let snakePositions;
let position;
let postionBehind;
let direction;
let apple;
let list;
let lastDirection;
let originalPosition;
let touchstartX = 0
let touchendX = 0
let touchstartY = 0
let touchendY = 0

document.addEventListener("keydown", setDirection);
restartButton.addEventListener("click", restart);
pauseButton.addEventListener("click", pause);

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
    touchstartY = e.changedTouches[0].screenY
})
  
document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    touchendY = e.changedTouches[0].screenY
    checkDirection()
})

function startGame(){
    vanishGameover();
    pauseButton.style.display = "flex";
    list = document.querySelectorAll(".grid-item");
    snakeSize = 3;
    snakePositions = [115,116,117];
    position = 117;
    direction = 3;
    lastDirection = 3;
    movementIntervalId  = setInterval(movement, 125);
    apple_generator();
}

function generateGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < sizeGrid; i++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");
        if(i%2 === 0){
            item.style.backgroundColor = "green";
        } else{
            item.style.backgroundColor = "lightgreen";
        }
        grid.appendChild(item);
    }
}

function setDirection(e) {
    switch (e.keyCode) {
        //left
        case 65:
        case 37:
            if(direction !== 3){
                direction = 1;
            }
            break;
        //up
        case 87:
        case 38:
            if(direction !== 4){
                direction = 2;
            }
            break;
        //right
        case 68:
        case 39:
            if(direction !== 1){
                direction = 3;
            }
            break;
        //down
        case 83:
        case 40:
            if(direction !== 2){
                direction = 4;
            }
            break;
        case 27:
            if(gameover.style.display === "none"){
                pause();
            }
            break;
    }
}

function pause(){
    let pauseSound = new Audio("audios/start.wav");
    pauseSound.play();
    clearInterval(movementIntervalId);
    message.innerHTML = "Paused";
    restartButton.innerHTML = "Continue";
    gameover.style.display = "flex";
}

function apple_generator() {
    let lastApple = apple;
    do{
        apple = Math.floor(Math.random() * sizeGrid);
    } while(snakePositions.includes(apple) || apple === lastApple);
    list[apple].style.backgroundImage = randomFruit();
}

function randomFruit(){
    let fruit = Math.floor(Math.random() * 4);
    switch(fruit){
        case 0:
            list[apple].style.backgroundSize = "calc(var(--vmin, 1vmin) * 6)";
            return "url('images/apple.png')";
        case 1:
            list[apple].style.backgroundSize = "calc(var(--vmin, 1vmin) * 8)";
            return "url('images/banana.png')";
        case 2:
            list[apple].style.backgroundSize = "calc(var(--vmin, 1vmin) * 4.3)";
            return "url('images/pina.png')";
        case 3:
            list[apple].style.backgroundSize = "calc(var(--vmin, 1vmin) * 4.6)";
            return "url('images/uva.png')";
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
            return position + columns;
        case 3:
            return position - 1;
        case 4:
            return position - columns;
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
    } else if(tail === next + columns){
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
    pauseButton.style.display = "none";
    message.innerHTML = "Game over";
    restartButton.innerHTML = "Restart";
    gameover.style.display = "flex";
}

function restart() {
    let buttonSound = new Audio('audios/start.wav');
    buttonSound.play();
    if(message.innerHTML === "Paused"){
        direction = lastDirection;
        movementIntervalId = setInterval(movement, 125);
        vanishGameover();
    } else{
        generateGrid();
        score.innerHTML = 0;
        startGame();
    }
}

function movement() {
    originalPosition = position;
    let checkBackwards = positionBehind(lastDirection);
    switch (direction) {
        //left
        case 1:
            if (position % columns === 0) {
                gameOver();
                return;
            } else{
                position --;
            }
            break;
        //up
        case 2:
            if (position < columns) {
                gameOver();
                return;
            } else{
                position -= columns;
            }
            break;
        //right
        case 3:
            if(position % columns === columns - 1){
                gameOver();
                return;
            } else{
                position ++;
            }
            break;
        //down
        case 4:
            if (position > (columns * rows) - columns - 1) {
                gameOver();
                return;
            } else{
                position += columns;
            }
            break;
    }

    if(position === checkBackwards){
        position = originalPosition;
        direction = lastDirection;
        movement();
    } else{
        if (snakePositions.includes(position)) {
            if(position !== snakePositions[0]){
                gameOver();
                return;
            } 
        }

        checkApple();

        printSnake();

        lastDirection = direction;
    }
}

function checkDirection() {
    let changeX = touchendX - touchstartX;
    let changeY = touchendY - touchstartY;
    if(Math.abs(changeX) > Math.abs(changeY)){
        if(changeX < 0){
            direction = 1;
        } else{
            direction = 3;
        }
    } else{
        if(changeY < 0){
            direction = 2;
        } else{
            direction = 4;
        }
    }
}

function resizeOps() {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
    document.documentElement.style.setProperty("--vw", window.innerWidth * 0.01 + "px");
    let newWidth = window.innerWidth * 0.01;
    let newHeight = window.innerHeight * 0.01;
    if(newWidth < newHeight){
        document.documentElement.style.setProperty("--vmin", newWidth + "px");
    } else{
        document.documentElement.style.setProperty("--vmin", newHeight + "px");
    }
};

resizeOps();
window.addEventListener("resize", resizeOps);


generateGrid();
