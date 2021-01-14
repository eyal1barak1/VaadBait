import React from 'react'
import { Accordion, Card } from "react-bootstrap";
import './VotesAccordion.css'

function VotesAccordion(props) {

    const { panels, updateVotes } = props;

    return (
        <Accordion variant="success">
            {panels.map((panel, index) =>
                <Card key={index}>
                    <Accordion.Toggle className="accordionHeader" as={Card.Header} eventKey={index.toString()} >
                        {panel.props.vote.title}
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