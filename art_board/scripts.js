const grid = document.querySelector(".grid");

const reset = document.querySelector("button");
reset.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");

    for (let i=0; i<cells.length; i++) {
        const cell = cells[i];
        cell.style.backgroundColor = "white";
    };

    /*
    cells.forEach((cell) => {
        cell.style.backgroundColor = "white";
    });
    */
});

for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        cell.addEventListener("click", () => {
            const select = document.querySelector("select");
            const selectedColor = select.value; // The color selected from the dropdown
            const currentBackground = window.getComputedStyle(cell).backgroundColor;

            // Normalize the colors and compare
            if (currentBackground === "rgb(255, 255, 255)" || currentBackground === "white") {
                // If it's white, change to the selected color
                cell.style.backgroundColor = selectedColor;
            } else {
                // Otherwise, change to white
                cell.style.backgroundColor = "white";
            }
        });

        row.appendChild(cell);
    }

    grid.appendChild(row);
}
