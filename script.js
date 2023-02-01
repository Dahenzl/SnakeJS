let grid = document.querySelector(".grid");
let score = document.querySelector("#score");
let position = 0;
let direction = 0;
let apple = 0;

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

function movement() {
    originalPosition = position
    switch (direction) {
        case 1:
            if (position % 15 === 0) {
                clearInterval(movementIntervalId);
            } else{
                position --;
            }
            break;
        case 2:
            if (position < 15) {
                clearInterval(movementIntervalId);
            } else{
                position -= 15;
            }
            break;
        case 3:
            if(position % 15 === 14){
                clearInterval(movementIntervalId);
            } else{
                position ++;
            }
            break;
        case 4:
            if (position > 119) {
                clearInterval(movementIntervalId);
            } else{
                position += 15;
            }
            break;
    }
    list[originalPosition].style.backgroundColor = "white";
    list[position].style.backgroundColor = "red";
    checkApple();
}

generateGrid();
let list = document.querySelectorAll(".grid-item");

list[position].style.backgroundColor = "red";

document.addEventListener("keydown", setDirection);

movementIntervalId  = setInterval(movement, 400);
apple_generator();
