// 接受两个参数
// callback 是定时器开始进行的函数
// delay 是间隔时间

// 实现一个定时器hooks需要满足的条件如下

// 1.多个定时器存在时，无论引用定时器的组件渲染多少次，每个定时器都可以维持对自己'此刻状态'的引用
// 2.点击暂停计时器之后点击继续，可以继续执行callback
// 2.在run函数中开始定时器计时
// 3.调用cancel函数，取消定时器
import { useCallback, useState } from 'react';
export const Index = (props) => {
    const [count,setCount] = useState(0)
    const [countTwo,setCountTwo] = useState(0)
    const {run:RunOne ,cancel:CancelOne} = useSetInterval(()=>setCount(count=>count+1),1000)
    const {run:RunTwo ,cancel:CancelTwo} = useSetInterval(()=>setCountTwo(countTwo=>countTwo+2),1000)
    return(
        <>
          <button onClick={RunOne}>第一个button</button>
          <button onClick={CancelOne}>取消第一个</button>
          <div>{count}</div>
          <button onClick={RunTwo}>第二个button</button>
          <button onClick={CancelTwo}>取消第二个</button>
          <div>{countTwo}</div>
        </>
    )
  }



  const useSetInterval = (callback,delay) => {
    let timer = 0 // 每个useSetInterval函数都有自己的timer变量
    const run = useCallback(()=>{
      timer = setInterval(callback.current,delay)
    },[]) // 利用闭包保存定时器无论渲染多少次都不变
    const cancel = useCallback(() => {
      clearInterval(timer)
    },[]) //  利用闭包确保清除的是相对应的定时器
    return { run, cancel}
  }
  export default useSetInterval