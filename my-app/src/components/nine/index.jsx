// 不要忘记清理副作用
const DelayedIncreaser = () => {
  const [count, setCount] = useState(0);
  const [increase, setShouldIncrease] = useState(false);
  
  // 错误代码
  // useEffect(() => {
  //   if (increase) {
  //     setInterval(() => {
  //       setCount(count => count + 1)
  //     }, 1000);
  //   }
  // }, [increase]);
  
  // 正确做法
  useEffect(() => {
    if (increase) {
      const id = setInterval(() => {
        setCount(count => count + 1)
      }, 1000);
      return () => clearInterval(id);
    }
  }, [increase]);

  return (
    <>
      <button onClick={() => setShouldIncrease(true)}>
        +
      </button>
      <div>Count: {count}</div>
    </>
  );
}

const MyApp = () => {
  const [show, setShow] = useState(true);
  
  return (
    <>
      {show ? <DelayedIncreaser /> : null}
      <button onClick={() => setShow(false)}>卸载</button>
    </>
  );
}
// 点击卸载的时候 控制台会报错 