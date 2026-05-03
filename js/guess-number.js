const levels = {
  easy: { min: 1, max: 10, attempts: 5, time: 20 },
  medium: { min: 1, max: 20, attempts: 10, time: 30 },
  hard: { min: 1, max: 50, attempts: 15, time: 45 }
};

let currentLevel = levels.medium;
let min = currentLevel.min;
let max = currentLevel.max;
let maxAttempts = currentLevel.attempts;
let timeLeft = currentLevel.time;
let timerId = null;

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

submit.disabled = true;

let randomNumber;
let prevGuess = [];
let numGuess = 1;

const p = document.createElement('p');

const sounds = {
  click: new Audio('../sounds/click.mp3'),
  win: new Audio('../sounds/win.mp3'),
  wrong: new Audio('../sounds/wrong.mp3'),
  close: new Audio('../sounds/close.mp3'),
  timeout: new Audio('../sounds/timeout.mp3')
};

function playSound(type) {
  const sound = sounds[type];
  if (!sound) return;

  sound.currentTime = 0; 
  sound.play().catch(() => {});
}

const difficultySelect = document.querySelector('#difficulty');

difficultySelect.addEventListener('change', function () {
  const selected = difficultySelect.value;
  currentLevel = levels[selected];

  min = currentLevel.min;
  max = currentLevel.max;
  maxAttempts = currentLevel.attempts;
  timeLeft = currentLevel.time;

  startNewGame(); 
});


let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    if (!playGame) return;
    playSound('click');
    const raw = userInput.value.trim();
    if (raw === '') {
    displayMessage('Enter a number first');
    return;
    }

    const guess = Number(raw);

    if (!Number.isInteger(guess)) {
    displayMessage('Please enter a whole number');
    return;
    }
    console.log(guess);
    validateGuess(guess);
  });
}

userInput.addEventListener('input', () => {
    userInput.value = userInput.value.replace(/[^\d]/g, '');

    // clamp to range if user pastes large values
    if (userInput.value !== '') {
        let val = Number(userInput.value);
        if (val < min) val = min;
        if (val > max) val = max;
        userInput.value = val;
    }
    submit.disabled = userInput.value.trim() === '';
    });

function setVisualState(type) {
  userInput.classList.remove(
    'input-default',
    'input-correct',
    'input-wrong',
    'input-close'
  );

  lowOrHi.classList.remove(
    'msg-default',
    'msg-correct',
    'msg-wrong',
    'msg-close'
  );

  switch (type) {
    case 'correct':
      userInput.classList.add('input-correct');
      lowOrHi.classList.add('msg-correct');
      break;

    case 'close':
      userInput.classList.add('input-close');
      lowOrHi.classList.add('msg-close');
      break;

    case 'wrong':
      userInput.classList.add('input-wrong');
      lowOrHi.classList.add('msg-wrong');
      break;

    default:
      userInput.classList.add('input-default');
      lowOrHi.classList.add('msg-default');
  }
}

function startNewGame() {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  prevGuess = [];
  numGuess = 1;
  guessSlot.innerHTML = '';
  remaining.innerHTML = `${maxAttempts}`;
  userInput.removeAttribute('disabled');
  lowOrHi.innerHTML = '';

  userInput.min = min;
  userInput.max = max;
  submit.disabled = true;
  setVisualState('default');

   document.querySelector('#rangeText').innerText =
    `Try and guess a random number between ${min} and ${max}.`;
   document.querySelector('#attemptsText').innerText =
    `You have ${maxAttempts} attempts to guess the right number.`;

    startTimer();
}

function startTimer() {
  clearInterval(timerId); 

  timeLeft = currentLevel.time;
  document.querySelector('#timer').innerText = timeLeft;

  timerId = setInterval(() => {
    timeLeft--;
    document.querySelector('#timer').innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      displayMessage(`⏰ Time's up! Number was ${randomNumber}`);
      playSound('timeout');
      endGame();
    }
  }, 1000);
}

function validateGuess(guess) {
    if (guess < min) {
        displayMessage(`Enter a number ≥ ${min}`);
    return;
}
    else if (guess > max) {
        displayMessage(`Enter a number ≤ ${max}`);
    return;
    }
    else if (prevGuess.includes(guess)) {
        displayMessage('You already guessed this number');
    return;
    } else {
    prevGuess.push(guess);

    if (guess === randomNumber) {
    displayGuess(guess);
    displayMessage(`You guessed it right`);
    setVisualState('correct');
    playSound('win');
    endGame();
    } else if (numGuess === maxAttempts) {
    displayGuess(guess);
    displayMessage(`Game Over. Random number was ${randomNumber}`);
    playSound('wrong');
    endGame();
    } else {
    displayGuess(guess);
    checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  const diff = Math.abs(guess - randomNumber);

  if (guess < randomNumber) {
    if (diff <= 2) {
      displayMessage(`🔥 Very close! Just a bit LOW`);
      setVisualState('close');
      playSound('close');
    } else if (diff <= 5) {
      displayMessage(`👍 Close! But still LOW`);
      setVisualState('close');
      playSound('close');
    } else {
      displayMessage(`❄️ Too LOW`);
      setVisualState('wrong');
      playSound('wrong');
    }
  } else {
    if (diff <= 2) {
      displayMessage(`🔥 Very close! Just a bit HIGH`);
      setVisualState('close');
      playSound('close');
    } else if (diff <= 5) {
      displayMessage(`👍 Close! But still HIGH`);
      setVisualState('close');
      playSound('close');
    } else {
      displayMessage(`❄️ Too HIGH`);
      setVisualState('wrong');
      playSound('wrong');
    }
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
    clearInterval(timerId);
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
