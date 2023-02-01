let grid = document.querySelector(".grid");
let position = 0;
let direction = 3;

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
    list[position].style.backgroundColor = "white";
    switch (direction) {
        case 1:
            if (position % 15 === 0) {
                position = 0;
                direction = 3;
            } else{
                position --;
            }
            break;
        case 2:
            if (position < 15) {
                position = 0;
                direction = 3;
            } else{
                position -= 15;
            }
            break;
        case 3:
            if(position % 15 === 14){
                position = 0;
                direction = 3;
            } else{
                position ++;
            }
            break;
        case 4:
            if (position > 119) {
                position = 0;
                direction = 3;
            } else{
                position += 15;
            }
            break;
    }
    list[position].style.backgroundColor = "red";
}

generateGrid();
let list = document.querySelectorAll(".grid-item");

list[position].style.backgroundColor = "red";

document.addEventListener("keydown", setDirection);

setInterval(movement, 400);
