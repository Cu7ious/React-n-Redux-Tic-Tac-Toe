/**
 * TicTacToe Combinations
    // Horisontal
 *  1 2 3
 *  4 5 6
 *  7 8 9

 *  // Vertical
 *  1 4 7
 *  2 5 8
 *  3 6 9

 *  // Left Diagonal
 *  1 5 9

 *  // Right Diagonal
 * 	3 5 7
 */
import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

Object.size = function(obj) {
  var size = 0, key

  for (key in obj) {
    if (obj.hasOwnProperty(key))
      size++
  }
  return size
}

render(
  <App />
  , document.getElementById('app')
)
