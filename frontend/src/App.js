import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
import NavigationBar from './components/NavigationBar'
import GroupProfile from './components/pages/GroupProfile'
import GroupProfileEdit from './components/pages/GroupProfileEdit';
import GroupProfileCreate from './components/pages/GroupProfileCreate';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Registration from './components/pages/Registration';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={Login}/>
        <Route path="/test" component={NavigationBar}/>
        <Route path="/register" component={Registration}/>
        <Route path="/groupProfile/edit" component={GroupProfileEdit}/>
        <Route path="/groupProfile/create" component={GroupProfileCreate}/>
        <Route path="/groupProfile" component={GroupProfile}/>
      </Switch>
    </Router>
  );
}

export default App;
