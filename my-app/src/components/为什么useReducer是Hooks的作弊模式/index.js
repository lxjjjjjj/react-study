import React from 'react'
function Counter({ step }) {
    const [count, dispatch] = React.useReducer(reducer, 0);
  
    function reducer(state, action) {
      if (action.type === 'tick') {
        return state + step;
      } else {
        throw new Error();
      }
    }
    // React也保证dispatch在每次渲染中都是一样的。 
    // 所以你可以在依赖中去掉它。它不会引起effect不必要的重复执行
    // 你可能会疑惑：这怎么可能？在之前渲染中调用的reducer怎么“知道”新的props？
    // 答案是当你dispatch的时候，React只是记住了action - 它会在下一次渲染中再次调用reducer。
    // 在那个时候，新的props就可以被访问到，而且reducer调用也不是在effect里。
    // 这就是为什么我倾向认为useReducer是Hooks的“作弊模式”。
    // 它可以把更新逻辑和描述发生了什么分开。
    // 结果是，这可以帮助我移除不必需的依赖，避免不必要的effect调用。
    React.useEffect(() => {
      const id = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(id);
    }, []);
  
    return <h1>{count}</h1>;
  }
  export default Counter