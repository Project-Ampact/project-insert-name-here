import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import Landing from './components/Landing'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
