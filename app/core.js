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
