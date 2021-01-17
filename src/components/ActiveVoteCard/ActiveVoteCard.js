import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import DateModal from "../DateModal/DateModal";
import PieChart from "../PieChart/PieChart";
import './ActiveVoteCard.css'


function ActiveVoteCard(props) {
    const { vote, activeUser, updateEndDate, AddUsersVote } = props;
    const [showDateModal, setShowDateModal] = useState(false);
    const [chosenOption, setChosenOption] = useState(vote.options[0]);
    let i = 0;

    var endDate = vote.endDate.substring(0, 16);
    endDate = endDate.replace("T", " ");


    let options = vote.options.map(option => <option key={i++}>{option}</option>)

    function handleUpdateEndDate(updatedEndDate) {
        updateEndDate(vote.id, updatedEndDate);
    }

    function handleVote() {
        AddUsersVote(chosenOption, vote.id, activeUser.id);
    }
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
                            <PieChart title="Results" vote={vote}/>
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
                                <Button variant="warning" onClick={handleVote}>Submit Vote</Button>
                                <div className="vote-end-date">
                                    <label>Vote end at: </label>
                                    <p>{endDate}</p>
                                </div>
                            </div>
                        </Col>
                    </Form.Group>
                </Form>
            }
            <DateModal show={showDateModal} handleClose={() => setShowDateModal(false)} handleUpdateEndDate={handleUpdateEndDate} />
        </div >
    );
}

export default ActiveVoteCard;