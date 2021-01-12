import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewMessageModal from "../../components/NewMessageModal/NewMessageModal";
import MessageCard from "../../components/MessageCard/MessageCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './MessagesPage.css'
import CustomAccordion from "../../components/Accordion/Accordion";
import FilterMessage from "../../components/FilterMessage/FilterMessage";

function MessagesPage(props) {
    const { activeUser, onLogout, messages, addMessage } = props;
    const [showModal, setShowModal] = useState(false);

    if (!activeUser) {
        return <Redirect to="/" />
    }


    const messagesView = messages.map(message => <MessageCard message={message} />)

    return (
        <div className="p-messages">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <FilterMessage></FilterMessage>
            <div className="b-new-message"><Button variant="link" onClick={() => setShowModal(true)}>New Message</Button></div>
            <CustomAccordion panels={messagesView}></CustomAccordion>
            <NewMessageModal show={showModal} handleClose={() => setShowModal(false)} addMessage={addMessage} />
        </div>
    )

}

export default MessagesPage;