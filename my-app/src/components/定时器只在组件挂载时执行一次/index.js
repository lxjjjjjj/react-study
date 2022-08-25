import React from 'react'
function Counter() {
    const [count, setCount] = React.useState(0);
    // 然而，这个例子只会递增一次。天了噜。
    // React.useEffect(() => {
    //   const id = setInterval(() => {
    //     setCount(count + 1);
    //   }, 1000);
    //   return () => clearInterval(id);
    // }, []);
    // 如果你知道依赖是我们给React的暗示，告诉它effect所有需要使用的渲染中的值
    // 在第一次渲染中，count是0。因此，setCount(count + 1)
    // 在第一次渲染中等价于setCount(0 + 1)。既然我们设置了[]依赖，
    // effect不会再重新运行，它后面每一秒都会调用setCount(0 + 1) ：

    
    // 所以应该改成如下
    React.useEffect(() => {
        const id = setInterval(() => {
          setCount(count + 1);
        }, 1000);
        return () => clearInterval(id);
      }, [count]);
    return <h1>{count}</h1>;
  }
export default Counter