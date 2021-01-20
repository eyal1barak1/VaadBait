import { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import jsonVotings from './data/votings.json';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import VotingPage from './pages/VotingPage/VotingPage';
import TenantsPage from './pages/TenantsPage/TenantsPage';
import Parse from 'parse';
import UserModel from './model/UserModel';



function App() {
  const [activeUser, setActiveUser] = useState(
    Parse.User.current() ? new UserModel(Parse.User.current()) : null);   // During development it's conveient to be logged in by default
  const [votings, setVotings] = useState(jsonVotings);

  //============== loging/logout==================
  function handleLogout() {
    setActiveUser(null);
    Parse.User.logOut();
  }

  function handleLogin(loggedinUser) {
    setActiveUser(loggedinUser);
  }

  //============== Voting ==================

  // Check the end Date And Update Vote Status
  function CheckDateAndUpdateVoteStat(voteItem, index) {
    var now = new Date();
    var itemsEndDate = new Date(voteItem.endDate);

    voteItem.voteStatus = now >= itemsEndDate ? "not active" : "active";
  }

  votings.forEach(CheckDateAndUpdateVoteStat);

  //

  const activeUserVoting = activeUser ? votings.filter(voting => voting.building === activeUser.building) : [];

  function updateEndDate(voteId, updatedEndDate) {
    const found = votings.find(element => element.id === voteId);
    const index = votings.indexOf(found);
    if (index > -1) {
      votings[index].endDate = updatedEndDate;
      setVotings([...votings]);
    }
  }

  return (


    <HashRouter>
      <Switch>
        <Route exact path="/"><HomePage activeUser={activeUser} onLogout={handleLogout} /></Route>
        <Route exact path="/login"><LoginPage activeUser={activeUser}  onLogin={handleLogin} /></Route>
        <Route exact path="/signup"><SignupPage activeUser={activeUser}  onLogin={handleLogin} /></Route>
        <Route exact path="/tenants"><TenantsPage activeUser={activeUser} onLogin={handleLogin} onLogout={handleLogout}/></Route>
        <Route exact path="/messages"> <MessagesPage activeUser={activeUser} onLogout={handleLogout}/> </Route>

        <Route exact path="/voting">
          <VotingPage activeUser={activeUser} onLogout={handleLogout} votings={activeUserVoting}
            updateEndDate={updateEndDate} />
        </Route>
      </Switch>
    </HashRouter>

  );
}

export default App;
