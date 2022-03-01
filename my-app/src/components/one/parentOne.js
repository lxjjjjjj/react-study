import { useState } from 'react'
import ComponentOne from './ComponentOne.js'
const BoxStyle = ({ children })=><div className='card' >{ children }</div>
function App() {
  const [ number , setNumber ] = useState(0)
  const NewIndex = () => <BoxStyle><ComponentOne number={number}  /></BoxStyle>
  return (
    // 首先通过BoxStyle做为一个容器组件，添加样式，渲染我们的子组件Index，
    // 但是每一次通过组合容器组件形成一个新的组件NewIndex，真正挂载的是NewIndex

    // 注意事项
    // 造成这种情况的本质，是每一次 render 过程中，都形成一个新组件，对于新组件，React 处理逻辑是直接卸载老组件，重新挂载新组件，所以我们开发的过程中，注意一个问题那就是：
    // 对于函数组件，不要在其函数执行上下文中声明新组件并渲染，这样每次函数更新会促使组件重复挂载。
    // 对于类组件，不要在 render 函数中，做如上同样的操作，否则也会使子组件重复挂载
    <div className="App">
      <NewIndex/> 无论number如何更新都是组件初始化挂载执行
      {/* <ComponentOne number={number}  /> 无论如何执行都是组件更新执行 */}
      <button onClick={ ()=>setNumber(number+1) }>点赞</button>
    </div>
  );
}

export default App;
