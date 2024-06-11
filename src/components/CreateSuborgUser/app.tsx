import React from 'react'
import TurnkeyService from '../../services/TurnkeyService';

interface State {
  result: string | null;
  organizationId: string;
  userName: string;
  userEmail: string;
}

class CreateSuborgUser extends React.Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      result: "",
      organizationId: "",
      userName: "",
      userEmail: ""
    };
    this.createSuborgUser = this.createSuborgUser.bind(this)
  }

  createSuborgUser(){
    const {organizationId,userName,userEmail} = this.state;
    const turnkeyService = TurnkeyService.getInstance();
    var result = turnkeyService.createSubOrgUser(organizationId,userName,userEmail);
    this.setState({result})
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  render() {
    return (
      <div>
        <div>
            <h2>Create a new Sub-Org User</h2>
            <div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="">OrganizationId</span>
  </div>
  <input
          type="text"
          name="subOrgName"
          value={this.state.organizationId}
          onChange={this.handleInputChange}
          placeholder="Sub Org Name"
        />
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="">Root User Name</span>
  </div>
  <input
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={this.handleInputChange}
          placeholder="User Name"
        />
</div>
<div className="input-group mb-3">
  <div className="input-group-prepend">
    <span className="input-group-text" id="">Root User Email</span>
  </div>
  <input
          type="text"
          name="userEmail"
          value={this.state.userEmail}
          onChange={this.handleInputChange}
          placeholder="User Email"
        />
</div>
          <button className='btn btn-info' onClick={this.createSuborgUser}>Create User</button>
          <small>{this.state.result}</small>
          </div>
      </div>
    )
  }
}

export default CreateSuborgUser