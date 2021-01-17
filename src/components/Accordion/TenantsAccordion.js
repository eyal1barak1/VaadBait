import React from 'react'
import { Accordion, Card } from "react-bootstrap";
import './TenantsAccordion.css'

function TenantsAccordion(props) {

    const { panels } = props;

    return (
        <Accordion>
            {panels.map((panel, index) =>
                <Card key={index}>
                    <Accordion.Toggle className="accordionHeader" as={Card.Header} eventKey={index.toString()} >
                        <div>{panel.props.tenant.fname + " " + panel.props.tenant.lname}</div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>{panel}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    )
}

export default TenantsAccordion;