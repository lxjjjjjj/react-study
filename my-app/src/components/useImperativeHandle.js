import React from 'react'
const FancyInput = React.forwardRef(function FancyInput(props, ref) {
    const inputRef = React.useRef();
    // 为什么要使用useImperativeHandle 
    // 相当于子组件向父组件输出本身实例或者DOM元素。
    // 而利用useImperativeHandle子组件可以向父组件输出任意数据。
    console.log('render 1')

    React.useEffect(() => {        
        console.log('useEffect1', ref)
    }) // 总是有ref 如果改成 React.useLayoutEffect 这里就不会有ref

    React.useImperativeHandle(ref, function() {        
        // debugger
        console.log('useImperativeHandle')
        return {
            focus: () => {
                inputRef.current.focus();
            }
        }
    })    

    React.useEffect(() => {        
        console.log('useEffect2', ref);
    }) // 总是有ref 如果改成 React.useLayoutEffect 这里会有ref

    console.log('render 2')
    return <input ref={inputRef}  placeholder="FancyInput"/>;
})

function Example() {
    const fancyInputRef = React.useRef()
  
    const focus = () => {
      fancyInputRef.current.focus()
    }
  
    return (
      <>
        <FancyInput ref={fancyInputRef} />
      </>
    )
  }

  export default Example
  