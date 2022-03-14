// 不要使用旧的状态
export default Increaser = () => {
  const [count, setCount] = useState(0);
  
  const increase = useCallback(() => {
    setCount(count + 1);
    // 改成setCount(count => count + 1);就可以加三个数
  }, [count]);
  
  const handleClick = () => {
    increase();
    increase();
    increase();
  };
  // 这里的handleClick方法会在点击按钮后执行三次增加状态变量count的操作。那么点击一次是否会增加3呢？事实并非如此。点击按钮之后，count只会增加1。问题就在于，当我们点击按钮时，相当于下面的操作：
  // const handleClick = () => {
  //   setCount(count + 1);
  //   setCount(count + 1);
  //   setCount(count + 1);
  // };
  // 当第一次调用setCount(count + 1)时是没有问题的，它会将count更新为1。接下来第2、3次调用setCount时，count还是使用了旧的状态（count为0），所以也会计算出count为1。发生这种情况的原因就是状态变量会在下一次渲染才更新
  return (
    <>
      <button onClick={handleClick}>+</button>
      <div>Counter: {count}</div>
    </>
  );
}