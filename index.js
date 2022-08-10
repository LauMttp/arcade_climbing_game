const startButton = document.querySelector("#start");
const scoreElement = document.querySelector("#score span");
const boardElement = document.querySelector("#board");
const gridElement = document.querySelector("#display");
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
  myGame = new Game();
  myGame.createRandomSequence();
  myGame.createBoard(boardElement);
  myGame.createGrid(gridElement);
  myGame.showPlayer();
  myGame.displayCombinations(myGame.grid);
  const cadence = setInterval(() => {
    myGame.movePlayerDown();
  }, 1000);

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

      myGame.combinationsSequence.shift();
      myGame.generateNewCombination();
      myGame.increaseScore();
      myGame.movePlayerUp();
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
  console.log("correct count?", lengthsAreSame);
  if (!lengthsAreSame) {
    return false;
  }
  const areAllKeysPressed = myGame.combinationsSequence[0].every((key) =>
    tempPressedKeys.includes(key)
  );
  return areAllKeysPressed;
}

startButton.addEventListener("click", startNewGame);
