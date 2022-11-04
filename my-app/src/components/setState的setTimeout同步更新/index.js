

  import React, { useState } from 'react'
  class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        number: 0,
      };
    }
  
    // 在事件处理函数中setState的调用会批量异步执行
    // 但是加了setTimeout之后，更新就是同步的 会一次加两个数
    // 但是如果不加异步的话 就是虽然执行了两次相加操作 但是只会加一次数
    handleClick = (event) => {
        setTimeout(() => {
            this.setState({ number: this.state.number + 1 });
            console.log(this.state); // 1
            this.setState({ number: this.state.number + 1 });
            console.log(this.state); // 2
        });
        // Promise.resolve().then(() => {
			// this.setState({ number: this.state.number + 1 });
			// console.log(this.state); // 1
			// this.setState({ number: this.state.number + 1 });
			// console.log(this.state); // 2
		// });
        // this.setState((state) => {
        //     console.log(state.number, 'number'); // 上一次是1
        //     return { number: state.number + 1 };
        // })
        // console.log(this.state); // 1
        // this.setState((state) => {
        //     console.log(state.number, 'number'); // 上一次是1
        //     return { number: state.number + 1 };
        // });
        // console.log(this.state); // 2
    };
  
    render() {
      return (
        <div>
          <p>{this.state.number}</p>
          <button onClick={this.handleClick}>+</button>
        </div>
      );
    }
  }
  
//   const element = <Counter></Counter>;
//   ReactDOM.render(element, document.getElementById('root'));
// function Counter(){
//     const [number, setNumber] = useState(0)
//     const handleClick = () => {
//         setTimeout(() => {
//             setNumber(number => number + 1)
//             console.log('number',number)
//             setNumber(number => number + 1)
//             console.log('number',number)
//         })
//     }
//     return (
//         <div>
//             <p>{number}</p>
//             <button onClick={handleClick}>+</button>
//         </div>
//         );
// }
  export default Counter