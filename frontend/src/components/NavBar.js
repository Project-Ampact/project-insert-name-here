import {React, useEffect, useState} from "react";
import { withRouter } from "react-router";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { AuthService } from "../util/authService";
import "./NavigationBar.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  FaBorderAll,
  FaRegUser,
  FaRegUserCircle,
  FaSistrix,
  FaTimesCircle,
  FaServer,
  FaRegListAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import {SiGooglemessages} from "react-icons/si"

const AddVideo = (props) => {
  if (props.canAdd) {
    return (
      <MenuItem icon={<FaServer/>}>
        <Link to="/video/upload" >
          Upload Video
        </Link>
      </MenuItem>
    )
  }
  return null
}

const Nav2 = (props) => {
  const [group, setGroup] = useState('')
  let auth = AuthService();
  const username = document.cookie.split('user=')[1].split('%20')[0]
  const role = document.cookie.split('user=')[1].split('%20')[1]

  useEffect(() => {
    fetch(`http://localhost:8000/group/member/${username}`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGroup(data._id);
      })
  }, [username])

  const myGroup = (group) ? (
  <MenuItem>
    <Link to={`/groupProfile/${group}`}>
      My group
    </Link>
  </MenuItem>) : null;

  return (
    <>
      <ProSidebar style={{position: 'fixed'}}>
        <SidebarHeader>
          {
            <div>
              <img alt="alt text" src={logo} width="100" height="80" />
              <h1 className="sidebar-h1"> Ampact</h1>
            </div>
          }
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem icon={<FaBorderAll />}>
              <Link to="/browse">Browse Videos</Link>
            </MenuItem>
            <SubMenu title="Posts" icon={<FaRegListAlt />}>
              <MenuItem>
                <Link to="/postFeedAnnouncements">
                  Announcements
                </Link>
              </MenuItem>
              <MenuItem>
              <Link to="/postFeed">Discussion</Link>
            </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaRegUser />}><Link to= {`/profile/${username}`} >My Profile</Link> </MenuItem>
            <SubMenu title="Search" icon={<FaSistrix />}>
              <MenuItem>
                <Link to="/profile/search">Search Users</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/groupProfile/create">Search Groups</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Groups" icon={<FaRegUserCircle />}>
              {myGroup}
              <MenuItem>
                <Link to="/groupProfile/create">Group List</Link>
              </MenuItem>
            </SubMenu>
            <AddVideo canAdd={role.toLowerCase() === "instructor"}/>
            <MenuItem icon={<FaCalendarAlt/>}>
              <Link to="/calendar">Calendar</Link>
            </MenuItem>
            <MenuItem icon={<SiGooglemessages/>}>
              <Link to="/message">Messages</Link>
            </MenuItem>
            <MenuItem icon={<FaTimesCircle />}>
              <Link to="/" onClick={auth.signout}>
                Sign Out
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};

const NavBar = withRouter(Nav2);
export default NavBar;
