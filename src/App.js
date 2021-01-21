import { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import VotingPage from './pages/VotingPage/VotingPage';
import TenantsPage from './pages/TenantsPage/TenantsPage';
import Parse from 'parse';
import UserModel from './model/UserModel';



function App() {
  const [activeUser, setActiveUser] = useState(
    Parse.User.current() ? new UserModel(Parse.User.current()) : null);   // During development it's conveient to be logged in by default

  //============== loging/logout==================
  function handleLogout() {
    setActiveUser(null);
    Parse.User.logOut();
  }

  function handleLogin(loggedinUser) {
    setActiveUser(loggedinUser);
  }
  return (


    <HashRouter>
      <Switch>
        <Route exact path="/"><HomePage activeUser={activeUser} onLogout={handleLogout} /></Route>
        <Route exact path="/login"><LoginPage activeUser={activeUser}  onLogin={handleLogin} /></Route>
        <Route exact path="/signup"><SignupPage activeUser={activeUser}  onLogin={handleLogin} /></Route>
        <Route exact path="/tenants"><TenantsPage activeUser={activeUser}  onLogout={handleLogout}/></Route>
        <Route exact path="/messages"> <MessagesPage activeUser={activeUser} onLogout={handleLogout}/> </Route>
        <Route exact path="/voting"> <VotingPage activeUser={activeUser} onLogout={handleLogout} /></Route>
      </Switch>
    </HashRouter>

  );
}

export default App;
