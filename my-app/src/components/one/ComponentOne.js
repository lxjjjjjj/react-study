
import React from 'react'
class ComponentOne extends React.Component{
  componentDidMount(){
    console.log('组件初始化挂载')
  }
  componentDidUpdate(){
    console.log('组件更新')
    /* 想要做一些事情 */
  }
  render(){
      return <div>《React进阶实践指南》  👍 { this.props.number } +   </div>
  }
}


export default ComponentOne;