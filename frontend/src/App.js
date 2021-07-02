import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
import NavigationBar from './components/NavigationBar'
import GroupProfile from './components/pages/GroupProfile'
import GroupProfileEdit from './components/pages/GroupProfileEdit';
import GroupProfileCreate from './components/pages/GroupProfileCreate';
import SingleVideoPage from './components/pages/SingleVideoPage';
import {AuthService, AuthProvider} from './util/authService'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Registration from './components/pages/Registration';
import UserProfile from './components/pages/UserProfile';
import SearchUserProfiles from './components/pages/SearchUserProfiles';

function PrivateRoute({ children, ...rest }) {
  let auth = AuthService();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth && auth.user ? (
          children
        ) : (console.log('not logged in'),
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  let auth = AuthService();
  console.log(auth);
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/login" component={Login}/>
          <Route path="/test" component={NavigationBar}/>
          <Route path="/register" component={Registration}/>
          <Route path="/profile/search" component={SearchUserProfiles}/>
          <PrivateRoute exact path="/video/:vid" children={<SingleVideoPage/>}/>
          <PrivateRoute exact path="/profile/:uid" children={<UserProfile/>}/>
          <PrivateRoute exact path="/groupProfile/edit/:gid" children={<GroupProfileEdit/>}/>
          <PrivateRoute exact path="/groupProfile/create" children={<GroupProfileCreate/>}/>
          <PrivateRoute exact path="/groupProfile/:gid" children={<GroupProfile/>}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
