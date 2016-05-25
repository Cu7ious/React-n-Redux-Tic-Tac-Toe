import React, { PropTypes } from 'react'
import Row from './Row'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      HU: 'cross',
      AI: 'nought',
      turn: "HU",
      occupied: {},
      finished: false,
      combination: {
        class: false,
        sequence: []
      }
    }

    this.AI = this.AI.bind(this)
    this.setSigns = this.setSigns.bind(this)
    this.toggleTurn = this.toggleTurn.bind(this)
    this.addOccupiedCell = this.addOccupiedCell.bind(this)
    this.checkWhoWins = this.checkWhoWins.bind(this)

    window.app = this
  }

  componentWillUpdate () {
    if (this.state.finished) return;

    let result = this.checkWhoWins()
    if (result) this.setState({
      finished: true,
      combination: result.combination
    })
  }

  componentDidUpdate () {
    if (this.state.turn != "HU") {
      this.AI()
    }
  }

  AI () {
    if (!this.state.finished) {
      let cells = this.state.occupied
      let decision = Math.floor(Math.random() * (9 - 1 + 1)) + 1

      if (!cells[decision]) {
        this.addOccupiedCell(decision)
        this.toggleTurn()
      } else {
        if (Object.size(cells) < 9)
          this.AI()
      }
    }
    return
  }

  addOccupiedCell (id) {
    if (!this.state.occupied[id]) {
      this.state.occupied[id] = this.state.turn
      return this.state.occupied[id]
    } else {
      return false
    }
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

  checkWhoWins () {
    let cells = this.state.occupied
    if (Object.size(cells) >= 5) {

      if (cells.hasOwnProperty(1) && cells.hasOwnProperty(2) && cells.hasOwnProperty(3)) {

        if (cells[1] == "HU" && cells[2] == "HU" && cells[3] == "HU") {

          return {
            winner: "HU",
            combination: {
              class: "horisontal",
              sequence: [1,2,3]
            }
          }
        }
      }
    }
  }

  render () {
    let t = this
    let s = this.state
    let winnerClass = s.combination.class

    return (
      <section className={`playground ${winnerClass}`}>
        <Row
          acts={{
            toggleTurn: t.toggleTurn,
            setSigns: t.setSigns,
            addOccupiedCell: t.addOccupiedCell
          }}
          state={s}
          cells={[1,2,3]}
        />
        <Row
          acts={{
            toggleTurn: t.toggleTurn,
            setSigns: t.setSigns,
            addOccupiedCell: t.addOccupiedCell
          }}
          state={s}
          cells={[4,5,6]}
        />
        <Row
          acts={{
            toggleTurn: t.toggleTurn,
            setSigns: t.setSigns,
            addOccupiedCell: t.addOccupiedCell
          }}
          state={s}
          cells={[7,8,9]}
        />
      </section>
    )
  }
}

export default App
