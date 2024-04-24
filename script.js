document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restartButton');
    const statusDisplay = document.getElementById('statusDisplay');
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let turn = 'X';

    function setStatusMessage(turn) {
        statusDisplay.textContent = `${turn}'s turn`;
    }

    function checkWin(board, currentPlayer) {
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
        return winningCombinations.some(combination => 
            combination.every(index => board[index] === currentPlayer)
        );
    }

    function isDraw(board) {
        return board.every(cell => cell) && !checkWin(board, 'X') && !checkWin(board, 'O');
    }

    function handleClick(index) {
        if (gameBoard[index] || checkWin(gameBoard, turn)) {
            return;
        }

        gameBoard[index] = turn;
        renderBoard();

        if (checkWin(gameBoard, turn)) {
            statusDisplay.textContent = `${turn} wins!`;
            document.body.style.backgroundColor = "#90ee90";
            return;
        } else if (isDraw(gameBoard)) {
            statusDisplay.textContent = 'Draw!';
            document.body.style.backgroundColor = "#ffcccb";
            return;
        }

        turn = turn === 'X' ? 'O' : 'X';
        setStatusMessage(turn);
    }

    function renderBoard() {
        gameBoard.forEach((cell, index) => {
            cells[index].textContent = cell;
        });
    }

    function restartGame() {
        gameBoard.fill('');
        turn = 'X';
        setStatusMessage(turn);
        renderBoard();
        document.body.style.backgroundColor = '';
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleClick(index));
    });
    restartButton.addEventListener('click', restartGame);
});

