const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const statusDisplay = document.getElementById('statusDisplay');
let turn = 'X';

const setStatusMessage = () => {
    statusDisplay.textContent = `${turn}'s turn`;
};

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
    const cell = e.target;

    if (cell.textContent || checkWin(turn)) {
        return;
    }

    cell.textContent = turn;

    if (checkWin(turn)) {
        statusDisplay.textContent = `${turn} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick)); // Prevent further moves
        return;
    } else if (isDraw()) {
        statusDisplay.textContent = `Draw!`;
        return;
    }
    
    turn = turn === 'X' ? 'O' : 'X';
    setStatusMessage();
}

function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {
        if (combination.every(index => cells[index].textContent === currentPlayer)) {
            setTimeout(() => { // Add a slight delay to see the winning move before clearing
                clearCells();
                changeBackgroundToGreen();
            }, 500);
            return true;
        }
        return false;
    });
}

function clearCells() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
function changeBackgroundToGreen() {
    document.body.style.backgroundColor = "#90ee90";
}

function isDraw() {
    return [...cells].every(cell => cell.textContent);
}

function restartGame() {
    clearCells();
    turn = 'X';
    document.body.style.backgroundColor = ""; // Reset the background color if you changed it upon winning
    setStatusMessage();
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}


setStatusMessage(); // Initialize the status message

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);