let grid = document.querySelector(".grid");

function generateGrid() {
    for (let i = 0; i < 135; i++) {
        let item = document.createElement("div");
        item.classList.add("grid-item");
        item.appendChild(document.createTextNode(i));
        grid.appendChild(item);
    }
}

generateGrid();