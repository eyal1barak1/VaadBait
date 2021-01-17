import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import DateModal from "../DateModal/DateModal";
import PieChart from "../PieChart/PieChart";
import './VoteResultCard.css'


function VoteResultCard(props) {
    const { vote, activeUser, votesPieData } = props;

    var endDate = vote.endDate.substring(0, 16);
    endDate = endDate.replace("T", " ");

    console.log(votesPieData);

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
                        <PieChart data={votesPieData} title="Results" vote={vote} />
                    </Col>
                    <Col sm={4}>
                        <PieChart data={votesPieData} title="Voting Precentage" vote={vote} />
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default VoteResultCard;