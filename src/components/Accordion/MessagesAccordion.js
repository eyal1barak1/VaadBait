import ReactDOM from 'react-dom'
import React from 'react'
import { Accordion, Card } from "react-bootstrap";
import "./MessagesAccordion.css"


function MessagesAccordion(props) {

    const { panels, updateMessage } = props;
    const unReadMsgSrc = "https://cdn3.iconfinder.com/data/icons/mailing-2/96/notification_unread_mail_message_96-512.png";
    const readMsgSrc = "https://icon-library.com/images/read-message-icon/read-message-icon-10.jpg";

    function SetStateOnClick(messageId, activeUserId) {
        updateMessage(messageId, activeUserId);
    }

    return (
        <Accordion variant="success">
            {panels.map((panel, index) =>
                <Card key={index}>
                    <Accordion.Toggle className="accordionHeader"
                        onClick={() => SetStateOnClick(panel.props.message.id, panel.props.activeUser.id)}
                        as={Card.Header} eventKey={index.toString()} >
                        {panel.props.message.title}
                        <img className="readImage" width="20" height="20"          
                            src={panel.props.message.isRead.includes(panel.props.activeUser.id) ? readMsgSrc : unReadMsgSrc} >
                        </img>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>{panel}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    )
}

export default MessagesAccordion;