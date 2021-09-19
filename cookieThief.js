// target html elements
const newGameBtn = document.getElementById("newGameBtn");
const letterInput = document.getElementById("letterInput");
const letterSubmit = document.getElementById("letterSubmit");
const gameStateMessage = document.getElementById("gameStateMessage");
const userGuesses = document.getElementById("userGuesses");
let newGame;

const ASCIIART = [
  `
 ==========
|__________|
|__________|
|__________|
 ==========`,
  `
 ==========
|__________|
|_______🍪_|
|__________|
 ==========`,
  `
 ==========
|__🍪______|
|_______🍪_|
|__________|
 ==========`,
  `
 ==========
|__🍪______|
|_______🍪_|
|__🍪______| 
 ==========`,
  `
 ==========
|__🍪__🍪__|
|_______🍪_|
|__🍪______| 
 =========`,
  `
 ==========
|__🍪__🍪__|
|_🍪____🍪_|
|__🍪______| 
 ==========`,
  `
 ===========
|__🍪__🍪__|
|_🍪____🍪_|
|__🍪__🍪__|
 ===========`,
];

class VanishingMan {
  constructor(secretWord) {
    this.remainingGuesses = 6;
    this.secretWord = secretWord.split("");
    this.lettersGuessed = [];
    this.gameState = "playing";
  }
  computeGameState() {
    if (this.remainingGuesses === 0) {
      this.gameState = "lost";
    } else if (
      !this.getSecretWordPuzzle().includes("#") &&
      this.remainingGuesses > 0
    ) {
      this.gameState = "won";
    }
  }
  getSecretWordPuzzle() {
    return this.secretWord
      .map((char) => {
        if (this.lettersGuessed.includes(char)) {
          return char;
        } else if (char === " ") {
          return " ";
        }
        return "#";
      })
      .join("");
  }
  getGameStateMessage() {
    if (this.gameState === "playing") {
      return `cookies remaining:\n${ASCIIART[this.remainingGuesses]}`;
    } else if (this.gameState === "lost") {
      return `Game Over, the robot stole all of the cookies! 😢\nThe word was "${this.secretWord.join(
        ""
      )}":\n${ASCIIART[0]}`;
    } else {
      return `Winner Winner, you won! You've stopped the the cookie thief!`;
    }
  }
  submitGuess(letter) {
    letter = letter.toLowerCase();
    if (this.gameState === "playing") {
      if (!this.lettersGuessed.includes(letter)) {
        this.lettersGuessed.push(letter);
        if (!this.secretWord.join("").toLowerCase().includes(letter)) {
          this.remainingGuesses--;
        }
      }
    }
  }
}

function addRecentGuessLi() {
  let li = document.createElement("li");
  userGuesses.appendChild(li).innerHTML = `${
    newGame.lettersGuessed[newGame.lettersGuessed.length - 1]
  }`;
}

newGameBtn.addEventListener("click", function () {
  const wordBank = [
    "nutritious",
    "physical",
    "enormous",
    "belief",
    "pause",
    "volatile",
    "provide",
    "uncovered",
    "horses",
    "placid",
    "puncture",
    "overjoyed",
  ];
  const randomIndex = Math.floor(Math.random() * wordBank.length);
  // create new VanishingMan game instance
  newGame = new VanishingMan(wordBank[randomIndex]);
  gameStateMessage.innerText = newGame.getGameStateMessage();
});

letterSubmit.addEventListener("click", function () {
  newGame.submitGuess(letterInput.value);
  newGame.computeGameState();
  gameStateMessage.innerText = newGame.getGameStateMessage();
  // add letter to userGuesses ul
  addRecentGuessLi();
});
