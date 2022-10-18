'use strict';

// selecting elements
const score1 = document.getElementById('score--1')
const score2 = document.getElementById('score--2')
const dice = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const btnRoll = document.querySelector('.btn--roll')
const current1 = document.querySelector('#current--1')
const current2 = document.querySelector('#current--2')

// initial conditions
// this array stores the scores for players 1 and 2
// 0 index being for p1 and 1 index for p2
let currentScore, playing, finalScores, activePlayer;
const initialState = () => {
  currentScore = 0
  activePlayer = 0
  playing = true
  finalScores = [0, 0]
  score1.textContent = 0;
  score2.textContent = 0;
  dice.classList.remove('hidden')
  current1.textContent = 0
  current2.textContent = 0
  document.querySelector(`.player--1`).classList.add('player--active')
  document.querySelector(`.player--${activePlayer + 1}`).classList.remove('player--winner')
}
initialState()
function switchActivePlayer() {
  // setting score to 0 when active user is changed
  document.getElementById(`current--${activePlayer + 1}`).textContent = 0

  // switching the user
  document.querySelector(`.player--${activePlayer + 1}`).classList.remove('player--active')
  activePlayer = activePlayer == 0 ? 1 : 0

  // setting current score to 0
  currentScore = 0

  // adding and removing active class from old active player to new active player
  document.querySelector(`.player--${activePlayer + 1}`).classList.add('player--active')

}

const displayDiceAndScore = () => {
  // generating random numbers
  if (playing) {
    const number = Math.trunc(Math.random() * 6) + 1

    // setting display property on dice
    dice.classList.remove('hidden')

    // selecting appropriate dice image according to dice number
    dice.src = `dice-${number}.png`

    if (number != 1) {
      // checking if number on dice is not 1
      // adding current roll dice to current score
      currentScore += number
      document.getElementById(`current--${activePlayer + 1}`).textContent = currentScore
    } else {
      switchActivePlayer()
    }
  }
}

// Handling button click or space bar press events
btnRoll.addEventListener('click', displayDiceAndScore)
btnRoll.addEventListener('keydown', displayDiceAndScore)

// handling event when player wants to holds his score
btnHold.addEventListener('click', function () {
  if (playing) {
    // adding current score to active player's score
    finalScores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer + 1}`).textContent = finalScores[activePlayer]

    // checking if score of current active player is >=100
    if (finalScores[activePlayer] >= 10) {
      // finish the game
      dice.classList.add('hidden')
      playing = false
      document.querySelector(`.player--${activePlayer + 1}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer + 1}`).classList.remove('player--active')
    } else {
      // switch to next player
      switchActivePlayer()
    }
  }
})

// handling the click of new button
btnNew.addEventListener('click', function () {
  initialState()
})



