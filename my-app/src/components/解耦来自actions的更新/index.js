import React from 'react'
function Counter() {
    // const [count, setCount] = React.useState(0);
    // const [step, setStep] = React.useState(1);
  
    // React.useEffect(() => {
    //   const id = setInterval(() => {
    //     setCount(c => c + step);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, [step]);
    // 假如我们不想在step改变后重启定时器，我们该如何从effect中移除对step的依赖呢
    // 当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用useReducer去替换它们
    // reducer可以让你把组件内发生了什么(actions)和状态如何响应并更新分开表述
    // 我们用一个dispatch依赖去替换effect的step依赖：

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { count, step } = state;

    React.useEffect(() => {
      const id = setInterval(() => {
        dispatch({ type: 'tick' });
      }, 1000);
      return () => clearInterval(id);
    }, [dispatch]);
    // 你可能会问：“这怎么就更好了？
    // ”答案是React会保证dispatch在组件的声明周期内保持不变。
    // 所以上面例子中不再需要重新订阅定时器。
    // 你可以从依赖中去除dispatch, setState, 和useRef包裹的值
    // 因为React会确保它们是静态的。不过你设置了它们作为依赖也没什么问题
    // 相比于直接在effect里面读取状态，它dispatch了一个action来描述发生了什么。
    // 这使得我们的effect和step状态解耦。我们的effect不再关心怎么更新状态，
    // 它只负责告诉我们发生了什么。更新的逻辑全都交由reducer去统一处理
    return (
      <>
        <h1>{count}</h1>
        <input value={step} onChange={e => {
          dispatch({
            type: 'step',
            step: Number(e.target.value)
          });
        }} />
      </>
    );
  }
const initialState = {
  count: 0,
  step: 1,
};
function reducer(state, action) {
    const { count, step } = state;
    if (action.type === 'tick') {
      return { count: count + step, step };
    } else if (action.type === 'step') {
      return { count, step: action.step };
    } else {
      throw new Error();
    }
  }
export default Counter