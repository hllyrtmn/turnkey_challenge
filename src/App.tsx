import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GetOrganizationID from './components/GetOrganizationID/app';
import CreateSubOrganization from './components/CreateSubOrganization/app';
import ListSuborg from './components/ListSuborg/app';
import CreateSuborgUser from './components/CreateSuborgUser/app';
import Menu from './components/Menu/app';


const App: React.FC = () => {
  return (
    <Router>
      <div className="container-fluid p-3">
        <div className="row m-3">
          <div className="col-sm-6">
            <Menu/>
          </div>
          <div className="col-sm-6">
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                  <Routes>
                    <Route path="/" element={<GetOrganizationID />} />
                    <Route path="/create-sub-organization" element={<CreateSubOrganization />} />
                    <Route path="/list-suborg" element={<ListSuborg />} />
                    <Route path="/create-suborg-user" element={<CreateSuborgUser />} />
                  </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
