import React from 'react'
class ComponentOne extends React.Component{
    constructor(){
        super()
        this.state = {
            count: 1
        }
    }
  componentDidMount(){
    console.log('组件初始化挂载')
  }
  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }
  // 因为this的指向是变化的
  handleAlertClick() {
    this.setState({
        count: ++this.state.count
    })
  }
  render(){
    return (<div>
    <p>You clicked {this.state.count} times</p>
    <button onClick={this.handleAlertClick.bind(this)}>
      Click me
    </button>
  </div>)
  }
}


export default ComponentOne;