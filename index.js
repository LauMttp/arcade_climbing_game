const startButton = document.querySelector("#start");
const scoreElement = document.querySelector("#score span");
const boardElement = document.querySelector("#board");
const gridElement = document.querySelector("#display");
const grid = [];
const board = [];
let counter = 0;
let myGame;

/*function createBoard() {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    boardElement.append(cell);
    board.push(cell);
  }
}*/

const pressedKeys = {
  ArrowDown: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function createGrid() {
  for (let i = 0; i < 6; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    gridElement.append(cell);
    grid.push(cell);
  }
}

function startNewGame() {
  gridElement.innerHTML = "";
  myGame = new Game();
  myGame.createRandomSequence();
  //createBoard();
  createGrid();
  myGame.displayCombinations(grid);
  console.log(myGame.combinationsSequence);

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        pressedKeys.ArrowUp = true;
        break;
      case "ArrowDown":
        pressedKeys.ArrowDown = true;
        break;
      case "ArrowLeft":
        pressedKeys.ArrowLeft = true;
        break;
      case "ArrowRight":
        pressedKeys.ArrowRight = true;
        break;
    }

    if (checkPressedKeys()) {
      console.log("I just pressed: ", event.key);

      myGame.combinationsSequence.splice(0, 1);
      myGame.displayCombinations(grid);
    }
  });
  document.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "ArrowUp":
        pressedKeys.ArrowUp = false;
        break;
      case "ArrowDown":
        pressedKeys.ArrowDown = false;
        break;
      case "ArrowLeft":
        pressedKeys.ArrowLeft = false;
        break;
      case "ArrowRight":
        pressedKeys.ArrowRight = false;
        break;
    }
    //checkPressedKeys()
  });
}
function checkPressedKeys() {
  const tempPressedKeys = [];
  for (const key in pressedKeys) {
    if (pressedKeys[key]) {
      tempPressedKeys.push(key);
    }
  }
  // Verify that all the tenpPressedKeys exist in the combination
  // If all the keys are correct: go to next combination with points
  // If missing a key, do nothing
  // If a pressedKey is wrong = Go to next combination without points

  console.log(
    "Combinaison ",
    myGame.combinationsSequence[0],
    "pressed keys ",
    tempPressedKeys
  );

  const lengthsAreSame =
    myGame.combinationsSequence[0].length === tempPressedKeys.length;
  console.log("correct count?", lengthsAreSame);
  if (!lengthsAreSame) {
    return false;
  }
  const areAllKeysPressed = myGame.combinationsSequence[0].every((key) =>
    tempPressedKeys.includes(key)
  );
  console.log("all pressed?", areAllKeysPressed);
  return areAllKeysPressed;
}

startButton.addEventListener("click", startNewGame);
