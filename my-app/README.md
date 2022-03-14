# react类组件为什么挂载事件要绑定this
JSX语法实际上是createElement的语法糖

<div>Hello, { this.props.name }</div>
等价于
React.createElement( ‘div’,null, `Hello,${this.props.name}` )

createElement伪代码
function createElement(dom, params) {
  var domObj = document.createElement(dom);
  domObj.onclick = params.onclick; *
  domObj.innerHTML = params.conent;
  return domObj
}
标注*的代码会发生this指针丢失问题

这是一个JavaScript语言的问题，和是否React无关。看个例子
let obj = {
    tmp:'Yes!',
    testLog:function(){
        console.log(this.tmp);
    }
};
obj.testLog(); // Yes！
// this指向obj，能够正常输出tmp属性;

修改一下代码：
let obj = {
    tmp:'Yes!',
    testLog:function(){
        console.log(this.tmp);
    }
};
let tmpLog = obj.testLog; // 中间变量
tmpLog(); // undefined
// 没有直接调用obj对象中的testLog方法,而是使用了一个tmpLog过渡
// 当调用tmpLog()时，方法中的this丢失了指向，默认指向window
// window.tmp未定义就是undefined;

在JavaScript中，如果你传递一个函数名给一个变量，然后通过在变量后加括号()来调用这个方法，此时方法内部的this的指向就会丢失。

onclick事件触发
button被点击时，触发onClick事件，此时this就指向了window

为什么箭头函数方式不需要bind this
箭头函数内没有this，默认用父级作用域的this。
当使用new关键字时，this指向新对象，同时箭头函数中的this也被赋值为了新对象且永远不会更改指向。
等价于如下形式
//在构造函数内：
let _this = this
funtion fn(){
    console.log(_this)
}


# 函数式组件和类组件有何不同
https://overreacted.io/zh-hans/how-are-function-components-different-from-classes/