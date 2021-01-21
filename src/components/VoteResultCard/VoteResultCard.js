import {   Container,Col, Row } from "react-bootstrap";
import PieChart from "../PieChart/PieChart";
import './VoteResultCard.css'


function VoteResultCard(props) {
    const { vote } = props;

    // var endDate = vote.endDate.substring(0, 16);
    // endDate = endDate.replace("T", " ");
    var endDate = vote.endDate;

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
                        <PieChart title="Results" vote={vote} />
                    </Col>
                    <Col sm={4}>
                        <PieChart title="Voting Precentage" vote={vote} />
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default VoteResultCard;