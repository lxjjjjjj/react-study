import React, { useState, useCallback, useEffect, useRef } from 'react';
export const CountIndex = (props) => {
  const [count,setCount] = useState(0)
  const handleClick = () => {
    setCount(count+1)
  }
  return (
     <button onClick={handleClick}>{count}</button>
  )
}

export const WrongUseCallbackIndex = (props) => {
  const [count,setCount] = useState(0)
  const handleClick = useCallback(()=>{
    setCount(count+1)
  },[])
  return (
     <button onClick={handleClick}>{count}</button>
  )
}
// 那么上面每次点击输出什么呢？
// 结果是第一次点击是1，之后无论我怎么点击结果都是1，这是为什么呢？
// 再让我们想一下react是如何工作的？
// 第一次渲染，count变量赋初始值，利用useCallback创建了一个handleClick函数，useCallback是根据第二个参数的变化而判断是否要更新创建的函数的，那么我们的第二个参数是个空数组，它当然不会重新创建新的handleClick函数啦，那么handleClick作为一个闭包它此时内部的count变量是第一次Index函数挂载内部的count变量。count值永远是0加1结果也一直是1。
// 那么怎么改呢？每次count值变化就更新函数获取此时函数新的count变量引用就好啦


export const RightUseCallbackIndex = (props) => {
  const [count,setCount] = useState(0)
  const handleClick = useCallback(()=>{
    setCount(count+1)
  },[count])
  return (
     <button onClick={handleClick}>{count}</button>
  )
}
// 或者我们可以建立一个对count变量的引用，也就是useRef


export const UseCallbackRefIndex = (props) => {
  const countRef = useRef(0)
  const handleClick = useCallback(()=>{
    ++countRef.current
    console.log('countRef.current :', countRef.current);
  },[])
  return (
     <button onClick={handleClick}>点击 + 1</button>
  )
}
// 或者我们这样拿到上一次渲染的值在setCount内写一个箭头函数


export const Index = (props) => {
  const [count,setCount] = useState(0)
  const handleClick = useCallback(()=>{
    setCount(count=>count+1)
  },[])
  return (
     <button onClick={handleClick}>{count}</button>
  )
}
// 那么react hooks中的闭包场景都有哪些呢

// 场景一
export const UseMemoIndex = (props) => {
  const [count,setCount] = useState(0)
  const handleClick = ()=>{
    setCount(count+1)
    console.log(count)
    // 此刻输出值是0，1，2，3，4 是因为所有的useState是要等到下一次上下文执行的时候state值才会更新
    // 因为异步更新提升性能～ 等到所有state都更改过值了才更新～
  }
  const handleClickCount = React.useMemo(()=>count,[])
  return (
     <button onClick={handleClick}>{handleClickCount}</button>
  )
}
// 场景二
export const UseEffectIndex = (props) => {
  const [count,setCount] = useState(0)
  useEffect(()=>{
    setInterval(()=>{
      setCount(count+1)
    },1000)
  },[])
  return (
     <div>{count}</div>
  )
}