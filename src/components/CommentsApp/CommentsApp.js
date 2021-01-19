import React, { useEffect } from 'react';
import { useState } from 'react';
import CommentsList from '../CommentsList/CommentsList'
import './CommentsApp.css';
import Parse from 'parse';
import CommentModel from "../../model/CommentModel";

function CommentsApp(props) {
  const { message, message_items, addMessageItems, activeUser } = props;
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const ParseComments = Parse.Object.extend('Comment');
      const query = new Parse.Query(ParseComments);
      //console.log(Parse.User.current().attributes.building);
      //query.equalTo("messageid", new Parse.Object("Message"));
      const parseComments = await query.find();
      setItems(parseComments.map(parseComment => new CommentModel(parseComment)));
    }

    if (activeUser) {
      fetchData()
    }
  }, [activeUser])

  function handleTextChange(event) {
    setText(event.target.value);
  }
  function handleAddItem(event) {

    const Comment = Parse.Object.extend('Comment');
    const myNewObject = new Comment();
    myNewObject.set('text', text);
    myNewObject.set('done', false);
    myNewObject.set('userFname', activeUser.fname);
    myNewObject.set('userLname', activeUser.lname);
    myNewObject.set('messageid', new Parse.Object("Message"));

    myNewObject.save().then(
      (result) => {
        setItems(items.concat(new CommentModel(myNewObject)));
        setText("");
        console.log('Comment created', result);
      },
      (error) => {
        console.error('Error while creating Comment: ', error);
      }
    );

  }


  const activeMessageComments = message_items.filter(message_item => message_item.messageid === message.id);

  return (
    <div>
      <h3>Comments:</h3>

      <div className="row">
        <div>
          <CommentsList items={items} activeUser={activeUser} />
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