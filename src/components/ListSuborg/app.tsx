import React from 'react'
import TurnkeyService from '../../services/TurnkeyService';
interface State {
  subOrgIds: Array<string> | [];
}
class ListSuborg extends React.Component<{}, State> {
  async componentDidMount() {
    const turnkeyService = TurnkeyService.getInstance();
    const subOrgIds = await turnkeyService.listSuborgIds() || null;
    this.setState({ subOrgIds });
}   
constructor(props: {}) {
  super(props);
  this.state = {
    subOrgIds: []
  };
}
  render() {
  return (
    <div>
      <h2>List All SubOrgs</h2>
      
      { this.state.subOrgIds !== null && 
          this.state.subOrgIds.map((subOrgId, index) => (
          <div >{index+1}. Suborg ID - {subOrgId}</div>
          ))
        }
    </div>
  )
}
}

export default ListSuborg