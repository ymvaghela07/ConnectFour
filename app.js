const playerOne = "1";
const playerTwo = "2";
let currentPlayer = playerOne;
let displayCurrentPlayer = document.getElementById("current-player");
let currColumns;

let gameOver = false;

let grid;
const rows = 6;
const columns = 7;

window.onload = () => {
  setGame();
};

const setGame = () => {
  grid = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      // JS
      row.push(" ");
      // HTML
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("grid").append(tile);
    }
    grid.push(row);
  }
};

const setWinner = (r, c) => {
  let winner = document.getElementById("winner");
  if (grid[r][c] == playerOne) {
    winner.innerText = "Player One Wins!";
  } else {
    winner.innerText = "Player Two Wins!";
  }

  gameOver = true;
};

const checkWinner = () => {
  // Horizontally
  for (let r = 0; r < rows; r++) {
    // checking 3 ahead of us
    for (let c = 0; c < columns - 1; c++) {
      if (grid[r][c] != " ") {
        if (
          grid[r][c] == grid[r][c + 1] &&
          grid[r][c + 1] == grid[r][c + 2] &&
          grid[r][c + 2] == grid[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Vertically
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (grid[r][c] != " ") {
        if (
          grid[r][c] == grid[r + 1][c] &&
          grid[r + 1][c] == grid[r + 2][c] &&
          grid[r + 2][c] == grid[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Anti-diagonally
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (grid[r][c] != " ") {
        if (
          grid[r][c] == grid[r + 1][c + 1] &&
          grid[r + 1][c + 1] == grid[r + 2][c + 2] &&
          grid[r + 2][c + 2] == grid[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  // Diagnally
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (grid[r][c] != " ") {
        if (
          grid[r][c] == grid[r - 1][c + 1] &&
          grid[r - 1][c + 1] == grid[r - 2][c + 2] &&
          grid[r - 2][c + 2] == grid[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
};

function setPiece() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if (r < 0) {
    return;
  }

  grid[r][c] = currentPlayer; //update JS board
  let tile = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer == playerOne) {
    tile.classList.add("red-piece");
    currentPlayer = playerTwo;
    displayCurrentPlayer.innerHTML = currentPlayer;
  } else {
    tile.classList.add("yellow-piece");
    currentPlayer = playerOne;
    displayCurrentPlayer.innerHTML = currentPlayer;
  }

  r -= 1;
  currColumns[c] = r;

  checkWinner();
}
