import React from 'react'
function Counter() {
    const [count, setCount] = React.useState(0);
  
    React.useEffect(() => {
      setTimeout(() => {
        console.log(`You clicked ${count} times`);
      }, 3000);
    });
    // function Example(props) {
    //     useEffect(() => {
    //       setTimeout(() => {
    //         console.log(props.counter);
    //       }, 1000);
    //     });
    //     // ...
    //   }
    //   function Example(props) {
    //     const counter = props.counter;
    //     useEffect(() => {
    //       setTimeout(() => {
    //         console.log(counter);
    //       }, 1000);
    //     });
    //     // ...
    //   }
    //   在组件内什么时候去读取props或者state是无关紧要的。因为它们不会改变。
    //   在单次渲染的范围内，props和state始终保持不变
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