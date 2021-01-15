import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import DateModal from "../DateModal/DateModal";
import PieChart from "../PieChart/PieChart";
import './VoteResultCard.css'


function VoteResultCard(props) {
    const { vote, activeUser } = props;

    var endDate = vote.endDate.substring(0, 16);
    endDate = endDate.replace("T", " ");

    const data = [
        { country: 'Russia', area: 12 },
        { country: 'Canada', area: 7 },
        { country: 'USA', area: 7 },
        { country: 'China', area: 7 },
        { country: 'Brazil', area: 6 },
        { country: 'Australia', area: 5 },
        { country: 'India', area: 2 },
        { country: 'Others', area: 55 },
    ];

    return (
        <div className="c-vote-card">
                <Container fluid>
                    <Row>
                        <Col >
                            <Row>
                                <div className="vote-details">
                                    <label>Details: </label>
                                    <p>{vote.details}</p>
                                </div>
                            </Row>
                            <Row>
                                <div className="vote-end-date">
                                    <label>End date: </label>
                                    <p>{endDate}</p>
                                </div>
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <PieChart data={data} title="Results"></PieChart>
                        </Col>
                        <Col sm={4}>
                            <PieChart data={data} title="Voting Precentage"></PieChart>
                        </Col>
                    </Row>
                </Container>
        </div >
    );
}

export default VoteResultCard;