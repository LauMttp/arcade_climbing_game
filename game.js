class Game {
  constructor() {
    this.combinationsSequence = [];
    this.checkingArr = [];
    this.score = 0;
    this.grid = [];
    this.board = [];
    this.playerPosition = 44;
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
    // console.log(this);
    this.hidePlayer();
    this.playerPosition += 10;
    this.showPlayer();
  }

  createRandomSequence() {
    // here we create randomly 50 arrays that we push inside our combinationsSequence
    const arrows = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
    for (let i = 0; i < 50; i++) {
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
  }

  createBoard(element) {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("boardCell");
      element.append(cell);
      this.board.push(cell);
    }
  }

  createGrid(element) {
    for (let i = 0; i < 6; i++) {
      const cell = document.createElement("div");
      cell.classList.add("gridCell");
      element.append(cell);
      this.grid.push(cell);
    }
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
    scoreElement.innerHTML = this.score;
  }

  generateNewCombination() {
    // here we create One Array that we push inside our combinationsSequence
    const arrows = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];
    const tempArr = [];
    const max = Math.floor(Math.random() * 4);
    for (let i = 0; i < max; i++) {
      const a = Math.floor(Math.random() * 4);
      tempArr.push(arrows[a]);
    }
    this.combinationsSequence.push(tempArr);
  }

  isGameOver() {
    if (this.playerPosition > 94) {
      //game over
    }
  }
}
