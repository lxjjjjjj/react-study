// useEffect修改DOM元素导致怪异闪现
// https://mp.weixin.qq.com/s/1L1TtnuSV_wfhz4KjjV1cA
import React from 'react'
import ComponentFive from './ComponentFive'
export default function ParentFive({ offset = '300px' }){
  const [ isRender , setRender ] = React.useState(false)
  return <div>
      { isRender && <ComponentFive offset={offset}  /> }
      <button onClick={ ()=>setRender(true) } > 挂载</button>
  </div>
}