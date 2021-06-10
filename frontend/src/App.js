import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
import NavigationBar from './components/NavigationBar'

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
      </Switch>
    </Router>
  );
}

export default App;
