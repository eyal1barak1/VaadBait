import { Button, Col, Container, Row } from "react-bootstrap";
import CommentsApp from '../CommentsApp/CommentsApp'
import './VoteResultCard.css'


function VoteResultCard(props) {
    const { message, addMessageItems, message_items, removeMessage, activeUser} = props;

    function removeMessageById() {
        removeMessage(message.id);
    }
    return (
        <div className="c-message-card">
            <Container fluid>
                <Row>
                    <Col sm={4}>
                        <Row>
                            <Col sm={2}>
                                <img className="message-image" src={message.img} ></img>
                            </Col>
                            <Col sm={10}>
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
                    <Col sm={6}>
                        <CommentsApp message={message} message_items={message_items} 
                        addMessageItems={addMessageItems} activeUser={activeUser}></CommentsApp>
                    </Col>
                    <Col style={{ visibility:  activeUser.role === "committee" ? "visible" : "hidden"}} 
                    className="message-card-buttons" sm={2}>
                        <Button className="b-update" variant="info">Update</Button>
                        <Button onClick={removeMessageById} className="b-delete" variant="danger">Delete</Button>
                    </Col>
                </Row>
            </Container>

        </div >
    );
}

export default VoteResultCard;