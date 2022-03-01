import React from 'react'
import './parentFive.css'
function ComponentFive({ offset }){
  const card  = React.useRef(null)
  React.useLayoutEffect(()=>{
     card.current.style.left = offset
  },[])
  return <div className='box' >
      <div className='card custom' ref={card}   >《 React进阶实践指南 》</div>
  </div>
}
// class ComponentFive extends React.Component{
//   constructor(props){
//     super(props);
//     this.myRef = React.createRef();
//   }
//   componentDidMount(){
//     console.log('this.$refs.card',this.myRef)
//     this.myRef.current.style.left = this.props.offset
//   }
//   render(){
//     return <div className='box' >
//     <div className='card custom' ref={this.myRef}  >《 React进阶实践指南 》</div>
//   </div>
//   }
// }
export default ComponentFive


// 初步判断产生这个闪现的问题应该是 useEffect造成的，为什么这么说呢，
// 因为类组件生命周期 componentDidMount写同样的逻辑，然而并不会出现这种现象。
// 那么为什么useEffect会造成这种情况，我们只能顺藤摸瓜找到 useEffect 的 callback执行时机说起。
// useEffect ，useLayoutEffect , componentDidMount执行时机都是在 commit阶段执行。
// 我们知道 React 有一个 effectList存放不同effect。
// 因为 React 对不同的 effect 执行逻辑和时机不同。
// 我们看一下useEffect被定义的时候，定义成了什么样类型的 effect。


// 通过上述我们发现 useEffect 的第一个参数 create，采用的异步调用的方式，那么闪现就很好理解了，
// 在点击按钮组件第一次渲染过程中，首先执行函数组件render，然后commit替换真实dom节点,然后浏览器绘制完毕。
// 此时浏览器已经绘制了一次，然后浏览器有空余时间执行异步任务，所以执行了create，修改了元素的位置信息，
// 因为上一次元素已经绘制，此时又修改了一个位置，所以感到闪现的效果，此案已破。，
// 那么我们怎么样解决闪现的现象呢，那就是 React.useLayoutEffect ，
// useLayoutEffect的 create是同步执行的，所以浏览器绘制一次，直接更新了最新的位置。
// React.useLayoutEffect(()=>{
//   card.current.style.left = offset
// },[])