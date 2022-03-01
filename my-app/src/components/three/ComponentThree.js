import React from 'react'
class ComponentThree extends React.PureComponent{
  render(){
    console.log('组件渲染')
    const { name , type } = this.props
    return <div>
      hello , my name is { name }
      let us learn { type }
    </div>
  }
}
export default ComponentThree