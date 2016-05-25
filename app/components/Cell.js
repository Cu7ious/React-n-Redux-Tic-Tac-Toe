import React, { PropTypes } from 'react'

class Cell extends React.Component {

  constructor () {
    super();
    this.occupyCell = this.occupyCell.bind(this)
  }

  occupyCell() {
    let p = this.props
    if (!p.state.occupied[p.id] && !p.state.finished) {
      p.acts.addOccupiedCell(p.id)
      p.acts.toggleTurn()
    }
  }

  render () {
    let t = this
    let p = this.props
    let stateClass = p.state.occupied[p.id] || ""

    if (stateClass) {
      stateClass = stateClass == "HU" ? p.state.HU : p.state.AI
      stateClass = ` ${stateClass}`
    }

    if (p.state.finished) {
      if (p.state.combination.sequence.includes(p.id))
      stateClass = `${stateClass} winner`
    }

    return (
      <div id={`cell-${p.id}`} onClick={t.occupyCell} className={`playground-section${stateClass}`}></div>
    )
  }
}

export default Cell
