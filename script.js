document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restartButton');
    const statusDisplay = document.getElementById('statusDisplay');
    let turn = 'X';

    function setStatusMessage(turn) {
        statusDisplay.textContent = `${turn}'s turn`;
    }

    function checkWin(currentPlayer) {
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
            combination.every(index => cells[index].textContent === currentPlayer)
        );
    }

    function isDraw() {
        return [...cells].every(cell => cell.textContent);
    }

    function clearCells() {
        cells.forEach(cell => cell.textContent = '');
        document.body.style.backgroundColor = '';
    }

    function handleClick(e) {
        const cell = e.target;

        if (cell.textContent || checkWin(turn)) {
            return;
        }

        cell.textContent = turn;
        if (checkWin(turn)) {
            statusDisplay.textContent = `${turn} wins!`;
            document.body.style.backgroundColor = "#90ee90";
            cells.forEach(cell => cell.removeEventListener('click', handleClick));
            return;
        } else if (isDraw()) {
            statusDisplay.textContent = `Draw!`;
            return;
        }
        
        turn = turn === 'X' ? 'O' : 'X';
        setStatusMessage(turn);
    }

    function restartGame() {
        clearCells();
        turn = 'X';
        setStatusMessage(turn);
        cells.forEach(cell => {
            cell.addEventListener('click', handleClick, { once: true });
        });
    }

    setStatusMessage(turn);
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });
    restartButton.addEventListener('click', restartGame);
});
