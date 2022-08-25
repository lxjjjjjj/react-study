import React from 'react'
function Counter() {
    const [count, setCount] = React.useState(0);
    // count仅是一个数字而已。它不是神奇的“data binding”, “watcher”, “proxy”
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