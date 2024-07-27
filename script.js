const cells = Array.from(document.querySelectorAll('button[id^="cell-"]'));
const resetButton = document.getElementById('reset-button');
const introScreen = document.getElementById('intro-screen');
const gameScreen = document.getElementById('game-screen');
let currentPlayer = '';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = cells.indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkForWinner() {
    for (const element of winningConditions) {
        const [a, b, c] = element;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            alert(`Player ${gameState[a]} wins!`);
            gameActive = false;
            return;
        }
    }

    if (!gameState.includes('')) {
        alert("It's a draw!");
        gameActive = false;
    }
}

function resetGame() {
    gameActive = true;
    currentPlayer = '';
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    introScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
}

function startGame(player) {
    currentPlayer = player;
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    introScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
document.getElementById('choose-x').addEventListener('click', () => startGame('X'));
document.getElementById('choose-o').addEventListener('click', () => startGame('O'));
