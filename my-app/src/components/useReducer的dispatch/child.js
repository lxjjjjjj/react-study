import React, { useEffect } from 'react';



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

export default ChildComponent;