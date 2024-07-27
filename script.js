const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(event) {
  const cellIndex = parseInt(event.target.dataset.index);
  if (board[cellIndex] === '' &&
 gameActive) {
    board[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    if (checkWin()) {
      showGameEndScreen(`${currentPlayer} wins!`);
      gameActive = false;
    } else if (checkDraw()) {
      showGameEndScreen("It's a draw!");
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  const winPatterns = [

    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !board.includes('');
}

function showGameEndScreen(message) {
  const endScreen = document.createElement('div');
  endScreen.innerHTML = `
    <p>${message}</p>
    <button class="restart-game">Restart Game</button>
    <button class="back-to-intro">Player Selection</button>
  `;
  document.body.appendChild(endScreen);

  // Add event listeners for the buttons
  endScreen.querySelector('.restart-game').addEventListener('click',
    restartGame);
  endScreen.querySelector('.back-to-intro').addEventListener('click',
    backToIntro);
}

function restartGame() {
  const endScreen = document.querySelector('.end-screen');
  endScreen.remove();
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
  });
}

function backToIntro() {
  const endScreen = document.querySelector('.end-screen');
  endScreen.remove();
  window.location.href = 'index.html';
}


