import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
let states = []
let setters = []
let cursor = 0

//  使用工厂模式生成一个 createSetter，通过 cursor 指定指向的是哪个 state
function createSetter(cursor) {
  return function(newVal) { // 闭包
    states[cursor] = newVal
    render()
  }
}
// 每次重新渲染都能准确找到对应的setter和state的秘诀
// 就是在每次render函数执行的时候都重置cursor
// 这样就能找到之前存放在states里的state值
// 不会导致cursor的值一直增加 导致states数组的长度和setter数组的长度一直增加
function useState(initVal) {
  states.push(initVal)
  setters.push(createSetter(cursor))
  let state = states[cursor]
  let setter = setters[cursor]
  // 光标移动到下一个位置
  cursor++
  // 返回
  return [state, setter]
}
function App(){
    const [count, setCount] = useState(0);
    const [sum, setSum] = useState(10)
    return (
        <div>
            {count}
            <br/>
            {sum}
            <button
                onClick={() => {
                    setCount(count + 1);
                    setSum(sum + 2)
                }}
            >
                增加
            </button>
        </div>
    );
}
function render(){
    cursor = 0
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}
render()

