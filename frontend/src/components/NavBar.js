import React from "react";
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
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  FaBorderAll,
  FaRegUser,
  FaRegUserCircle,
  FaSistrix,
  FaTimesCircle,
  FaServer,
} from "react-icons/fa";

const Nav2 = (props) => {
  let auth = AuthService();

  const username = document.cookie.split('user=')[1].split('%20')[0]

  return (
    <>
      <ProSidebar>
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
              <Link to="/browse">Browse</Link>
            </MenuItem>
            <MenuItem icon={<FaRegUser />}><Link to= {`/profile/${username}`} >My Profile</Link> </MenuItem>
            <SubMenu title="Search" icon={<FaSistrix />}>
              <MenuItem>
                <Link to="/">Search Users</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/">Search Groups</Link>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Groups" icon={<FaRegUserCircle />}>
              <MenuItem>
                <Link to="/groupProfile/60de1c03e10e7f59d031746f">
                  My group
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/groupProfile/create">Group List</Link>
              </MenuItem>
            </SubMenu>
            <MenuItem icon={<FaServer/>}>
              <Link to="/video/upload" >
                Upload Video
              </Link>
            </MenuItem>
            <MenuItem icon={<FaTimesCircle />}>
              <Link to="/" onClick={auth.signout}>
                Sign Out
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
      ;
    </>
  );
};

const NavBar = withRouter(Nav2);
export default NavBar;
