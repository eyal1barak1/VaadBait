import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import CommentsApp from '../CommentsApp/CommentsApp'
import NewMessageModal from "../NewMessageModal/NewMessageModal";
import './MessageCard.css'


function MessageCard(props) {
    const { message, addMessageItems, message_items, removeMessage, activeUser, updateMessageContent } = props;
    const [showModal, setShowModal] = useState(false);
    const placeHolderImage = "https://cdn3.iconfinder.com/data/icons/ui-thick-outline-5-of-5/100/ui_09_of_10_-14-512.png";

    function removeMessageById() {
        removeMessage(message.id);
    }
    return (
        <div className="c-message-card">
            <Container fluid>
                <Row>
                    <Col sm={6}>
                        <Row>
                            <Col sm={5}>
                                <img alt="messageImg" className="message-image" src={message.img === "" ? placeHolderImage : message.img} ></img>
                            </Col>
                            <Col sm={7}>
                                <div className="message-details">
                                    <label>Details: </label>
                                    <p>{message.details}</p>
                                </div>

                                <div className="message-priority">
                                    <label>Priority: </label>
                                    <p>{message.priority}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <CommentsApp message={message} message_items={message_items}
                            addMessageItems={addMessageItems} activeUser={activeUser}></CommentsApp>
                    </Col>
                    <Col style={{ visibility: activeUser.role === "committee" ? "visible" : "hidden" }}
                        className="message-card-buttons" sm={2}>
                        {/* <Button>hello</Button>
                        <Button>hello</Button> */}
                        <Button className="b-update-button" variant="info" onClick={() => setShowModal(true)}>Update</Button>
                        <Button onClick={removeMessageById} className="b-delete-button" variant="danger">Delete</Button>
                    </Col>
                </Row>
            </Container>
            <NewMessageModal isUpdate="true" show={showModal} handleClose={() => setShowModal(false)}
                updateMessageContent={updateMessageContent} messageId={message.id} />

        </div >
    );
}

export default MessageCard;