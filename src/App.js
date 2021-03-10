import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import Navigation from './Navigation';
import JoblyApi from './api';
import { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import jwt from 'jsonwebtoken';
import useLocalStorage from './localStorageHook';

/** Bootstrap Components*/  
import Container from 'react-bootstrap/Container';


/** App renders list of routes for Jobly frontend
 * Using token at top level and passing down as props to let
 * Components know if user is logged in / if it should render
 *
 * props: none
 *
 * state: 
 * - token: (string) representing logged in user
 * - currentUserData: obj like 
 *    { username, firstName, lastName, email, isAdmin, jobs }
 * 
 * 
 * App -> Navigation
 *        Routes
 **/
function App() {
  const [token, setToken ] = useLocalStorage();
  const [currentUserData, setCurrentUserData] = useState(null);

  /** Every time token is updated,
   *  update API token and then fetch current user
   * 
   * Functionality: token on mount is loaded from localStorage and is either null 
   * or string.
   * on login/signup, token is updated, currentUser is decoded and set, 
   * and token is set back to null
   * useLocalStorage hook will store token in localStorage only if it is not null
   **/
  useEffect(
    function fetchCurrentUserOnTokenChange() {
      async function _fetchCurrentUser() {
        // using jwt to get username
        const usernameObj = jwt.decode(token);
        const user = await JoblyApi.getUser(usernameObj.username);
        setCurrentUserData(user);

        // reset token in frontend to null so effect doesn't run
        // again until another user logs in / signs up
        setToken(null);
      }

      if (token === null ) {
        console.debug("token in effect: ", token);
        JoblyApi.token = null;
      } else {
        console.debug("token is not null? ", token);
        JoblyApi.token = token;
        _fetchCurrentUser();
      }
    },
    [token, setToken]
  );

  /** signup user with form data and API call */
  async function signup(userFormData) {
    let newToken;
    try {
      newToken = await JoblyApi.register(userFormData);
      setToken(newToken);
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        errors: err,
      };
    }
  }
  /** login user using form data and API call */
  async function login(userFormData) {
    let newToken;
    try {
      newToken = await JoblyApi.login(userFormData);
      setToken(newToken);
      return {
        success: true,
      };
    } catch (err) {
      return {
        success: false,
        errors: err,
      };
    }
  }

  /** Logout current user, reset state,
   *  and reset token in localStorage to null */
  async function logout() {
    setToken(null);
    localStorage.setItem("token", null);
    setCurrentUserData(null);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Container fluid className="App-container">
          <Navigation currentUser={currentUserData} logout={logout}  />
          <Routes
            currentUser={currentUserData}
            login={login}
            signup={signup}
          />
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
