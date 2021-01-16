import React from 'react';
import { Card } from 'react-bootstrap';
import "./HomePageCard.css"


function HomePageCard(props) {
    const { img, desc } = props;

    return (
        <Card className="c-home-page-card">
            <Card.Header>{desc}</Card.Header>
            <Card.Img variant="top" src={img} />
        </Card>
    );
}

export default HomePageCard;
