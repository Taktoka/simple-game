function Player(name, strength, health) {
  this.name = name;
  this.strength = strength;
  this.health = health;
  this.elements = new UiElements(this.name);
}

function UiElements(name) {
  this.attackBtn = document.querySelector(`.${name}-attack`);
  this.healthBtn = document.querySelector(`.${name}-health`);
  this.statusBtn = document.querySelector(`.${name}-status`);
  this.progress = document.querySelector(`.${name}-progress span`);
  this.done = document.querySelector(`.${name}-done`);
  this.actions = document.querySelector(`.${name}-actions`);
  this.status = document.querySelector(`.${name}-stat`);
}

// add Methods to prototype
Player.prototype.attack = function (opponent) {
  if (opponent.health > 0) {
    opponent.health -= this.strength;
    opponent.elements.progress.style.width = `${opponent.health}%`;
  } else {
    opponent.elements.actions.remove();
    this.elements.actions.remove();
    opponent.elements.done.innerHTML = `${opponent.name} Lose`;
    this.elements.done.innerHTML = `${this.name} Won`;
  }
};

Player.prototype.incHealth = function () {
  if (this.health < 100) {
    this.health += 10;
    this.elements.progress.style.width = `${this.health}%`;
  } else if (this.health > 100) {
    this.health = 100;
  }
};

Player.prototype.viewStatus = function () {
  this.elements.status.classList.toggle("show");
  this.elements.status.innerHTML = `
    <p> Name: ${this.name}</p>
    <p> Strength: ${this.strength}</p>
    <p> Health: ${this.health}</p>
    `;
};

let playerOne = new Player("player1", 10, 100);
let playerTwo = new Player("player2", 20, 100);

console.log(playerOne);
console.log(playerTwo);
// player 1 actions
playerOne.elements.attackBtn.addEventListener("click", () => {
  playerOne.attack(playerTwo);
});

playerOne.elements.healthBtn.addEventListener("click", () => {
  playerOne.incHealth();
});

playerOne.elements.statusBtn.addEventListener("click", () => {
  playerOne.viewStatus();
});

// plyer 2 actions
playerTwo.elements.attackBtn.addEventListener("click", () => {
  playerTwo.attack(playerOne);
});

playerTwo.elements.healthBtn.addEventListener("click", () => {
  playerTwo.incHealth();
});

playerTwo.elements.statusBtn.addEventListener("click", () => {
  playerTwo.viewStatus();
});
