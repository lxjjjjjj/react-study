import React, { useEffect } from "react";

window.addEventListener("click", event => {
console.log("window");
});


document.addEventListener("click", event => {
    // event.stopImmediatePropagation()
console.log("document:bedore react mount");
});


document.body.addEventListener("click", event => {
    // event.stopPropagation();
    console.log("body");
});


function App() {
function documentHandler() {
console.log("document within react");
}


useEffect(() => {
    // 1.window.addEventListener("click", documentHandler);
    document.addEventListener("click", documentHandler);
return () => {
    // 1.window.removeEventListener("click", documentHandler);
    document.addEventListener("click", documentHandler);
};
}, []);


return (
<div
onClick={() => {
console.log("raect:container");
}}
>
<button
onClick={event => {
    // 1.event.stopPropagation()
    // 2.event.nativeEvent.stopImmediatePropagation();
console.log("react:button");
}}
>
CLICK ME
</button>
</div>
);
}


export default App


