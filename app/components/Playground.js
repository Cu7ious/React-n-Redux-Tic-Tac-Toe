import React, { PropTypes } from 'react'
import Row from './Row'

class Playground extends React.Component {
  render () {
    let p = this.props
    let winnerClass = p.state.combination.class
    let winner = p.state.winner

    return (
      <section className={`playground ${winnerClass}`}>
        <Row
          acts={p.acts}
          state={p.state}
          cells={[1,2,3]}
        />
        <Row
          acts={p.acts}
          state={p.state}
          cells={[4,5,6]}
        />
        <Row
          acts={p.acts}
          state={p.state}
          cells={[7,8,9]}
        />
      </section>
    )
  }
}

export default Playground
