const ASCIIART = [
  `
__O__O__
_O____O_
__O__O__
=========`,
  `
__O__O__
_O____O_
__O_____ 
=========`,
  `
__O__O__
______O_
__O_____  
=========`,
  `
__O_____
______O_
__O_____    
=========`,
  `
__O_____
______O_
________    
=========`,
  `
________
______O_
________    
=========`,
  `
________
________
________
=========`,
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
      return `There is a total of ${
        this.remainingGuesses
      } guesses remaining:\n${ASCIIART[this.remainingGuesses]}`;
    } else if (this.gameState === "lost") {
      return `Game Over, the word was "${this.secretWord.join("")}":\n${
        ASCIIART[0]
      }`;
    } else {
      return `Winner Winner Chicken Dinner, you won!`;
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

function simulateVanishingMan(phraseToGuess) {
  // create new VanishingMan game instance
  const newGame = new VanishingMan(phraseToGuess);

  // create bank of characters to randomly choose from as guess
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // create game loop
  while (newGame.gameState === "playing") {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    newGame.submitGuess(alphabet[randomIndex]);
    newGame.computeGameState();
    newGame.getGameStateMessage();
    newGame.lettersGuessed;
  }
  // return result
  return newGame.gameState;
}
