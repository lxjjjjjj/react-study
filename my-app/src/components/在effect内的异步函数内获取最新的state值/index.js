import React from 'react'
function Counter() {
    // 使用refs
    const [count, setCount] = React.useState(0);
    const latestCount = React.useRef(count);
    React.useEffect(() => {
        // Set the mutable latest value
        latestCount.current = count;
        setTimeout(() => {
        // Read the mutable latest value
        console.log(`You clicked ${latestCount.current} times`);
        }, 3000);
    });
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