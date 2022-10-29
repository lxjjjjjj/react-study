import React, { useEffect } from "react";
import ReactDOM from "react-dom";
window.addEventListener("click", event => {
console.log("window");
});


document.addEventListener("click", event => {
console.log("document:bedore react mount");
});


document.body.addEventListener("click", event => {
console.log("body");
});


function App() {
function documentHandler() {
console.log("document within react");
}


useEffect(() => {
document.addEventListener("click", documentHandler);
return () => {
document.removeEventListener("click", documentHandler);
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
console.log("react:button");
}}
>
CLICK ME
</button>
</div>
);
}


export default App


