import React from 'react'
// export default class Parent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             number: 0,
//         };
//     }

//     handleClick = () => {
//         this.setState({
//             number: this.state.number + 1,
//         });
//     };

//     render() {
//         const { number } = this.state;
//         return (
//             <div>
//                 <Child number={number} />
//                 <button onClick={this.handleClick}>add one(outer)</button>
//             </div>
//         );
//     }
// }

// class Child extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             number: props.number,
//         };
//     }

//     static getDerivedStateFromProps(props, state) {
//         if (props.number !== state.number) {
//             // 即使是setState引发的变化这里return的也是props，所以setState不会引发组件重新渲染
//             return { number: props.number };
//         }
//         return null;
//     }

//     handleClick = () => {
//         this.setState({
//             number: this.state.number + 1,
//         });
//     };

//     render() {
//         const { number } = this.state;
//         return (
//             <div>
//                 <div>number is: {number}</div>
//                 {/* 这个按钮点击无效 */}
//                 <button onClick={this.handleClick}>add one(inner)</button>
//             </div>
//         );
//     }
// }


// getDerivedStateFromProps和componentWillReceiveProps的区别
// getDerivedStateFromProps与setState并用出现的问题
export default class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
        };
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1,
        });
    };

    render() {
        const { number } = this.state;
        return (
            <div>
                <Child number={number} />
                <button onClick={this.handleClick}>add one(outer)</button>
            </div>
        );
    }
}

class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: props.number,
        };
    }

    static getDerivedStateFromProps(props, state) {
       // 只有props引发的变化才会进入这里
        if (props.number !== state.prevNumber) {
            return {
                number: props.number,
                prevNumber: props.number,
            };
        }
        console.log('change from setState');
        return null;
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1,
        });
    };

    render() {
        const { number } = this.state;
        return (
            <div>
                <div>number is: {number}</div>
                <button onClick={this.handleClick}>add one(inner)</button>
            </div>
        );
    }
}
