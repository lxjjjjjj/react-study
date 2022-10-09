

  import React from 'react'
  class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        number: 0,
      };
    }
  
    // 在事件处理函数中setState的调用会批量异步执行
    // 但是加了setTimeout之后，更新就是同步的
    handleClick = (event) => {
        setTimeout(() => {
            this.setState({ number: this.state.number + 1 });
            console.log(this.state); // 1
            this.setState({ number: this.state.number + 1 });
            console.log(this.state); // 2
        });
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
  export default Counter