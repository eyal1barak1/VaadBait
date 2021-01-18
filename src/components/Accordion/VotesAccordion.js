import React from 'react'
import { Accordion, Card, Col, Row } from "react-bootstrap";
import './VotesAccordion.css'

function VotesAccordion(props) {

    const { panels, isResaultAccordion } = props;
    
    return (
        <Accordion>
            {panels.map((panel, index) =>
                <Card key={index}>
                    <Accordion.Toggle className="accordionHeader" as={Card.Header} eventKey={index.toString()} >
                        {isResaultAccordion === "true" ?
                            <Row>
                                <Col sm={9} className="accordion-header-title">{panel.props.vote.title}</Col>
                                <Col sm={3} className="accordion-header-result">{"Result: " + panel.props.vote.result}</Col>
                            </Row>
                            :
                            <div>{panel.props.vote.title}</div>
                        }
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>{panel}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    )
}

export default VotesAccordion;