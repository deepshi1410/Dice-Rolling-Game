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
score1.textContent = 0;
score2.textContent = 0;
dice.classList.add('hidden')
let currentScore = 0
let activePlayer = 0

const displayDiceAndScore = () => {
  // generating random numbers
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
  console.log()
}

// Handling button click or space bar press events
btnRoll.addEventListener('click', displayDiceAndScore)
btnRoll.addEventListener('keydown', displayDiceAndScore)



