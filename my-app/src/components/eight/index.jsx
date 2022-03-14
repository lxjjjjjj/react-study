// 不要创建旧的闭包 
// useEffect(callback, deps)
// useCallback(callback, deps)
export default WatchCount = () => {
  const [count, setCount] = useState(0);


  // 每次打印的count值都是0，和实际的count值并不一样。为什么会这样呢？
  // 在第一次渲染时应该没啥问题，闭包log会将count打印出0。从第二次开始，每次当点击按钮时，count会增加1，但是setInterval仍然调用的是从初次渲染中捕获的count为0的旧的log闭包。log方法就是一个旧的闭包，因为它捕获的是一个过时的状态变量count。
  // 错误做法
  // useEffect(() => {
  //   setInterval(function log() {
  //     console.log(`Count: ${count}`);
  //   }, 2000);
  // }, []);

  // 正确做法 当count发生变化时，就重置定时器
  // 当状态变量count发生变化时，就会更新闭包。为了防止闭包捕获到旧值，就要确保在提供给hook的回调中使用的prop或者state都被指定为依赖性。
  useEffect(function() {
    const id = setInterval(function log() {
      console.log(`Count: ${count}`);
    }, 2000);
    return () => clearInterval(id);
  }, [count]);

  
  const handleClick = () => setCount(count => count + 1);
  
  return (
    <>
      <button onClick={handleClick}>+</button>
      <div>Count: {count}</div>
    </>
  );
}

