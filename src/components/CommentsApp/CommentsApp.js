import React from 'react';
import { useState } from 'react';
import CommentsList from '../CommentsList/CommentsList'
import './CommentsApp.css';


function CommentsApp(props) {
  const {message, message_items, addMessageItems, activeUser} = props;
  const [text, setText] = useState("");
  const [items, setItems] = useState(message_items);
  const [allitems, setAllItems] = useState([]);


  function handleTextChange(event) {
    setText(event.target.value);
  }
  function handleAddItem(event) {
    event.preventDefault();
    // document.getElementById("add-btn").click();
    var newItem = {
      id: Date.now(),
      text: text,
      done: false,
      messageid: message.id,
      userFname: activeUser.fname,
      userLname: activeUser.lname,
    };

    setItems(items.concat(newItem));
    // setAllItems(allitems.concat(newItem));
    setText("");
    addMessageItems(newItem);

  }
  
  function handleDeleteItem(itemId) {
    var updatedItems = allitems.filter(item => {
      return item.id !== itemId;
    });

    setAllItems([].concat(updatedItems));
    setItems([].concat(updatedItems));

  }

  
  
  
  const activeMessageComments = message_items.filter(message_item => message_item.messageid === message.id);

  return (
    <div>
      <h3>Comments:</h3>
      
      <div className="row">
        <div>
          <CommentsList items={activeMessageComments}  onDeleteItem={handleDeleteItem} activeUser={activeUser}/>
        </div>
      </div>
      <form className="row"> 
        <div>
          <input type="text" placeholder="Add Comment" className="form-control" onChange={handleTextChange} value={text} />
        </div>
        <div >
          <button className="add-btn btn btn-primary" style={{ visibility: "hidden" }} onClick={handleAddItem}></button>
        </div>
      </form>

    </div>
  )
}

export default CommentsApp;