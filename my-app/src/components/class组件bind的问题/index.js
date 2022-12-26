import React from 'react'
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'Dan'
    }
    this.showMessage = this.showMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showMessage() {
    alert('Followed ' + this.state.user);
  }

  handleClick() {
    setTimeout(this.showMessage, 3000);
  }

  render() {
    return <button onClick={this.handleClick}>Follow</button>;
  }
}
export default ProfilePage