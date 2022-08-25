import React from 'react'
function Counter() {
    const [count, setCount] = React.useState(0);
  
    React.useEffect(() => {
      console.log(`You clicked ${count} times`);
    });
    // effect是如何读取到最新的count 状态值的呢
    // 每一个effect版本“看到”的count值都来自于它属于的那次渲染
    // React会记住你提供的effect函数，并且会在每次更改作用于DOM并让浏览器绘制屏幕后去调用它
    
    // 更新过程是这样的
    // React: 给我状态为 0时候的UI。
    // 你的组件:

    // 给你需要渲染的内容: <p>You clicked 0 times</p>。
    // 记得在渲染完了之后调用这个effect: () => { document.title = 'You clicked 0 times' }。
    // React: 没问题。开始更新UI，喂浏览器，我要给DOM添加一些东西。
    // 浏览器: 酷，我已经把它绘制到屏幕上了。
    // React: 好的， 我现在开始运行给我的effect

    // 运行 () => { document.title = 'You clicked 0 times' }。
    // 现在我们回顾一下我们点击之后发生了什么：

    // 你的组件: 喂 React, 把我的状态设置为1。
    // React: 给我状态为 1时候的UI。
    // 你的组件:

    // 给你需要渲染的内容: <p>You clicked 1 times</p>。
    // 记得在渲染完了之后调用这个effect： () => { document.title = 'You clicked 1 times' }。
    // React: 没问题。开始更新UI，喂浏览器，我修改了DOM。
    // Browser: 酷，我已经将更改绘制到屏幕上了。
    // React: 好的， 我现在开始运行属于这次渲染的effect

    // 运行 () => { document.title = 'You clicked 1 times' }。
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