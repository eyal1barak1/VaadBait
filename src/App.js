import { useEffect, useRef, useState } from 'react';
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
  const [messageItems, setMessageItems] = useState([]);
  const [reRender, setReRender] = useState(false);
  let date = new Date();


  // function usePrevious(value) {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = value;
  //   });
  //   return ref.current;
  // }



  function handleLogout() {
    setActiveUser(null);
  }

  function handleLogin(loggedinUser) {
    setActiveUser(loggedinUser);
  }

  function addMessage(title, details, priority, img) {
    const newMessage = {
      id: Date.now(),
      title,
      details,
      priority,
      img,
      userId: activeUser.id,
      isRead: false,
      date: date,
    }

    setMessages(messages.concat(newMessage));
  }

  function updateMessage(messageId) {
    const found = messages.find(element => element.id === messageId);
    const index = messages.indexOf(found);
    if (index > -1) {
      messages[index].isRead = true;
      setMessages(messages);
    }
  }

  function removeMessage(messageId) {
    const found = messages.find(element => element.id === messageId);
    const index = messages.indexOf(found);
    if (index > -1) {
      messages.splice(index, 1);
      setMessages(messages);
      setReRender(!reRender);
    }
  }
  const activeUserMessages = activeUser ? messages.filter(message => message.userId === activeUser.id) : [];

  function addVote(title, details, priority, img) {
    const newVote = {
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

  function addMessageItems(newItem) {
    setMessageItems(messageItems.concat(newItem));
  }

  function SortMsg(sortBy) {
    if (sortBy === "date") {
      messages.sort(function (a, b) {
        const firstDate = Date.parse(a.date);
        const secondDate = Date.parse(b.date);

        return secondDate - firstDate;
      });
    }
    else {
      messages.sort(function (a, b) {
        var nameA = a.priority.toUpperCase(); // ignore upper and lowercase
        var nameB = b.priority.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
        // return a.priority.toUpperCase() < b.priority.toUpperCase() ? -1 : 1;
      });
    }
    setMessages(messages);
  }





  return (


    <HashRouter>
      <Switch>
        <Route exact path="/"><HomePage activeUser={activeUser} onLogout={handleLogout} /></Route>
        <Route exact path="/login"><LoginPage activeUser={activeUser} users={users} onLogin={handleLogin} /></Route>
        <Route exact path="/signup"><SignupPage activeUser={activeUser} /></Route>

        <Route exact path="/messages"><MessagesPage activeUser={activeUser} onLogout={handleLogout}
          messages={activeUserMessages} updateMessage={updateMessage} SortMsg={SortMsg} removeMessage={removeMessage}
          addMessage={addMessage} addMessageItems={addMessageItems} message_items={messageItems}
        /></Route>
        <Route exact path="/voting"><VotingPage activeUser={activeUser} onLogout={handleLogout}
          votings={activeUserVoting} addVote={addVote} /></Route>
      </Switch>
    </HashRouter>

  );
}

export default App;
