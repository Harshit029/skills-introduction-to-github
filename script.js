'use strict';
//selecting elements
const Player0EL = document.querySelector('.player--0');
const Player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.getElementById('score--1'); //really fast to select
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
// score0EL.textContent=0;
// score1EL.textContent=0;
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEL.classList.add('hidden');
  Player0EL.classList.remove('player--winner');
  Player1EL.classList.remove('player--winner');
  Player0EL.classList.add('player--active');
  Player1EL.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  Player0EL.classList.toggle('player--active');
  Player1EL.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);
    //2.Display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    //3.Check for rolled 1: if true , switch to next player
    //check for rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      //current0El.textContent=currentScore;//change it later
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += currentScore;
    //console.log(scores[activePlayer]);
    //score[1]=score[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2.check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
console.log();
