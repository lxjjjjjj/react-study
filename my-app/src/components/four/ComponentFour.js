import { useState, useEffect } from 'react'
const ComponentFour = ({ consoleFiber }) => {
  const [ number , setNumber  ] = useState(0)
  console.log('组件渲染',number)
  useEffect(()=>{  
    console.log(number)
    consoleFiber() // 每次fiber更新后，打印 fiber 检测 fiber变化
  })
  return <div className="page" >
    <div className="content" >
       <span>{ number }</span><br/>
       <button onClick={ () => setNumber(1) } >将number设置成1</button><br/>
       <button onClick={ () => setNumber(2) } >将number设置成2</button><br/>
       <button onClick={ () => setNumber(3) } >将number设置成3</button>
    </div>
  </div>
}
export default ComponentFour


// 我们重点关心fiber上这几个属性，这对破案很有帮助
// Index fiber上的 memoizedState 属性，react hooks 原理文章中讲过，函数组件用 memoizedState 保存所有的 hooks 信息。
// Index fiber上的 alternate 属性
// Index fiber上的 alternate 属性上的 memoizedState属性。是不是很绕😂，马上会揭晓是什么。
// Index组件上的 useState中的number。
// 首先我们讲一下 alternate 指针指的是什么？
// 说到alternate 就要从fiber架构设计说起，每个React元素节点，用两颗fiber树保存状态，
// 一颗树保存当前状态，一个树保存上一次的状态，两棵 fiber 树用 alternate 相互指向。就是我们耳熟能详的双缓冲。