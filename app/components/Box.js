import React, { PropTypes } from 'react'

class Box extends React.Component {

  setSide (side) {
    this.props.act(side)
  }

  render () {
    let p = this.props.state

    if (!p.turn) {
      return (
        <ul className="info-box choose">
          Choose
          <li><span className="links" onClick={this.setSide.bind(this, 'x')}>&#x000D7;</span></li>
          or
          <li><span className="links" onClick={this.setSide.bind(this, '0')}>&#x025CB;</span></li>
        </ul>
      )
    } else if (p.winner) {
      let winner = p.winner == "HU" ? "HUMAN" : "CPU"
      return (
        <div className="info-box centered">
          {winner} Wins!
        </div>
      )
    } else if (!p.winner && Object.size(p.occupied) == 9) {
      return (
        <div className="info-box centered">
          It's a Draft!
        </div>
      )
    } else {
      let cross = p.HU != 'cross' ? "CPU" : "HUMAN"
      let naught = p.AI != 'cross' ? "CPU" : "HUMAN"
      let turn = p.turn
      let clName = p.turn == "HU" ? p.HU : p.AI

      return (
        <ul className={"info-box " + clName}>
          <li><i>{cross}</i> <span>&#x000D7;</span></li>
          <li><i>{naught}</i> <span>&#x025CB;</span></li>
        </ul>
      )
    }
  }
}

export default Box
