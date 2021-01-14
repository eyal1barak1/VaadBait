import React from 'react';
import CommentsItem from '../CommentsItem/CommentsItem'
import './CommentsList.css';



function CommentsList(props){
    const {items, onItemCompleted, onDeleteItem, activeUser} = props;

    return (
        <ul className="todolist">
          {items.map(item => (
            <CommentsItem key={item.id} id={item.id} text={item.text} completed={item.done} 
            onItemCompleted={onItemCompleted} onDeleteItem={onDeleteItem} activeUser={activeUser}
            fname={item.userFname} lname={item.userLname}/>
          ))}
        </ul>
      );
}

  export default CommentsList;