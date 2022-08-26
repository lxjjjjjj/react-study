import React from 'react'
class Parent extends React.Component {
    state = {
      query: 'react'
    };
    fetchData = () => {
      const url = 'https://hn.algolia.com/api/v1/search?query=' + this.state.query;
      // ... Fetch data and do something ...
    };
    render() {
      return <Child fetchData={this.fetchData} />;
    }
  }
  
  class Child extends React.Component {
    state = {
      data: null
    };
    componentDidMount() {
      this.props.fetchData();
    }
    componentDidUpdate(prevProps) {
        // 🔴 This condition will never be true
        if (this.props.fetchData !== prevProps.fetchData) {
            this.props.fetchData();
        }
    }
    render() {
      return (<div></div>)
    }
  }
  // fetchData是一个class方法！（或者你也可以说是class属性 - 但这不能改变什么。）
  // 它不会因为状态的改变而不同，所以this.props.fetchData和 prevProps.fetchData始终相等，
  // 因此不会重新请求。那我们删掉条件判断怎么样
  // 这样即使query并未改变。这会导致我们总是去请求。
  // 想要解决这个class组件中的难题，唯一现实可行的办法是硬着头皮把query本身传入 Child 组件。 
  // Child 虽然实际并没有直接使用这个query的值，但能在它改变的时候触发一次重新请求：
  class ParentTWO extends Component {
    state = {
      query: 'react'
    };
    fetchData = () => {
      const url = 'https://hn.algolia.com/api/v1/search?query=' + this.state.query;
      // ... Fetch data and do something ...
    };
    render() {
      return <Child fetchData={this.fetchData} query={this.state.query} />;
    }
  }
  
  class ChildTWO extends Component {
    state = {
      data: null
    };
    componentDidMount() {
      this.props.fetchData();
    }
    componentDidUpdate(prevProps) {
      if (this.props.query !== prevProps.query) {
        this.props.fetchData();
      }
    }
    render() {
      return (<div></div>)
    }
  }
  // 在class组件中，函数属性本身并不是数据流的一部分。
  // 组件的方法中包含了可变的this变量导致我们不能确定无疑地认为它是不变的。
  // 因此，即使我们只需要一个函数，我们也必须把一堆数据传递下去仅仅是为了做“diff”。
  // 我们无法知道传入的this.props.fetchData 是否依赖状态，并且不知道它依赖的状态是否改变了。

  // 使用useCallback，函数完全可以参与到数据流中。
  // 我们可以说如果一个函数的输入改变了，这个函数就改变了。
  // 如果没有，函数也不会改变。感谢周到的useCallback，
  // 属性比如props.fetchData的改变也会自动传递下去。
export default Parent