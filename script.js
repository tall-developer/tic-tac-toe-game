document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset-button');
    const chooseXButton = document.getElementById('choose-x');
    const chooseOButton = document.getElementById('choose-o');
    const introScreen = document.getElementById('intro-screen');
    const gameScreen = document.getElementById('game-screen');
    const gameAlert = document.getElementById('game-alert');
    const alertMessage = document.getElementById('alert-message');
    const restartButton = document.getElementById('restart-button');
    const exitButton = document.getElementById('exit-button');
    const overlay = document.getElementById('overlay');

    let currentPlayer = '';
    let aiPlayer = '';
    let board = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

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

    const handleResultValidation = () => {
        let roundWon = false;
        let winningPlayer = '';

        for (const condition of winningConditions) {
            const [a, b, c] = condition.map(index => board[index]);

            if (a !== '' && a === b && b === c) {
                roundWon = true;
                winningPlayer = a;
                break;
            }
        }

        if (roundWon) {
            setTimeout(() => showResult(winningPlayer), 200);
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            setTimeout(() => showResult('Draw'), 200);
            isGameActive = false;
        }
    };

    const showResult = (winner) => {
        if (winner === 'Draw') {
            alertMessage.textContent = "Ugh!😒 It's a draw!";
        } else {
            alertMessage.textContent = `Player ${winner} wins!🍾🥂🔥🎊😂😎`;
        }
        gameAlert.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === aiPlayer) {
            setTimeout(aiMove, 1000); // AI move delay of 1 second
        }
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('id').split('-')[1]);

        if (board[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
        handlePlayerChange();
    };

    const aiMove = () => {
        if (!isGameActive) return; // Ensure AI does not make a move if the game is over

        const availableCells = [];
        board.forEach((cell, index) => {
            if (cell === '') {
                availableCells.push(index);
            }
        });

        if (availableCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            const aiCellIndex = availableCells[randomIndex];
            const aiCell = document.getElementById(`cell-${aiCellIndex}`);
            handleCellPlayed(aiCell, aiCellIndex);
            handleResultValidation();
            handlePlayerChange();
        }
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        gameAlert.classList.add('hidden');
        overlay.classList.add('hidden');

        cells.forEach(cell => {
            cell.textContent = '';
        });
    };

    const startGame = (player) => {
        currentPlayer = player;
        aiPlayer = player === 'X' ? 'O' : 'X';
        introScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        resetGame();
    };

    chooseXButton.addEventListener('click', () => startGame('X'));
    chooseOButton.addEventListener('click', () => startGame('O'));
    resetButton.addEventListener('click', resetGame);
    restartButton.addEventListener('click', resetGame);
    exitButton.addEventListener('click', () => {
        gameAlert.classList.add('hidden');
        overlay.classList.add('hidden');
        introScreen.classList.remove('hidden');
        gameScreen.classList.add('hidden');
    });

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
