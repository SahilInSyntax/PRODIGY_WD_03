const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

const checkWinner = () => {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      message.textContent = `${currentPlayer} wins!`;
      cells[a].classList.add('win');
      cells[b].classList.add('win');
      cells[c].classList.add('win');
    }
  }
};

const checkDraw = () => {
  if (!board.includes('')) {
    gameActive = false;
    message.textContent = "It's a draw!";
  }
};

const handleClick = (index) => {
  if (board[index] || !gameActive) return;
  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add(currentPlayer);
  checkWinner();
  if (gameActive) {
    checkDraw();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `${currentPlayer}'s turn`;
  }
};

const handleRestart = () => {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  message.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'win');
  });
};

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index));
});

restartBtn.addEventListener('click', handleRestart);
