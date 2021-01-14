import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewMessageModal from "../../components/NewMessageModal/NewMessageModal";
import MessageCard from "../../components/MessageCard/MessageCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './MessagesPage.css'
import CustomAccordion from "../../components/Accordion/Accordion";
import FilterMessage from "../../components/FilterMessage/FilterMessage";

function MessagesPage(props) {
    const { activeUser, onLogout, messages, addMessage, message_items, addMessageItems,
        updateMessage, SortMsg, removeMessage } = props;
    const [messagesData, setMessagesData] = useState(messages);
    const [showModal, setShowModal] = useState(false);
    const [filteredMessages, setFilterdMessages] = useState([]);

    if (messages !== messagesData) {
        setMessagesData(messages);
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }



    function filterMessages(filteredMessagesVar) {
        setFilterdMessages(filteredMessagesVar);
    }



    const messagesView = filteredMessages.map(message => <MessageCard message={message} message_items={message_items}
        addMessageItems={addMessageItems} removeMessage={removeMessage} activeUser={activeUser}/>)

    return (
        <div className="p-messages">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <FilterMessage messages={messagesData} filterMessages={filterMessages}
                SortMsg={SortMsg}>
            </FilterMessage>
            <div className="b-new-message" style={{ visibility:  activeUser.role === "committee" ? "visible" : "hidden"}}>
                <Button variant="link" onClick={() => setShowModal(true)}>New Message</Button>
            </div>
            <CustomAccordion panels={messagesView} updateMessage={updateMessage}></CustomAccordion>
            <NewMessageModal show={showModal} handleClose={() => setShowModal(false)} addMessage={addMessage} />
        </div>
    )

}

export default MessagesPage;