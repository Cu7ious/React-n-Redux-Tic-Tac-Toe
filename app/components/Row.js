import React, { PropTypes } from 'react'
import Cell from './Cell'

class Row extends React.Component {
  render () {
    let p = this.props
    let content = []

    p.cells.forEach(el => {
      content.push(
        <Cell key={el} state={p.state} acts={p.acts} id={el} />
      )
    });

    return (
      <div className="row">
        {content}
      </div>
    )
  }
}

export default Row
