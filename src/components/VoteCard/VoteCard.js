import { Card } from "react-bootstrap";
import './VoteCard.css'


function VoteCard(props) {
    const { vote } = props;
    return (
        <div className="c-vote-card">
            <Card>
                <Card.Img variant="top" src={vote.img} />
                <Card.Body>
                    <Card.Title>{vote.name}</Card.Title>
                    <Card.Text>{vote.desc}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default VoteCard;