let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;

        if (checkWinner()) {
            displayMessage(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (isBoardFull()) {
            displayMessage('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnText();
        }
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    return !gameBoard.includes('');
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('message-container').style.display = 'block';
}

function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }

    document.getElementById('game-container').style.display = 'grid';
    document.getElementById('message-container').style.display = 'none';
    updateTurnText();
}

function updateTurnText() {
    const turnElement = document.getElementById('turn');
    turnElement.innerText = `Player ${currentPlayer}'s turn`;
}