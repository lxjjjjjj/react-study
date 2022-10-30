import React from 'react'
export default class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1,
        };
    }

    componentWillMount(){
        this.setState({number: this.state.number + 1})
    }

    render() {
        const { number } = this.state;
        return (
            <div>
                <div>number is: {number}</div>
            </div>
        );
    }
}