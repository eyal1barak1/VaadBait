import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewMessageModal from "../../components/NewMessageModal/NewMessageModal";
import MessageCard from "../../components/MessageCard/MessageCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './MessagesPage.css'
import MessagesAccordion from "../../components/Accordion/MessagesAccordion";
import FilterContent from "../../components/FilterContent/FilterContent";
import Parse from 'parse';
import MessageModel from "../../model/MessageModel";

function MessagesPage(props) {
    const { activeUser, onLogout, message_items, addMessageItems,
        updateMessage, SortMessages, removeMessage, updateMessageContent } = props;
    const [showModal, setShowModal] = useState(false);
    const [filteredText, setFilteredText] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [messages, setMessages] = useState([]);
    let filteredMessages = messages.filter(message =>
        message.title.toLowerCase().includes(filteredText.toLowerCase()) ||
        message.details.toLowerCase().includes(filteredText.toLowerCase()));


    useEffect(() => {
        async function fetchData() {
            const ParseMessage = Parse.Object.extend('Message');
            const query = new Parse.Query(ParseMessage);
            // console.log(Parse.User.current().attributes.building);
            query.equalTo("userId", Parse.User.current());
            const parseMessages = await query.find();
            setMessages(parseMessages.map(parseMessage => new MessageModel(parseMessage)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])

    async function addMessage(title, details, priority, img) {
        const ParseMessage = Parse.Object.extend('Message');
        const newMessage = new ParseMessage();

        newMessage.set('title', title);
        newMessage.set('details', details);
        newMessage.set('img', img);
        newMessage.set('priority', priority);
        newMessage.set('date', new Date().toString());
        newMessage.set('isRead', []);
        newMessage.set('building', Parse.User.current().attributes.building);

        var user = Parse.User.current();
        var relation = user.relation('userId');
        relation.add(Parse.User.current()); // Post is a Parse Object
        
        // newMessage.set('userId', relation);

        const parseMessage = await newMessage.save();
        setMessages(messages.concat(new MessageModel(parseMessage)));
    }

    function updateMessage2(messageId, activeUserId) {
        const found = messages.find(element => element.id === messageId);
        const index = messages.indexOf(found);
        if (index > -1) {
            messages[index].isRead.push(activeUserId);
            setMessages([...messages]);
        }
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }

    function FilterPriority(eventKey, event) {
        if (event.target.innerHTML === "No Filter") {
            setPriorityFilter("");
        }
        else {
            setPriorityFilter(event.target.innerHTML);
        }

    }

    filteredMessages = filteredMessages.filter(message =>
        message.priority.toLowerCase().includes(priorityFilter.toLowerCase()));



    const messagesView = filteredMessages.map(message => <MessageCard message={message} message_items={message_items}
        addMessageItems={addMessageItems}
        removeMessage={removeMessage} activeUser={activeUser} updateMessageContent={updateMessageContent} />)

    return (
        <div className="p-messages">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <FilterContent isMessagesPage={true} filteredText={filteredText} onFilterChange={e => setFilteredText(e.target.value)}
                priorityFilter={priorityFilter} FilterPriority={FilterPriority} Sort={SortMessages} />
            <div className="b-new-message" style={{ visibility: activeUser.role === "committee" ? "visible" : "hidden" }}>
                <Button variant="link" onClick={() => setShowModal(true)}>New Message</Button>
            </div>
            <MessagesAccordion panels={messagesView} updateMessage={updateMessage} />
            <NewMessageModal isUpdate="false" show={showModal} handleClose={() => setShowModal(false)} addMessage={addMessage} />
        </div>
    )

}

export default MessagesPage;