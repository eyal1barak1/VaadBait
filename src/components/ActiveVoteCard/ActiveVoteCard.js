import { Button, Col, Container, Form, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { useState } from "react";
import DateModal from "../DateModal/DateModal";
import PieChart from "../PieChart/PieChart";
import './ActiveVoteCard.css'
import Timer from '../Timer/Timer'



function ActiveVoteCard(props) {
    const { vote, activeUser, updateEndDate, AddUsersVote } = props;
    const [showDateModal, setShowDateModal] = useState(false);
    const [chosenOption, setChosenOption] = useState(vote.options[0]);
    const [showPopover, setShowpopover] = useState(false);
    let i = 0;

    // var endDate = vote.endDate.substring(0, 16);
    // endDate = endDate.replace("T", " ");
    var endDate = vote.endDate;

    let options = vote.options.map(option => <option key={i++}>{option}</option>)

    function handleUpdateEndDate(updatedEndDate) {
        updateEndDate(vote.id, updatedEndDate);
    }

    function handleVote() {
        setShowpopover(true);
        setTimeout(function(){ setShowpopover(false);; }, 2000);
        AddUsersVote(chosenOption, vote.id, activeUser.id);
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Thank you for your vote</Popover.Title>
            <Popover.Content>
                results will be available at <strong>{endDate}</strong>
            </Popover.Content>
        </Popover>
    );

    return (
        <div className="c-vote-card">
            {activeUser.role === "committee" ?
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
                                <Button className="b-update" variant="warning" onClick={() => setShowDateModal(true)}>Update End Date</Button>
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <PieChart title="Results" vote={vote} />
                        </Col>
                    </Row>
                </Container>
                :
                <Form>
                    <Form.Group as={Row} controlId={"formHorizontalVote" + i + vote.title}>
                        <Form.Label column sm={2}>
                            Your Vote:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" onChange={e => setChosenOption(e.target.value)}>
                                {options}
                            </Form.Control>
                            <div className="vote-button">
                                <OverlayTrigger trigger="click" placement="right"  show={showPopover} overlay={popover}>
                                    <Button variant="warning" onClick={handleVote}>Submit Vote</Button>
                                </OverlayTrigger>
                                <div className="vote-end-date">
                                    <label>Vote ends in: </label>
                                    <Timer endDate={new Date(endDate)} />
                                    <label> Ends date: </label>
                                    <p>{endDate}</p>
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            }
            {showDateModal ? <DateModal show={showDateModal} handleClose={() => setShowDateModal(false)} handleUpdateEndDate={handleUpdateEndDate} /> : null}
        </div >
    );
}

export default ActiveVoteCard;