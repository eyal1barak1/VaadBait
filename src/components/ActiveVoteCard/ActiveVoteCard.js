import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState } from "react";
import DateModal from "../DateModal/DateModal";
import PieChart from "../PieChart/PieChart";
import './ActiveVoteCard.css'


function ActiveVoteCard(props) {
    const { vote, addVoteItems, vote_items, activeUser, updateEndDate } = props;
    const [showDateModal, setShowDateModal] = useState(false);
    const [chosenOption, setChosenOption] = useState("");

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

    let options = vote.options.map(option => <option>{option}</option>)

    function handleUpdateEndDate(updatedEndDate) {
        updateEndDate(vote.id, updatedEndDate);
    }

    function handleVote() {

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
                            <PieChart data={data}></PieChart>
                        </Col>
                    </Row>
                </Container>
                :
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalPriority">
                        <Form.Label column sm={2}>
                            Your Vote:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" onChange={e => setChosenOption(e.target.value)}>
                                {options}
                            </Form.Control>
                            <div className="vote-button">
                                <Button variant="warning" onClick={handleVote}>Submit Vote</Button>
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