import React from 'react'
function Counter() {
    const [count, setCount] = React.useState(0);
  
    React.useEffect(() => {
      console.log(`You clicked ${count} times`);
      return () => {
        console.log(`清除 ${count} 值的UI`)
      };
    });
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
        <button onClick={() => setCount(count + 1)}>
          Click me
        </button>
      </div>
    );
  }
export default Counter