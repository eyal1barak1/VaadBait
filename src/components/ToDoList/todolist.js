import React from 'react';
import ToDoItem from '../ToDoItem/todoitem'
import './todolist.css';



function TodoList(props){
    const {items, onItemCompleted, onDeleteItem, activeUser} = props;

    return (
        <ul className="todolist">
          {items.map(item => (
            <ToDoItem key={item.id} id={item.id} text={item.text} completed={item.done} 
            onItemCompleted={onItemCompleted} onDeleteItem={onDeleteItem} activeUser={activeUser}/>
          ))}
        </ul>
      );
}

  export default TodoList;