import { Button, Col, Container, Row } from "react-bootstrap";
import PieChart from "../PieChart/PieChart";
import './ActiveVoteCard.css'


function ActiveVoteCard(props) {
    const { vote, addVoteItems, vote_items, activeUser } = props;

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

    var endDate = vote.endDate.substring(0, 16);
    endDate = endDate.replace("T", " ");
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
                                    <Button className="b-update" variant="warning">Update End Date</Button>       
                            </Row>
                        </Col>
                        <Col sm={6}>
                            <PieChart data={data}></PieChart>
                        </Col>
                    </Row>
                </Container>
                : <p>hello</p>}
        </div >
    );
}

export default ActiveVoteCard;