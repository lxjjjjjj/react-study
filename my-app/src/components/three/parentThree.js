import React from 'react'
import ComponentThree from './ComponentThree'
export default function ParentThree (){
  const [ number , setNumber  ] = React.useState(0)
  const [ type , setType ] = React.useState('react')
  // const changeName = (name) => {
  //     setType(name)
  // }

  // 每次点击更改number值 都会导致子组件重新渲染 因为子组件上有个changeName函数 
  // 在父组件每次更新之后都会生成一个新的函数
  // 所以导致子组件会更新
  const changeName = React.useCallback((name) => {
      setType(name)
  },[])
  // 用 useCallback对changeName函数进行缓存，在每一次 Home 组件执行，
  // 只要useCallback中deps没有变，changeName内存空间还指向原来的函数，
  // 这样PureComponent浅比较就会发现是相同changeName，从而不渲染组件，至此案件已破
  return <div>
      <span>{ number }</span><br/>
      <button onClick={ ()=> setNumber(number + 1) } >change number</button>
      <ComponentThree type={type}  changeType={ changeName } name="alien"  />
  </div>
}

//继续深入

// 大家用函数组件+类组件开发的时候，如果用到React.memo React.PureComponent等api，
// 要注意给这些组件绑定事件的方式，
// 如果是函数组件，那么想要持续保持纯组件的渲染控制的特性的话，
// 那么请用 useCallback,useMemo等api处理，
// 如果是类组件，请不要用箭头函数绑定事件，箭头函数同样会造成失效的情况。
// 上述中提到了一个浅比较shallowEqual，接下来我们重点分析一下 PureComponent是如何shallowEqual，
// 接下来我们在深入研究一下shallowEqual的奥秘。那么就有从类租价的更新开始。
// react-reconciler/src/ReactFiberClassComponent.js

// function updateClassInstance(){
//   const shouldUpdate =
//   checkHasForceUpdateAfterProcessing() ||
//   checkShouldComponentUpdate(
//     workInProgress,
//     ctor,
//     oldProps,
//     newProps,
//     oldState,
//     newState,
//     nextContext,
//   );
//   return shouldUpdate
// }
// 我这里简化updateClassInstance，只保留了涉及到PureComponent的部分。updateClassInstance这个函数主要是用来，执行生命周期，更新state，判断组件是否重新渲染，返回的 shouldUpdate用来决定当前类组件是否渲染。checkHasForceUpdateAfterProcessing检查更新来源是否来源与 forceUpdate ， 如果是forceUpdate组件是一定会更新的，checkShouldComponentUpdate检查组件是否渲染。我们接下来看一下这个函数的逻辑。
// function checkShouldComponentUpdate(){
//   /* 这里会执行类组件的生命周期 shouldComponentUpdate */
//   const shouldUpdate = instance.shouldComponentUpdate(
//     newProps,
//     newState,
//     nextContext,
//   );
//   /* 这里判断组件是否是 PureComponent 纯组件，如果是纯组件那么会调用 shallowEqual 浅比较  */
//   if (ctor.prototype && ctor.prototype.isPureReactComponent) {
//       return (
//       !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
//       );
//   }
// }
// checkShouldComponentUpdate有两个至关重要的作用：
// 第一个就是如果类组件有生命周期shouldComponentUpdate，会执行生命周期shouldComponentUpdate，判断组件是否渲染。
// 如果发现是纯组件PureComponent，会浅比较新老props和state是否相等，如果相等，则不更新组件。isPureReactComponent就是我们使用PureComponent的标识，证明是纯组件。
// 接下来就是重点shallowEqual，以props为例子，我们看一下。
// shared/shallowEqual
// function shallowEqual(objA: mixed, objB: mixed): boolean {
// if (is(objA, objB)) { // is可以 理解成  objA === objB 那么返回相等
//   return true;
// }

// if (
//   typeof objA !== 'object' ||
//   objA === null ||
//   typeof objB !== 'object' ||
//   objB === null
// ) {
//   return false;  
// } // 如果新老props有一个不为对象，或者不存在，那么直接返回false

// const keysA = Object.keys(objA); // 老props / 老state key组成的数组
// const keysB = Object.keys(objB); // 新props / 新state key组成的数组

// if (keysA.length !== keysB.length) { // 说明props增加或者减少，那么直接返回不想等
//   return false;
// }

// for (let i = 0; i < keysA.length; i++) { // 遍历老的props ,发现新的props没有，或者新老props不同等,那么返回不更新组件。
//   if (
//     !hasOwnProperty.call(objB, keysA[i]) ||
//     !is(objA[keysA[i]], objB[keysA[i]])
//   ) {
//     return false;
//   }
// }

// return true; //默认返回相等
// }
// shallowEqual流程是这样的，shallowEqual 返回 true 则证明相等，那么不更新组件；如果返回false 证明不想等，那么更新组件。is 我们暂且可以理解成 ===
// 第一步，直接通过 === 判断是否相等，如果相等，那么返回true。正常情况只要调用 React.createElement 会重新创建props，props都是不相等的。
// 第二步，如果新老props有一个不为对象，或者不存在，那么直接返回false。
// 第三步，判断新老props，key组成的数组数量等不想等，说明props有增加或者减少，那么直接返回false。
// 第四步，遍历老的props ,发现新的props没有与之对应，或者新老props不同等,那么返回false。
// 默认返回true。
// 这就是shallowEqual逻辑，代码还是非常简单的。感兴趣的同学可以看一看。
