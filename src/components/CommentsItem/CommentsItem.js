import React from 'react';
import { useEffect } from 'react';
import './CommentsItem.css';

function CommentsItem(props) {

    const { id, onItemCompleted, onDeleteItem, completed, text, activeUser, fname, lname } = props;
    var itemClass = "form-check todoitem " + (completed ? "done" : "undone");
    var added_item;
    
    function markCompleted(event) {
        onItemCompleted(id);
    }
    function deleteItem(event) {
        onDeleteItem(id);
    }

    useEffect(() => {
        if (added_item) {
            // 1. Add highlight class.
            added_item.classList.add("highlight");

            // 2. Set timeout.
            setTimeout((listItem) => {
                // 3. Remove highlight class.
                listItem.classList.remove("highlight");
            }, 500, added_item);
        }
    }, []);

    return (
        <li className={itemClass} ref={li => added_item = li}>
            <label className="form-check-label">
                 {fname + " " + lname + ": " + text}
            </label>
        </li>
    )
}

export default CommentsItem;