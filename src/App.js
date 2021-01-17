import { useEffect, useMemo, useRef, useState } from 'react';
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
// import PieChart from './components/PieChart/PieChart';
import PieChart from './components/PieChart/PieChart';
import { Pie } from "react-chartjs-2";



function App() {
  const [users, setUsers] = useState(jsonUsers);        // HACK ALERT: holding all users as state only because this is a JSON based application (no server side)
  const [activeUser, setActiveUser] = useState(jsonUsers[0]);   // During development it's conveient to be logged in by default
  const [messages, setMessages] = useState(jsonMessages);  // HACK ALERT: holding all recipes as state only because this is a JSON based application (no server side)
  const [messageItems, setMessageItems] = useState([]);
  const [votings, setVotings] = useState(jsonVotings);


  const [votesPieData, setVotesPieData] = useState([]);




  //============== loging/logout==================
  function handleLogout() {
    setActiveUser(null);
  }

  function handleLogin(loggedinUser) {
    setActiveUser(loggedinUser);
  }

  //============== Messages ==================
  function addMessage(title, details, priority, img) {
    const newMessage = {
      id: Date.now(),
      title,
      details,
      priority,
      img,
      userId: activeUser.id,
      building: activeUser.building,
      isRead: [],
      date: new Date(),
    }

    setMessages(messages.concat(newMessage));
  }

  function updateMessage(messageId, activeUserId) {
    const found = messages.find(element => element.id === messageId);
    const index = messages.indexOf(found);
    if (index > -1) {
      messages[index].isRead.push(activeUserId);
      setMessages([...messages]);
    }
  }

  function removeMessage(messageId) {
    const found = messages.find(element => element.id === messageId);
    const index = messages.indexOf(found);
    if (index > -1) {
      messages.splice(index, 1);
      setMessages([...messages]);
    }
  }

  function updateMessageContent(title, details, priority, img, messageId) {
    const found = messages.find(element => element.id === messageId);
    const index = messages.indexOf(found);
    if (index > -1) {
      messages[index].title = title;
      messages[index].details = details;
      messages[index].priority = priority;
      messages[index].img = img;
      setMessages([...messages]);
    }
  }
  const activeUserMessages = activeUser ? messages.filter(message => message.building === activeUser.building) : [];



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
      });
    }
    setMessages([...messages]);
  }


  //============== Voting ==================
  function addVote(title, details, options, endDate) {
    const newVote = {
      id: Date.now(),
      title,
      details,
      options,
      endDate,
      userId: activeUser.id,
      building: activeUser.building,
      voteStatus: "active",
      result: "",
      votesPieData: {}
    }

    setVotings(votings.concat(newVote));
  }

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

  function AddUsersVote(chosenOption, voteId, userId) {
    const found = votings.find(element => element.id === voteId);
    const index = votings.indexOf(found);
    
    if (index > -1) {
      votings[index].votesPieData[userId] = chosenOption;
      setVotings([...votings]);
    }
  }


  return (


    <HashRouter>
      <Switch>
        <Route exact path="/"><HomePage activeUser={activeUser} onLogout={handleLogout} /></Route>
        <Route exact path="/login"><LoginPage activeUser={activeUser} users={users} onLogin={handleLogin} /></Route>
        <Route exact path="/signup"><SignupPage activeUser={activeUser} /></Route>

        <Route exact path="/messages">
          <MessagesPage activeUser={activeUser} onLogout={handleLogout}
            messages={activeUserMessages} updateMessage={updateMessage} SortMsg={SortMsg} removeMessage={removeMessage}
            addMessage={addMessage} addMessageItems={addMessageItems}
            message_items={messageItems} updateMessageContent={updateMessageContent} />
        </Route>

        <Route exact path="/voting">
          <VotingPage activeUser={activeUser} onLogout={handleLogout} votings={activeUserVoting} addVote={addVote}
            updateEndDate={updateEndDate} votesPieData={votesPieData} AddUsersVote={AddUsersVote} />
        </Route>
      </Switch>
    </HashRouter>

  );
}

export default App;
