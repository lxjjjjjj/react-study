import React from 'react';
import ChildComponent from './child';

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
      <ChildComponent callback={dispatch} />
    </div>
  );
}

export default ParentComponent;