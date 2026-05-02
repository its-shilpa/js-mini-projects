const levels = {
  easy: { min: 1, max: 10, attempts: 5 },
  medium: { min: 1, max: 20, attempts: 10 },
  hard: { min: 1, max: 50, attempts: 15 }
};

let currentLevel = levels.medium;
let min = currentLevel.min;
let max = currentLevel.max;
let maxAttempts = currentLevel.attempts;

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

let randomNumber;
let prevGuess = [];
let numGuess = 1;

const p = document.createElement('p');

const difficultySelect = document.querySelector('#difficulty');

difficultySelect.addEventListener('change', function () {
  const selected = difficultySelect.value;
  currentLevel = levels[selected];

  min = currentLevel.min;
  max = currentLevel.max;
  maxAttempts = currentLevel.attempts;

  startNewGame(); 
});


let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    if (!playGame) return;
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function startNewGame() {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  prevGuess = [];
  numGuess = 1;
  guessSlot.innerHTML = '';
  remaining.innerHTML = `${maxAttempts}`;
  userInput.removeAttribute('disabled');
  lowOrHi.innerHTML = '';

   document.querySelector('#rangeText').innerText =
    `Try and guess a random number between ${min} and ${max}.`;
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < min) {
    alert(`Please enter a number >= ${min}`);
  } else if (guess > max) {
    alert(`Please enter a number <= ${max}`);
  } else if (prevGuess.includes(guess)) {
    alert('You already guessed this number');
  } else {
    prevGuess.push(guess);

    if (guess === randomNumber) {
    displayGuess(guess);
    displayMessage(`You guessed it right`);
    endGame();
    } else if (numGuess === maxAttempts) {
    displayGuess(guess);
    displayMessage(`Game Over. Random number was ${randomNumber}`);
    endGame();
    } else {
    displayGuess(guess);
    checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess < randomNumber) {
    displayMessage(`Number is TOOO low`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is TOOO High`);
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  remaining.innerHTML = `${maxAttempts - numGuess}`;
  numGuess++;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.onclick = function (e) {
    startNewGame();
    startOver.removeChild(p);
    playGame = true;
  };
}

startNewGame();
