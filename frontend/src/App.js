import React, { onVisit, useState, useEffect, useStyles } from "react";
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
  Route,
  useParams,
} from "react-router-dom";
import Registration from './components/pages/Registration';

function App() {
/*function UserPage({match}) {
    const classes = useStyles();
  
    const [auth, setAuth] = useState(false);
    const [userPosts, setPosts] = useState([]);
    const [user, setUser] = useState("");
  
    //every 2 seconds check if user is logged in and retrieve posts
    useEffect(() => {
      const interval = setInterval(async() => {
        gid = match.params.gid
        }).catch(() => {
          setPosts([]);
        });
      }, 1000);
    }*/
   // let {gid} = useParams()
// <Route path="/groupProfile/:gid"  component={GroupProfile(<Child/>)}/>
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/login" component={Login}/>
        <Route path="/test" component={NavigationBar}/>
        <Route path="/register" component={Registration}/>
        <Route path="/groupProfile/edit" component={GroupProfileEdit}/>
        <Route path="/groupProfile/create" component={GroupProfileCreate}/>
        <Route path="/groupProfile/:gid" children={<GroupProfile/>} />
      </Switch>
    </Router>
  )};

export default App;
