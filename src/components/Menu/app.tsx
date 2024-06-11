import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import TurnkeyService from '../../services/TurnkeyService';

interface Props {}

interface State {
  activatedIndex: number | null;
  userName: string | null;
}

class Menu extends React.Component<Props, State> {
  async componentDidMount(){
      const turnkeyService =  TurnkeyService.getInstance();
      const userName = await turnkeyService.getUserName() || null
      this.setState({userName})
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      activatedIndex: null,
      userName:null
    };
  }

  handleClick = (index: number) => {
    this.setState({ activatedIndex: index });
  };

  render() {
    const links = [
      { to: "/", text: "My Turnkey Organization" },
      { to: "/create-sub-organization", text: "Create a new Sub Organization" },
      { to: "/list-suborg", text: "List All Suborgs" },
      { to: "/create-suborg-user", text: "Create a new SubOrg User" }
    ];

    const { activatedIndex } = this.state;

    return (
      <nav className="col-md-3 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <h1 className="text-center">Welcome {this.state.userName}</h1>
          <ul className="nav flex-column">
            {links.map((link, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className={`nav-link ${
                    activatedIndex === index ? "active" : ""
                  }`}
                  onClick={() => this.handleClick(index)}
                  to={link.to}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}
export default Menu