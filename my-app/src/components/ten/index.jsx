// 不要在不需要重新渲染时使用useState
export default Counter = () => {
  const [counter, setCounter] = useState(0);

  // 错误代码
  // const onClickCounter = () => {
  //   setCounter(counter => counter + 1);
  // };

  // const onClickCounterRequest = () => {
  //   apiCall(counter);
  // };

  //在上面的组件中，有两个按钮，第一个按钮会触发计数器加一，
  //第二个按钮会根据当前的计数器状态发送一个请求。
  //可以看到，状态变量counter并没有在渲染阶段使用。所以，每次点击第一个按钮时，都会有不需要的重新渲染。
​
  //因此，当遇到这种需要在组件中使用一个变量在渲染中保持其状态，
  //并且不会触发重新渲染时，那么useRef会是一个更好的选择，下面来对上面的例子使用useRef进行改编

  //正确代码
  const counter = useRef(0);

  const onClickCounter = () => {
    counter.current++;
  };

  const onClickCounterRequest = () => {
    apiCall(counter.current);
  };

  return (
    <div>
      <button onClick={onClickCounter}>Counter</button>
      <button onClick={onClickCounterRequest}>Counter Request</button>
    </div>
  );
}

