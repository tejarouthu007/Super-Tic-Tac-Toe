const games = document.querySelectorAll(".subGame")
const subStatusText = document.querySelector("#subStatusText");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [6,3,0],
    [7,4,1],
    [8,5,2],
    [0,4,8],
    [6,4,2],
];
let options = [
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""],
    ["","","","","","","","",""]
];
let mainOptions = ["","","","","","","","",""];
let game = false;
let currentPlayer = "X";
let currentSubGame = "";

startGame();

function startGame() {
    game = true;
    games.forEach(function(game) {
        const cells = game.querySelectorAll(".cell");
        cells.forEach(cell => cell.addEventListener("click",function() {
            cellClicked(this, game.getAttribute("gameIndex"));
        }));
    });
    restartBtn.addEventListener("click",restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
}
function cellClicked(cell, gameIdx) {
    const idx = cell.getAttribute("cellIndex");

    if(mainOptions[gameIdx]!="" || options[gameIdx][idx]!="" || !game) {
        return;
    }

    if(currentSubGame=="") {
        currentSubGame = gameIdx;
    }

    if(currentSubGame==gameIdx) {
        updateCell(cell,idx,gameIdx);
        checkWinner(gameIdx);

        if(mainOptions[idx]!="") {
            currentSubGame = "";
        } 
        else {
            currentSubGame = idx;
        }
        changePlayer(idx); 
    } 
}
function updateCell(cell,idx,gameIdx) {
    options[gameIdx][idx] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(gameIdx) {
    if(!game) return;
    currentPlayer = (currentPlayer == "X")? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    if(mainOptions[gameIdx]=="") {
        statusText.textContent += ` (${currentPlayer} has to play Board-${parseInt(gameIdx,10)+1} now)`;
    } 
    else {
        statusText.textContent += ` (${currentPlayer} can play any Board now)`;
    }
}
function checkWinner(gameIdx) {
    let won = false;
    for(let i=0; i<winConditions.length; i++) {
        const condition = winConditions[i];
        const cell0 = options[gameIdx][condition[0]];
        const cell1 = options[gameIdx][condition[1]];
        const cell2 = options[gameIdx][condition[2]];
        
        if(cell0=="" || cell1=="" || cell2=="") {
            continue;
        }

        if(cell0==cell1 && cell2==cell1) {
            won = true;
            const color = currentPlayer == "X" ? "blue" :"red";
            const cells = games[gameIdx].querySelectorAll(".cell");
            cells.forEach(function(cell, i) {
                    if(i==condition[0] || i==condition[1] || i==condition[2]) {
                        cell.style.color = color;
                    }
            });
            break;
        }
    }
    if(won) {
        subStatusText.textContent = `Board-${parseInt(gameIdx,10)+1} is now marked for ${currentPlayer}!`;
        mainOptions[gameIdx] = currentPlayer;
        checkGameWinner();
    }
    else if(!options[gameIdx].includes("")) {
        subStatusText.textContent = `Board-${parseInt(gameIdx,10)+1} is now marked as Draw!`;
        mainOptions[gameIdx] = "D";
    }
}
function checkGameWinner() {
    let won = false;
    for(let i=0; i<winConditions.length; i++) {
        const condition = winConditions[i];
        const cell0 = mainOptions[condition[0]];
        const cell1 = mainOptions[condition[1]];
        const cell2 = mainOptions[condition[2]];
        
        if(cell0=="" || cell1=="" || cell2=="" || cell0=="D" || cell1=="D" || cell2=="D") {
            continue;
        }

        if(cell0==cell1 && cell2==cell1) {
            won = true;
            break;
        }
    }
    if(won) {
        statusText.textContent = `${currentPlayer} wins!`;
        subStatusText.textContent = "";
        tileStatus.textContent = "";
        game = false;
    }
    else if(!mainOptions.includes("")) {
        statusText.textContent = `Draw!`;
        subStatusText.textContent = "";
        tileStatus.textContent = "";
        game = false;
    }
}
function restartGame() {
    currentPlayer = "X";
    currentSubGame = "";
    options = [
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""]
    ];
    mainOptions = ["","","","","","","","",""];
    subStatusText.textContent = "";
    statusText.textContent = `${currentPlayer}'s turn`;
    const allCells = document.querySelectorAll(".cell");
    allCells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "black";
    });
    game = true;
}
