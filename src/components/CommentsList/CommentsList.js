import React from 'react';
import CommentsItem from '../CommentsItem/CommentsItem'
import './CommentsList.css';



function CommentsList(props) {
  const { items, activeUser } = props;

  return (
    <ul className="todolist">
      {items.map(item => (
        <CommentsItem key={item.id} id={item.id} text={item.text} completed={item.done}
          activeUser={activeUser} fname={item.userFname} lname={item.userLname} img={item.img}/>
      ))}
    </ul>
  );
}

export default CommentsList;