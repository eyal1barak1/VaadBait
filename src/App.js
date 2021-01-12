import { useState } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import jsonUsers from './data/users.json';
import jsonMessages from './data/messages.json';
import jsonVotings from './data/votings.json';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import VotingPage from './pages/VotingPage/VotingPage';


function App() {
  const [users, setUsers] = useState(jsonUsers);        // HACK ALERT: holding all users as state only because this is a JSON based application (no server side)
  const [activeUser, setActiveUser] = useState(jsonUsers[0]);   // During development it's conveient to be logged in by default
  const [messages, setMessages] = useState(jsonMessages);  // HACK ALERT: holding all recipes as state only because this is a JSON based application (no server side)
  const [votings, setVotings] = useState(jsonMessages); 

  function handleLogout() {
    setActiveUser(null);
  }

  function handleLogin(loggedinUser) {
    setActiveUser(loggedinUser);
  }

  function addMessage(title, details, priority, img) {
    const newMessage = {
      id: messages[messages.length - 1].id + 1,
      title,
      details,
      priority,
      img,
      userId: activeUser.id
    }

    setMessages(messages.concat(newMessage));
  }
  const activeUserMessages = activeUser ? messages.filter(message => message.userId === activeUser.id) : [];

  function addVote(title, details, priority, img) {
    const newVote= {
      id: votings[votings.length - 1].id + 1,
      title,
      details,
      priority,
      img,
      userId: activeUser.id
    }

    setVotings(votings.concat(newVote));
  }

  const activeUserVoting = activeUser ? votings.filter(voting => voting.userId === activeUser.id) : [];
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/"><HomePage activeUser={activeUser} onLogout={handleLogout} /></Route>
        <Route exact path="/login"><LoginPage activeUser={activeUser} users={users} onLogin={handleLogin} /></Route>
        <Route exact path="/signup"><SignupPage activeUser={activeUser} /></Route>

        <Route exact path="/messages"><MessagesPage activeUser={activeUser} onLogout={handleLogout}
          messages={activeUserMessages} addMessage={addMessage} /></Route>
        <Route exact path="/voting"><VotingPage activeUser={activeUser} onLogout={handleLogout}
          votings={activeUserVoting} addVote={addVote} /></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
