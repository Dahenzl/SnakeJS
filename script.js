let grid = document.querySelector(".grid");
let score = document.querySelector("#score");
let gameover = document.querySelector(".end");
let restartButton = document.querySelector("#restart");
let position;
let direction ;
let apple;
let list;


document.addEventListener("keydown", setDirection);
restartButton.addEventListener("click", restart);

function startGame(){
    vanishGameover();
    generateGrid();
    list = document.querySelectorAll(".grid-item");
    position = 0;
    direction = 0;
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
            direction = 1;
            break;
        case 87:
            direction = 2;
            break;
        case 68:
            direction = 3;
            break;
        case 83:
            direction = 4;
            break;
    }
}

function apple_generator() {
    apple = Math.floor(Math.random() * 135);
    list[apple].style.backgroundColor = "green";
}

function checkApple() {
    if (position === apple) {
        score.innerHTML = parseInt(score.innerHTML) + 10;
        apple_generator();
    }
}

function vanishGameover() {
    gameover.style.display = "none";
}

function gameOver() {
    gameover.style.display = "flex";
    clearInterval(movementIntervalId);
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
    originalPosition = position
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
    list[originalPosition].style.backgroundColor = "white";
    list[position].style.backgroundColor = "red";
    checkApple();
}

startGame();

