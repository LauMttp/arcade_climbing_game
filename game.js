class Game {
  constructor() {
    this.combinationsSequence = [];
    this.checkingArr = [];
    this.score = 0;
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
}
