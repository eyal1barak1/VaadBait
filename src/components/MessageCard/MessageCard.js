import { Col, Container, Form, Row } from "react-bootstrap";
import TodoApp from '../ToDoApp/todoapp'
import './MessageCard.css'


function MessageCard(props) {
    const { message } = props;
    return (
        <div className="c-message-card">
            <Container fluid>
                <Row>
                    <Col sm={8}>
                        <Row>
                            <Col sm={2}>
                                <img width="100" height="100" src={message.img} ></img>
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
                    <Col sm={4}>
                        <TodoApp></TodoApp>
                    </Col>
                </Row>
            </Container>

        </div>
    );
}

export default MessageCard;