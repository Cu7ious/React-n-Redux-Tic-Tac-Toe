import React, { PropTypes } from 'react'
import Box from './Box'
import Playground from './Playground'

class App extends React.Component {
  constructor () {
    super()

    this.timeout
    this.state = {
      HU: null,
      AI: null,
      turn: null,
      occupied: {},
      finished: false,
      combination: {
        sequence: [],
        class: false
      },
      winner: null
    }

    this.AI = this.AI.bind(this)
    this.setSide = this.setSide.bind(this)
    this.setSigns = this.setSigns.bind(this)
    this.resetState = this.resetState.bind(this)
    this.toggleTurn = this.toggleTurn.bind(this)
    this.checkWhoWins = this.checkWhoWins.bind(this)
    this.addOccupiedCell = this.addOccupiedCell.bind(this)

    window.app = this
  }

  componentDidMount () {
    if (this.state.turn && this.state.turn != "HU") this.AI()
  }

  componentWillUpdate () {
    if (this.state.finished) return false

    let result = this.checkWhoWins()
    if (result) {
      clearTimeout(this.timeout)
      this.setState({
        finished: true,
        winner: result[0],
        combination: result[1]
      })
    }

  }

  componentDidUpdate () {
    if (this.state.finished) return false
    if (this.state.turn && this.state.turn != "HU") this.AI()
  }

  AI () {
    if (!this.state.finished) {
        this.timeout = setTimeout(() => {
          let cells = this.state.occupied
          let decision = Math.floor(Math.random() * (9 - 1 + 1)) + 1

          if (!cells[decision]) {
            this.addOccupiedCell(decision)
            this.toggleTurn()
          } else {
            if (Object.size(cells) < 9)
              this.AI()
          }
      }, 400);
    }
    return false
  }

  addOccupiedCell (id) {
    if (!this.state.occupied[id]) {
      this.state.occupied[id] = this.state.turn
      return this.state.occupied[id]
    } else {
      return false
    }
  }

  resetState () {
    this.setState({
      HU: null,
      AI: null,
      turn: null,
      occupied: {},
      finished: false,
      combination: {
        sequence: [],
        class: false
      },
      winner: null
    })
  }

  toggleTurn () {
    let turn = this.state.turn == "HU" ? "AI" : "HU"
    this.setState({
      turn: turn
    })
  }

  setSigns () {
    let sign = this.state.sign == "cross" ? "nought" : "cross"
    this.setState({
      sign: sign
    })
  }

  setSide (side) {
    if (side == 'x') {
      this.setState({
        HU: 'cross',
        AI: 'nought',
        turn: "HU",
      })
    } else {
      this.setState({
        HU: 'nought',
        AI: 'cross',
        turn: "AI",
      })
    }
  }

  checkWhoWins () {
    let cells = this.state.occupied

    if (Object.size(cells) >= 5) {

      let theResult = []
      let sequenceCounter = 0
      let sequence = [
        // Horisontal
        '1 2 3',
        '4 5 6',
        '7 8 9',
        // Vertical
        '1 4 7',
        '2 5 8',
        '3 6 9',
        // Left Diagonal
        '1 5 9',
        // Right Diagonal
        '3 5 7'
      ]

      sequence.forEach(function(el) {
        let winner = checkTheSequence(el)
        if (winner) {
          theResult.push(winner)
          theResult.push(processTheResult(sequenceCounter, el.split(" ")))
        }
        sequenceCounter++
      })

      if (theResult.length)
        return theResult

      return false
    }

    function checkTheSequence (sequence) {
      let result = []
      let final

      for (let key in cells) {
        sequence.split(" ").forEach(function(el) {
          if (el === key) {
            result.push(cells[key])
          }
        })
      }

      if (result.length == 3) {
        final = result.every((el) => {
          return result[0] === el
        })
      }

      if (final)
        return result[0]

      return false
    }

    function processTheResult (sequenceNumber, seq) {
      switch(sequenceNumber) {
        case 0:
        case 1:
        case 2:
          return {class: 'horisontal', sequence: seq}
        case 3:
        case 4:
        case 5:
          return {class: 'vertical', sequence: seq}
        case 6:
          return {class: 'left-diagonal', sequence: seq}
        case 7:
          return {class: 'right-diagonal', sequence: seq}
        default:
          return false
      }
    }
  }

  render () {
    let t = this
    let s = this.state
    let show = this.state.turn ? true : false

    return (
      <div>
        <Box act={t.setSide} state={s} />
        <Playground
          show={show}
          state={s}
          acts={{
            toggleTurn: t.toggleTurn,
            setSigns: t.setSigns,
            addOccupiedCell: t.addOccupiedCell
          }}
        />
        <div className="new-game">
          <button onClick={t.resetState}>&#x021BA;</button>
        </div>
      </div>
    )
  }
}

export default App
