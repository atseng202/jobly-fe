import Logout from './Logout';
import jwt from "jsonwebtoken";
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

/** 
 * Navigation renders list of NavLinks to different routes of Jobly
 * 
 * props:
 * - currentUser: obj like, 
 *   { username, firstName, lastName, email, isAdmin, jobs }
 * 
 * state: none
 * 
 * App -> Navigation
 * */

//use active class

function Navigation({ logout, currentUser }) {

	/** renders signup / login links */
	function renderLoggedOutLinks() {
		return (
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as="div">
            <NavLink to="/login">Login</NavLink>
          </Nav.Link>

          <Nav.Link as="div">
            <NavLink to="/signup">Signup</NavLink>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    );
	}

	/** Helper method renders NavLinks for logged in user */

	function renderLoggedInLinks(username) {
		return (
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
          <Nav.Link as="div">
            <NavLink to="/companies">Companies</NavLink>
          </Nav.Link>

					<Nav.Link as="div">
            <NavLink to="/jobs">Jobs</NavLink>
          </Nav.Link>

          <Nav.Link as="div">
            <NavLink to="/profile">Profile</NavLink>
          </Nav.Link>

					<Logout logout={logout} username={username}/>
				</Nav>
			</Navbar.Collapse>
		);
  }
  
  /** Helper method checks for a user and decides which links to render */
  function elementsToRender() {
    if (currentUser !== null) {
        return renderLoggedInLinks(currentUser.username);
    } else {
      return renderLoggedOutLinks();
    }
  }  

	return (
		<Navbar bg="light" expand="lg">
			<Nav.Link href="/">Jobly</Nav.Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			{elementsToRender()}
		</Navbar>
	);
}

export default Navigation;
