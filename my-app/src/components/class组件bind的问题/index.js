import ProfilePage from "./child";
import React from 'react'
class IndexPage extends React.Component {
    constructor(props) {
      super(props);
      this.showMessage = this.showMessage.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
  
    showMessage() {
      alert('Followed ' + this.props.user);
    }
  
    handleClick() {
      setTimeout(this.showMessage, 3000);
    }
  
    render() {
      return <button onClick={this.handleClick}>Follow</button>;
    }
  }
  export default IndexPage