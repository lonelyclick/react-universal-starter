import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count: 0
  }

  click = () => {
    alert(1)
    const { count } = this.state

    this.setState({
      count: count + 1
    })
  }

  render() {
    const { count } = this.state

    return (
      <span onClick={() => this.click()}>
        {count}
      </span>
    )
  }
}
