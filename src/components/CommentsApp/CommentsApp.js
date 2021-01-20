import React, { useEffect } from 'react';
import { useState } from 'react';
import CommentsList from '../CommentsList/CommentsList'
import './CommentsApp.css';
import Parse from 'parse';
import CommentModel from "../../model/CommentModel";

function CommentsApp(props) {
  const { message, activeUser } = props;
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const ParseComments = Parse.Object.extend('Comment');
      const query = new Parse.Query(ParseComments);
      query.equalTo("messageId", {"__type":"Pointer","className":"Message","objectId":message.id});
      const parseComments = await query.find();
      setItems(parseComments.map(parseComment => new CommentModel(parseComment)));
    }

    if (activeUser) {
      fetchData()
    }
  }, [activeUser, message])

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
    myNewObject.set('messageId', {"__type":"Pointer","className":"Message","objectId":message.id});
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