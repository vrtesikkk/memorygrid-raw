let GRID_SIZE = 4;
const CELLS_TO_REMEMBER = 4;
const SHOW_TIME = 2000;

let correctCells = [];
let selectedCells = [];
let currentRound = 0;
let phase = "idle";

function buildGrid() {
    const grid = document.getElementById("grid");
    grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 80px)`;
    grid.innerHTML = "";
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", onCellClick);
        grid.appendChild(cell);
    }
}
 

function getRandomCells(count) {
    const all = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);
    return all.sort(() => 0.5 - Math.random()).slice(0, count);
}


function showCells(cells) {
    correctCells.forEach(i => {
        document.querySelector(`.cell[data-index="${i}"]`).classList.add("active");

        
    });
}

function hideCells() {
    correctCells.forEach(i => {
        document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("active"));
    });
}


function onCellClick(e) {
    if (phase !== "input") return;

    const index = Number(e.target.dataset.index);
    if (selectedCells.includes(index)) return;

    selectedCells.push(index);
    e.target.classList.add("selected");

    if (selectedCells.length === correctCells.length) {
        checkResult();
    }
}


function checkResult() {
    phase = "idle";
    const correct = correctCells.every(i => selectedCells.includes(i));
    document.getElementById("message").textContent = correct ? "Correct!" : "Wrong!";

    correctCells.forEach(i => {
        document.querySelector(`.cell[data-index="${i}"]`).classList.add("active");
    });

    if (currentRound >= 5) {
        document.getElementById("startBtn").textContent = "Start";
        setTimeout(() => {
            document.getElementById("resultBox").style.display = "block";
        }, 800);
    }
    while ("resultBox" == "block") {
        document.getElementById("startBtn").style.cursor = "not-allowed";
    }

    if (correct){
        document.getElementById("resultText").textContent = "You completed " + currentRound + " rounds!";
    }
}


function startRound() {
    if (currentRound >= 5) return;
    currentRound++;
    document.getElementById("startBtn").textContent = "Next round";
    GRID_SIZE = 3 + currentRound;
    document.getElementById("round").textContent = "Round: " + currentRound + " / 5";

    buildGrid();
    selectedCells = [];
    correctCells = getRandomCells(CELLS_TO_REMEMBER);
    document.getElementById("message").textContent = "Remember the highlighted cells!";
    document.querySelectorAll(".cell").forEach(c => c.classList.remove("active", "selected"));

    phase = "show";
    showCells();

    setTimeout(() => {
        hideCells();
        phase = "input";
        document.getElementById("message").textContent = "Select the cells you remember!";
    }, SHOW_TIME);
}

document.getElementById("startBtn").addEventListener("click", startRound);

document.getElementById("restartBtn").addEventListener("click", () => {
    currentRound = 0;
    GRID_SIZE = 4;
    selectedCells = [];
    correctCells = [];
    phase = "idle";
    document.getElementById("round").textContent = "Round: 0 / 5";
    document.getElementById("message").textContent = "";
    document.getElementById("resultBox").style.display = "none";
    document.getElementById("startBtn").textContent = "Start";
    buildGrid();
});

buildGrid();


