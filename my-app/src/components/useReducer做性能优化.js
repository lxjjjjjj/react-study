// 父组件
import React, { useEffect }  from 'react';

function ParentComponent() {
    const [count, dispatch] = React.useReducer(reducer, 0);
  
    function reducer(state, action) {
      if (action.type === 'tick') {
        return state + 3;
      } else {
        throw new Error();
      }
    }
    const handleClick = () => {
        dispatch({ type: 'tick' })
    }
  return (
    <div>
      <h3>Hello This is Parent Component!</h3>
      <p>ParentCount: {count}</p>
      <button onClick={handleClick}>Click Me!</button>
      <br />
      {/* 传给子组件dispatch函数并不会触发子组件rerender */}
      <ChildComponent callback={dispatch} />
    </div>
  );
}

// 子组件

const ChildComponent = ({ callback }) => {
  useEffect(() => {
    alert('child re-render');
  }, [callback]);

  return (
    <>
      <h1>Hello This is Child Component</h1>
    </>
  );
};

export default ParentComponent;