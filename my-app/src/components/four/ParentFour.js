import React from 'react'
import ComponentFour from './ComponentFour'
export default class ParentFour extends React.Component{
  consoleChildrenFiber(){
    // console.log(this._reactInternalFiber.child) /* 用来打印函数组件 Index 对应的fiber */
  }
  render(){
    return <ComponentFour consoleFiber={ this.consoleChildrenFiber.bind(this) }/>
  }
}

// 揭开谜底（我们学到了什么）

// 双缓冲树：React 用 workInProgress树(内存中构建的树) 和 current(渲染树) 来实现更新逻辑。
// 我们console.log打印的fiber都是在内存中即将 workInProgress的fiber树。
// 双缓存一个在内存中构建，在下一次渲染的时候，直接用缓存树做为下一次渲染树，
// 上一次的渲染树又作为缓存树，这样可以防止只用一颗树更新状态的丢失的情况，又加快了dom节点的替换与更新。
// 更新机制：在一次更新中，首先会获取current树的 alternate作为当前的 workInProgress，
// 渲染完毕后，workInProgress 树变为 current 树。
// 我们用如上的树A和树B和已经保存的baseState模型，来更形象的解释了更新机制 。
// hooks中的useState进行state对比，用的是缓存树上的state和当前最新的state。
// 所有就解释了为什么更新相同的state，函数组件执行2次了。