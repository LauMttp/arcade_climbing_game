const arrows = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
const backSound = new Audio(
  "./styles/song/mp3-now.com - ColBreakz  Arcade.mp3"
);
class Game {
  constructor(gridElement, boardElement, endGameScreen, loserScore) {
    this.combinationsSequence = [];
    this.checkingArr = [];
    this.score = 0;
    this.grid = [];
    this.board = [];
    this.playerPosition = 43;
    this.intervalCounter = 0;
    this.dropInterval = 1000;
    this.gridElement = gridElement;
    this.boardElement = boardElement;
    this.endGameScreen = endGameScreen;
    this.loserScore = loserScore;
    backSound.play();
  }

  showPlayer() {
    this.board[this.playerPosition].classList.add("player");
  }

  hidePlayer() {
    this.board[this.playerPosition].classList.remove("player");
  }

  movePlayerUp() {
    this.hidePlayer();
    this.playerPosition -= 10;
    this.showPlayer();
  }

  movePlayerDown() {
    if (this.isGameOver()) {
      backSound.pause();
      this.clearAllIntervals();
      this.displayGameOverScreen();
    }
    this.hidePlayer();
    this.playerPosition += 10;
    this.showPlayer();
  }

  generateTimeoutAndMovePlayerDown() {
    this.movePlayerDown();
    this.timeoutId = setTimeout(() => {
      this.generateTimeoutAndMovePlayerDown();
    }, this.dropInterval);
  }

  setupDrop() {
    this.intervalId = setInterval(() => {
      this.intervalCounter++;
      if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => {
          this.generateTimeoutAndMovePlayerDown();
        }, this.dropInterval);
      }
      if (this.intervalCounter % 3 === 0) {
        this.dropInterval -= 50;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.generateTimeoutAndMovePlayerDown();
        }, this.dropInterval);
      }
    }, 1000);
  }

  createRandomSequence() {
    // here we create randomly 6 arrays that we push inside our combinationsSequence
    for (let i = 0; i < 6; i++) {
      this.generateNewCombination();
    }
  }

  createBoard() {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("boardCell");
      this.boardElement.append(cell);
      this.board.push(cell);
    }
  }

  createGrid() {
    for (let i = 0; i < 6; i++) {
      const cell = document.createElement("div");
      cell.classList.add("gridCell");
      this.gridElement.append(cell);
      this.grid.push(cell);
    }
  }

  clearAllIntervals() {
    clearInterval(this.intervalId);
    clearTimeout(this.timeoutId);
  }
  displayCombinations(elements) {
    for (let i = 0; i < 6; i++) {
      const target = this.combinationsSequence[i];
      let combo = "";
      if (target.includes("ArrowRight")) {
        combo += "➡️";
      }
      if (target.includes("ArrowLeft")) {
        combo += "⬅️";
      }
      if (target.includes("ArrowUp")) {
        combo += "⬆️";
      }
      if (target.includes("ArrowDown")) {
        combo += "⬇️";
      }
      // we override previous textContent
      elements[i].textContent = combo;
    }
  }

  checkcombination() {
    // if empty +1, else +0 --> empty the checkingArr
  }

  increaseScore() {
    this.score += 5;
    this.displayScore();
  }

  displayScore() {
    scoreElement.innerHTML = this.score;
  }

  generateNewCombination() {
    // here we create One Array that we push inside our combinationsSequence
    const clone = [...arrows];
    const tempArr = [];
    const max = Math.ceil(Math.random() * 4);
    for (let ii = 0; ii < max; ii++) {
      const a = Math.floor(Math.random() * clone.length);
      tempArr.push(clone[a]);
      clone.splice(a, 1);
    }
    this.combinationsSequence.push(tempArr);
  }

  doublePoints() {
    this.score += 20;
    this.displayScore();
    for (let i = 0; i < 3; i++) {
      console.log("Im in the loop");
      this.movePlayerDown();
    }
  }

  isGameOver() {
    if (this.playerPosition > 90) {
      console.log(true);
      return true;
    }
  }

  displayGameOverScreen() {
    this.endGameScreen.classList.remove("hidden");
    this.endGameScreen.querySelector("video").play();
    this.loserScore.innerHTML = this.score;
  }
}
