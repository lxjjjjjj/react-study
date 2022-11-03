import React from 'react'
class ComponentOne extends React.Component{
    constructor(){
        super()
    }
  handleAlertClick() {
    debugger
    console.log('handleAlertClick',this) // bind了所以有值
  }
  handleAlertClick = () => {
    debugger
    console.log('handleAlertClick',this) // 不需要bind
  }
  render(){
    return (<div>
    <button onClick={this.handleAlertClick.bind(this)}>
      Click me
    </button>
  </div>)
  }
}


export default ComponentOne;