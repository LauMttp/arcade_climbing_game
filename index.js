const startButton = document.querySelector("#start");
const scoreElement = document.querySelector("#score span");
const boardElement = document.querySelector("#board");
const gridElement = document.querySelector("#display");
const endGameScreen = document.querySelector(".endgamescreen");
const loserScore = document.querySelector("#loserScore span");
let myGame;

const pressedKeys = {
  ArrowDown: false,
  ArrowUp: false,
  ArrowLeft: false,
  ArrowRight: false,
};

function startNewGame() {
  gridElement.innerHTML = "";
  boardElement.innerHTML = "";
  myGame = new Game(gridElement, boardElement, endGameScreen, loserScore);
  myGame.score = 0;
  myGame.displayScore;
  myGame.createRandomSequence();
  myGame.createBoard();
  myGame.createGrid();
  myGame.showPlayer();
  myGame.displayCombinations(myGame.grid);
  myGame.setupDrop();

  // if (myGame.isGameOver()) {
  //   myGame.movePlayerDown();
  //   clearInterval(cadence);
  // myGame.displayGameOverScreen(boardElement);
  // DISPLAY LOOOOOOOSER SCREEN HERE

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
      if (myGame.playerPosition < 10) {
        myGame.doublePoints();
      } else {
        myGame.increaseScore();
        myGame.movePlayerUp();
      }
      myGame.combinationsSequence.shift();
      myGame.generateNewCombination();
      myGame.displayCombinations(myGame.grid);
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
  });
}

function checkPressedKeys() {
  const tempPressedKeys = [];
  for (const key in pressedKeys) {
    if (pressedKeys[key]) {
      tempPressedKeys.push(key);
    }
  }

  const lengthsAreSame =
    myGame.combinationsSequence[0].length === tempPressedKeys.length;
  if (!lengthsAreSame) {
    return false;
  }
  const areAllKeysPressed = myGame.combinationsSequence[0].every((key) =>
    tempPressedKeys.includes(key)
  );
  return areAllKeysPressed;
}

startButton.addEventListener("click", startNewGame);
