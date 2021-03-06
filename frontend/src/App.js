import React from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/pages/Login'
import Landing from './components/pages/Landing'
import GroupProfile from './components/pages/GroupProfile'
import GroupProfileEdit from './components/pages/GroupProfileEdit';
import GroupProfileCreate from './components/pages/GroupProfileCreate';
import DeliverablePage from './components/pages/DeliverablePage';
import DeliverableCreate from './components/deliverableComponents/DeliverableCreate';
import PageLayout from "./components/pages/DefaultPage";
import Browse from './components/pages/Browse';
import {AuthService, AuthProvider} from './util/authService'
import { ToastContainer } from 'react-toastify';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Registration from './components/pages/Registration';
import UserProfile from './components/pages/UserProfile';
import SearchUserProfiles from './components/pages/SearchUserProfiles';
import UserProfileEdit from './components/userProfile/UserProfileEdit';
import SingleVideoPage from './components/pages/SingleVideoPage';
import SingleVideoAdd from './components/pages/SingleVideoAdd';
import PostFeed from './components/pages/PostFeed';
import DeliverableFeed from './components/pages/DeliverableFeed';
import AssignmentFeed from './components/pages/AssignmentFeed';
import PostFeedAnnouncements from './components/pages/PostFeedAnnouncements';
import CalendarPage from './components/pages/CalendarPage';
import MessageSection from './components/pages/MessageSection';
import MessagePage from './components/pages/MessagePage';
import SingleFeedbackPage from './components/pages/SingleFeedbackPage';
import SingleUserSubmissionPage from './components/pages/SingleUserSubmissionPage';



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
    <div>
      <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/login" component={Login}/>
            <Route path="/test" component={CalendarPage}/>
            <Route path="/register" component={Registration}/>
            <Route path="/browse" component={Browse}/>
            <Route path="/postFeed" component={PostFeed}/>
            <Route path="/deliverableFeed" component={DeliverableFeed}/>
            <Route path="/assignmentsFeed" component={AssignmentFeed}/>
            <Route path="/postFeedAnnouncements" component={PostFeedAnnouncements}/>
            <Route path="/profile/search" component={SearchUserProfiles}/>
            <Route exact path="/video/upload/" children={<SingleVideoAdd/>}/>
            <Route exact path="/video/:vid" children={<SingleVideoPage/>}/>
            <Route exact path="/deliverable/create" children={<DeliverableCreate/>}/>
            <PrivateRoute exact path="/profile/:uid" children={<UserProfile/>}/>
            <PrivateRoute exact path="/profile/:uid/edit" children={<UserProfileEdit/>}/>
            <PrivateRoute exact path="/groupProfile/edit/:gid" children={<GroupProfileEdit/>}/>
            <PrivateRoute exact path="/groupProfile/create" children={<GroupProfileCreate/>}/>
            <PrivateRoute exact path="/groupProfile/:gid" children={<GroupProfile/>}/>
            <PrivateRoute exact path="/calendar" children={<CalendarPage/>}/>
            <PrivateRoute exact path="/message" children={<MessagePage/>}/>
            <PrivateRoute exact path="/message/:uid" children={<MessageSection/>}/>
            <PrivateRoute exact path="/submission/:sid" children={<SingleFeedbackPage/>}/>
            <PrivateRoute exact path="/user/submission/:sid" children={<SingleUserSubmissionPage/>}/>
            <PrivateRoute exact path="/deliverable/:did" children={<DeliverablePage/>}/>
          </Switch>
        </Router>
      </AuthProvider>      
    </div>
  );
}

export default App;
