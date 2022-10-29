import React from 'react'
function Counter() {
    const [count, setCount] = React.useState(0);
    const increase = () => setCount(count + 1)
    const fn = (event) => {
        console.log("event 监听了", event)
        increase()
        console.log(count)
    }
    React.useEffect(() => {
    //   setInterval(() => {
    //     increase()
    //   }, 1000)
    // 如果没有这段代码 即使我每次点击keydown 更改数值 也都只会是1 
    // 因为useEffect只会绑定一次fn 所以如何更改count down 
    // 在window绑定的fn里永远只能拿到属于那一次渲染的count值
    // 即使每一秒都更改值 因为useEffect只执行最开始的一次 
    // 所以window.addEventListener只绑定一次fn是第一次渲染的fn
    // 如果要实现绑定多个fn 可以将count依赖加到useEffect中
      window.addEventListener('keydown', fn, false)
      return () => {
        window.removeEventListener('keydown', fn, false)
      };
    },[count]);
    // You clicked 0 times
    // 清除 0 值的UI
    // You clicked 1 times
    // 清除 1 值的UI
    // You clicked 2 times

    // React只会在浏览器绘制后运行effects。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。
    // Effect的清除同样被延迟了。上一次的effect会在重新渲染后被清除
    return (
      <div>
        <p>You clicked {count} times</p>
      </div>
    );
  }
export default Counter