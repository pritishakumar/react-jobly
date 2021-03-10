import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'reactstrap';

function NavBar() {
	const user = useContext(UserContext);

	let content;
	if (!Object.keys(user).length) {
		content = (
      <>
        <NavItem>
          <NavLink exact to={`/login`}>
            Log in
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink exact to={`/signup`}>
            Sign up
          </NavLink>
        </NavItem>
      </>
    );
	} else {
    content = (
      <>
        <NavItem>
					<NavLink exact to="/companies">Companies</NavLink>
				</NavItem>
				<NavItem>
					<NavLink exact to="/jobs">Jobs</NavLink>
				</NavItem>
				<NavItem>
					<NavLink exact to="/profile">Profile</NavLink>
				</NavItem>
        <NavItem>
          <NavLink to="/profile">
            Log out {user.username}
          </NavLink>
        </NavItem>
      </>
    )
  }

	return (
		<Navbar expand="sm" className="Navbar">
			<NavLink exact to="/" className="navbar-brand">
				Jobly
			</NavLink>
			<Nav className="ml-auto" navbar>
				{content}
			</Nav>
		</Navbar>
	);
}

export default NavBar;
