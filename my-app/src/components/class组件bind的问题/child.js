import React from 'react'
class ProfilePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        user: 'xxx',
      };
      this.showMessage = this.showMessage.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
    render() {
      return (
        <>
            <select
                value={this.state.user}
                onChange={e => this.setState({ user: e.target.value })}
            >
                <option value="Dan">Dan</option>
                <option value="Sophie">Sophie</option>
                <option value="Sunil">Sunil</option>
            </select>
            <ProfilePage user={this.state.user}>Follow</ProfilePage>;
        </>
      )
    }
  }
  
  export default ProfilePage