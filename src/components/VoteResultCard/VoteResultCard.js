import { Col, Container, Row } from "react-bootstrap";
import PieChart from "../PieChart/PieChart";
import './VoteResultCard.css';


function VoteResultCard(props) {
    const { vote } = props;

    var endDate = formatDate(vote.endDate);

    function formatDate(endDate) {
        var d = new Date(endDate),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            hour = '' + d.getHours(),
            minutes = '' + d.getMinutes();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (minutes.length < 2)
            minutes = '0' + minutes;

        return `${day}-${month}-${year}  ${hour}:${minutes}`;
    }

    return (
        <div className="c-vote-card">
            <Container fluid>
                <Col >
                    <Row>
                        <div className="vote-details">
                            <label>Details:</label>
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
                <Row>
                    <Col >
                        <PieChart title="Results" vote={vote} />
                    </Col>
                    <Col >
                        <PieChart title="Voting Precentage" vote={vote} />
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default VoteResultCard;