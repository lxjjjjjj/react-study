import React, { useState } from 'react'
export default function Index(){
    const [ state  , dispatchState ] = useState({ name:'alien' })
    const  handleClick = ()=>{ // 点击按钮，视图没有更新。
        // state.name = 'Alien'
        // dispatchState(state) // 直接改变 `state`，在内存中指向的地址相同。
        // 应该像下面一样修改
        dispatchState({
            name : 'Alien'
        })
    }
    return <div>
         <span> { state.name }</span>
        <button onClick={ handleClick }  >changeName++</button>
    </div>
}