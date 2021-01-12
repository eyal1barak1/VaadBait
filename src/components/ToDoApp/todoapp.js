import React from 'react';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import TodoList from '../ToDoList/todolist'
import './todoapp.css';


function TodoApp() {

  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
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
      done: false
    };

    setItems(items.concat(newItem));
    setAllItems(allitems.concat(newItem));
    setText("");

  }
  function markItemCompleted(itemId) {
    var updatedItems = items.map(item => {
      if (itemId === item.id)
        item.done = !item.done;

      return item;
    });

    // State Updates are Merged
    setItems([].concat(updatedItems));

  }
  function handleDeleteItem(itemId) {
    var updatedItems = allitems.filter(item => {
      return item.id !== itemId;
    });

    setAllItems([].concat(updatedItems));
    setItems([].concat(updatedItems));

  }

  function filterAll() {
    setItems([].concat(allitems));
  }

  function filterActive() {
    var updatedItems = allitems.filter(item => {
      return item.done === false;
    });

    setItems([].concat(updatedItems));
  }
  function filterCompleted() {
    var updatedItems = allitems.filter(item => {
      return item.done === true;
    });

    setItems([].concat(updatedItems));
  }

  return (
    <div>
      <h3>Comments:</h3>
      
      <div className="row">
        <div className="col-md-4">
          <TodoList items={items} onItemCompleted={markItemCompleted} onDeleteItem={handleDeleteItem} />
        </div>
      </div>
      <form className="row"> 
        <div>
          <input type="text" className="form-control" onChange={handleTextChange} value={text} />
        </div>
        <div >
          <button className="add-btn btn btn-primary" style={{ visibility: "hidden" }} onClick={handleAddItem}></button>
        </div>
      </form>

    </div>
  )
}

export default TodoApp;