let grid = document.querySelector(".grid");
let position = 0;
let direction = 0;

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

function movement() {
    originalPosition = position
    switch (direction) {
        case 1:
            position--;
            break;
        case 2:
            position -= 15;
            break;
        case 3:
            position++;
            break;
        case 4:
            position += 15;
            break;
        default:
            break;
    }

    if ((position < 0 || position > 134) || ((position+1)%15 == 0)) {
        clearInterval(movementIntervalId);
    } else {
        list[originalPosition].style.backgroundColor = "white";
        list[position].style.backgroundColor = "red";
    }
}

generateGrid();
let list = document.querySelectorAll(".grid-item");

list[position].style.backgroundColor = "red";

document.addEventListener("keydown", setDirection);

movementIntervalId  = setInterval(movement, 400);