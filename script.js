'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const name1 = document.querySelector('#name--0'); //
const name2 = document.querySelector('#name--1');

const containerBtn = document.querySelector('.btn--container');

function rotate() {
  containerBtn.classList.toggle('rotate');
}

function setNames() {
  let player1Name = prompt('Please enter player-1 name:');
  let player2Name = prompt('Please enter player-2 name:');
  name1.textContent = player1Name;
  name2.textContent = player2Name;
}

let scores, currentScore, activePlayer, playing;

//reset
function reset() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  containerBtn.classList.add('rotate');
  setNames();
}
reset();
//switch players
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    //when getting a losing dice
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      rotate();
    }
  }
});

// when selecting to hold
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] < '100') {
      switchPlayer();
      rotate();
      diceEl.classList.add('hidden');
    } else {
      playing = false;
      document.getElementById(`score--${activePlayer}`).textContent = 'Winner ';
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      setTimeout(() => {
        reset();
      }, 3000);
    }
  }
});

btnNew.addEventListener('click', reset);
