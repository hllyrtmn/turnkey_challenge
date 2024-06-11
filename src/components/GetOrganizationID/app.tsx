import React from "react";
import TurnkeyService from "../../services/TurnkeyService";

  interface State {
    id: string | null;
  }
class GetOrganizationID extends React.Component<{}, State>{
    async componentDidMount() {
        const turnkeyService = TurnkeyService.getInstance();
        const id = await turnkeyService.getOrganizationID() || null;
        this.setState({ id });
    }
    constructor(props: {}) {
        super(props);
        this.state = {
          id: null
        };
    }
    render() {
        return (
            <div>
              My turnkey organization ID is "{this.state.id}"
            </div>
          );
    }
}
export default GetOrganizationID;