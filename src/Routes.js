import { Route, Switch, Redirect } from "react-router-dom";
import SignupForm from "./user/SignupForm";
import LoginForm from "./user/LoginForm";
import Companies from "./companies/Companies";
import Jobs from "./jobs/Jobs";
import ProfileForm from "./user/ProfileForm";
import Homepage from "./Homepage";
import CompanyDetail from "./companies/CompanyDetail";

/**
 * Routes for Jobly
 *
 * props: 
 * - signup: fn to be called in App
 * - login: fn to be called in App
 * - update: fn to be called in App
 * - currentUser: obj like 
 *     { username, firstName, lastName, email, isAdmin, jobs }
 * 
 * state: none
 *
 * App -> Routes ->
 *    ProfileForm, LoginForm, SignupForm
 *    HomePage
 *    Companies
 *    CompanyDetail
 *    Jobs
 *    Redirect - to homepage
 **/

function Routes({signup, login, update, currentUser }) {

  return (
   
      <Switch>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login}/>
        </Route>
        <Route exact path="/companies">
          <Companies currentUser={currentUser} />
        </Route>
        <Route exact path ="/companies/:handle">
          { currentUser ? <CompanyDetail currentUser={currentUser} /> : <Redirect to="/" /> }
        </Route>
        <Route exact path="/jobs">
          <Jobs currentUser={currentUser} />
        </Route>
        <Route exact path="/profile">
          <ProfileForm currentUser={currentUser} update={update}/>
        </Route>
        <Route exact path="/">
          <Homepage currentUser={currentUser} />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
   
  );
}

export default Routes;
