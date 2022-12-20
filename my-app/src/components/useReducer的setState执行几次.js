import React, { useReducer, useEffect, useState } from "react";


function reducer(state, action) {
  return state + 1;
}

const Counter = () => {
  const [count, setCount] = useReducer(reducer, 0);
  return (
    <div
      onClick={() => {
        // debugger;
        setCount(1);
        setCount(2);
      }}
    >
      {count}
    </div>
  );
};

export default Counter