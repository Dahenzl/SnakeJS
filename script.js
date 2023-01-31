let grid = document.querySelector(".grid");

function generateGrid() {
    for (let i = 0; i < 135; i++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");
        item.style.backgroundColor = randomColor();
        grid.appendChild(item);
    }
}

function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

generateGrid();