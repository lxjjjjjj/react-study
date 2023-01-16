import React from "react";
import logo from './logo.svg';
import './App.css';
// import ParentOne from './components/one/parentOne'
// import ParentTwo from './components/two/parentTwo'
// import ParentThree from './components/three/parentThree'
// import ParentFour from './components/four/ParentFour'
import UseRef from './components/UseRef重新渲染/index'
// import ParentFive from './components/five/ParentFive'
// import Seven from './components/seven/index'
// import Counter from './components/每次渲染都有新的props和state/index'
// import CounterTwo from './components/每一次渲染都有它自己的事件处理函数/index'
// import CounterThree from './components/每次渲染都有它自己的Effects/index'
// import CounterFour from './components/effect中的延迟/index'
// import CounterFive from './components/class的延迟函数/index'
// import CounterSix from './components/在effect内的异步函数内获取最新的state值/index'
// import CounterSeven from './components/effect的清除/index'
// import CounterEight from './components/定时器只在组件挂载时执行一次/index'
// import CounterNine from './components/解耦来自actions的更新/index'
// import CounterTen from './components/为什么useReducer是Hooks的作弊模式/index'
// import CounterEleven from './components/把函数移到useEffect里/index'
// import Event from './components/解耦来自actions的更新'
// import SyncSetState from './components/setState的setTimeout同步更新/index'
// import UseReducer from './components/useReducer的dispatch/parent'
// import EventSync from './components/合成事件'
// import ThisEvent from  './components/react的this指向'
// import GetDerivedState from './components/getDrived'
// import WillMount from './components/componentWillMount'
// import ClassBind from './components/class组件bind的问题/index' 
// import WindowCount from './components/useEffect只执行一次内部有window.addEventListener/index'
// import UseRefucerTimes from './components/useReducer的setState执行几次'
// import DispatchObjectState from './components/state是个对象不会更新视图'
// import UseReducerFunc from './components/useReducer做性能优化'
import UseDeferredValue from './components/useDeferredValue'
import UseImperativeHandle from "./components/useImperativeHandle";
import Swiper from './components/swiper'
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <ThisEvent/> */}
      {/* <GetDerivedState/> */}
      {/* <UseReducer/> */}
      {/* <WindowCount/> */}
      {/* <Event/> */}
      {/* <WillMount/> */}
      {/* <SyncSetState/> */}
      {/* <UseReducer/> */}
      {/* <UseRefucerTimes/> */}
      {/* <DispatchObjectState/> */}
      {/* <UseReducerFunc/> */}
      {/* <UseDeferredValue/> */}
      {/* <UseImperativeHandle/> */}
      {/* <UseRef/> */}
      <Swiper/>
    </div>
  );
}
export default App;
