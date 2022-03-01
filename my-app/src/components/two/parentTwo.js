import React from 'react'
export default class EventDemo extends React.Component{
  constructor(props){
    super(props)
    this.state={
        value:''
    }
  }
  handerChange(e){
    setTimeout(()=>{
      console.log('e.target.value',e.target.value)
       this.setState({

         // https://mp.weixin.qq.com/s/1L1TtnuSV_wfhz4KjjV1cA
         // e.target是null React采用的是事件合成机制，也就是绑定的 onChange不是真实绑定的 change事件，
         // 小明绑定的 handerChange也不是真正的事件处理函数。那么也就是说React底层帮我们处理了事件源。
         // 这一切可能只有我们从 React 源码中找到线索。经过对源码的排查，我发现有一处线索十分可疑
         // react-dom/src/events/DOMLegacyEventPluginSystem.js

        // function dispatchEventForLegacyPluginEventSystem(topLevelType,eventSystemFlags,nativeEvent,targetInst){
        //   const bookKeeping = getTopLevelCallbackBookKeeping(topLevelType,nativeEvent,targetInst,eventSystemFlags);
        //   batchedEventUpdates(handleTopLevel, bookKeeping);
        // }
         value:e.target.value
       })
    },0)
  }
  render(){
    return <div>
      <input placeholder="请输入用户名？" onChange={ this.handerChange.bind(this) }  />
    </div>
  }
}


// dispatchEventForLegacyPluginEventSystem是legacy模式下，所有事件都必定经过的主要函数，batchedEventUpdates是处理批量更新的逻辑，里面会执行我们真正的事件处理函数，我们在事件原理篇章讲过 nativeEvent 就是真正原生的事件对象 event。targetInst 就是e.target对应的fiber对象。我们在handerChange里面获取的事件源是React合成的事件源，那么了解事件源是什么时候，怎么样被合成的？这对于破案可能会有帮助。
// 事件原理篇我们将介绍React采用事件插件机制，比如我们的onClick事件对应的是 SimpleEventPlugin，那么小明写onChange也有专门 ChangeEventPlugin事件插件，这些插件有一个至关重要的作用就是用来合成我们事件源对象e，所以我们来看一下ChangeEventPlugin。
// react-dom/src/events/ChangeEventPlugin.js
// const ChangeEventPlugin ={
//    eventTypes: eventTypes,
//    extractEvents:function(){
//         const event = SyntheticEvent.getPooled(
//             eventTypes.change,
//             inst, // 组件实例
//             nativeEvent, // 原生的事件源 e
//             target,      // 原生的e.target
//      );
//      accumulateTwoPhaseListeners(event); // 这个函数按照冒泡捕获逻辑处理真正的事件函数，也就是  handerChange 事件
//      return event; // 
//    }   
// }
// 我们看到合成事件的事件源handerChange中的 e，就是SyntheticEvent.getPooled创建出来的。那么这个是破案的关键所在。
// legacy-events/SyntheticEvent.js
// SyntheticEvent.getPooled = function(){
//     const EventConstructor = this; //  SyntheticEvent
//     if (EventConstructor.eventPool.length) {
//     const instance = EventConstructor.eventPool.pop();
//     EventConstructor.call(instance,dispatchConfig,targetInst,nativeEvent,nativeInst,);
//     return instance;
//   }
//   return new EventConstructor(dispatchConfig,targetInst,nativeEvent,nativeInst,);
// }
// 番外：在事件系统篇章，文章的事件池概念，讲的比较仓促，笼统，这篇这个部分将详细补充事件池概念。
// getPooled引出了事件池的真正的概念，它主要做了两件事：
// 判断事件池中有没有空余的事件源，如果有取出事件源复用。
// 如果没有，通过 new SyntheticEvent 的方式创建一个新的事件源对象。那么 SyntheticEvent就是创建事件源对象的构造函数，我们一起研究一下。
// const EventInterface = {
//   type: null,
//   target: null,
//   currentTarget: function() {
//     return null;
//   },
//   eventPhase: null,
//   ...
// };
// function SyntheticEvent( dispatchConfig,targetInst,nativeEvent,nativeEventTarget){
//   this.dispatchConfig = dispatchConfig; 
//   this._targetInst = targetInst;    // 组件对应fiber。
//   this.nativeEvent = nativeEvent;   // 原生事件源。
//   this._dispatchListeners = null;   // 存放所有的事件监听器函数。
//   for (const propName in Interface) {
//       if (propName === 'target') {
//         this.target = nativeEventTarget; // 我们真正打印的 target 是在这里
//       } else {
//         this[propName] = nativeEvent[propName];
//       }
//   }
// }
// SyntheticEvent.prototype.preventDefault = function (){ /* .... */ }     /* 组件浏览器默认行为 */
// SyntheticEvent.prototype.stopPropagation = function () { /* .... */  }  /* 阻止事件冒泡 */

// SyntheticEvent.prototype.destructor = function (){ /* 情况事件源对象*/
//       for (const propName in Interface) {
//            this[propName] = null
//       }
//     this.dispatchConfig = null;
//     this._targetInst = null;
//     this.nativeEvent = null;
// }
// const EVENT_POOL_SIZE = 10; /* 最大事件池数量 */
// SyntheticEvent.eventPool = [] /* 绑定事件池 */
// SyntheticEvent.release=function (){ /* 清空事件源对象，如果没有超过事件池上限，那么放回事件池 */
//     const EventConstructor = this; 
//     event.destructor();
//     if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
//        EventConstructor.eventPool.push(event);
//     }
// }
// 我把这一段代码精炼之后，真相也就渐渐浮出水面了，我们先来看看 SyntheticEvent 做了什么：
// 首先赋予一些初始化的变量nativeEvent等。然后按照 EventInterface 规则把原生的事件源上的属性，复制一份给React 事件源。然后一个重要的就是我们打印的e.target就是this.target，在事件源初始化的时候绑定了真正的e.target->nativeEventTarget
// 然后React事件源，绑定了自己的阻止默认行为preventDefault，阻止冒泡stopPropagation等方法。但是这里有一个重点方法就destructor,这个函数置空了React自己的事件源对象。那么我们终于找到了答案，我们的事件源e.target消失大概率就是因为这个destructor，destructor在release中被触发，然后将事件源放进事件池，等待下一次复用。
// 现在所有的矛头都指向了release，那么release是什么时候触发的呢？
// legacy-events/SyntheticEvent.js
// function executeDispatchesAndRelease(){
//     event.constructor.release(event);
// }
// 当 React 事件系统执行完所有的 _dispatchListeners，就会触发这个方法 executeDispatchesAndRelease释放当前的事件源。
// 真相大白

// 回到小明遇到的这个问题，我们上面讲到，React最后会同步的置空事件源，然后放入事件池，因为setTimeout是异步执行，执行时候事件源对象已经被重置并释放会事件池，所以我们打印 e.target = null，到此为止，案件真相大白。
// 通过这个案件我们明白了 React 事件池的一些概念：
// React 事件系统有独特合成事件，也有自己的事件源，而且还有对一些特殊情况的处理逻辑，比如冒泡逻辑等。
// React 为了防止每次事件都创建事件源对象，浪费性能，所以引入了事件池概念，每一次用户事件都会从事件池中取出一个e，如果没有，就创建一个，然后赋值事件源，等到事件执行之后，重置事件源，放回事件池，借此做到复用。