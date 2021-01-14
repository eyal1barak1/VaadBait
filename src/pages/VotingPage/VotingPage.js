import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewRecipeModal from "../../components/NewMessageModal/NewMessageModal";
import VoteCard from "../../components/VoteCard/VoteCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './VotingPage.css'
import NewVoteModal from "../../components/NewVoteModal/NewVoteModal";
import VotesAccordion from "../../components/Accordion/VotesAccordion";

function VotingPage(props) {
    const { activeUser, onLogout, votings, addVote, updateVote } = props;
    const [showModal, setShowModal] = useState(false);
    const [votesData, setvotesData] = useState(votings);
    const [filteredVotings, setFilterdVotings] = useState([]);

    if (votings !== votesData) {
        setvotesData(votings);
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }

    function filterVotings(filteredVotingsVar) {
        setFilterdVotings(filteredVotingsVar);
    }



    const voteView = votings.map(vote => <VoteCard vote={vote} />)

    return (
        <div className="p-votes">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <Container fluid>
                <Row>
                    <Col className="block-example border-right border-dark">
                        <h1>Active Votings</h1>
                        <div className="b-new-vote" style={{ visibility: activeUser.role === "committee" ? "visible" : "hidden" }}>
                            <Button variant="link" onClick={() => setShowModal(true)}>New Vote</Button>
                        </div>
                        <VotesAccordion panels={voteView} updateVote={updateVote} />
                    </Col>
                    <Col>
                        <h1>Voting Results</h1>
                        {/* <FilterMessage votes={votesData} filterVotings={filterVotings}
                            SortMsg={SortMsg}>
                        </FilterMessage> */}
                    </Col>
                </Row>
            </Container>
            <NewVoteModal show={showModal} handleClose={() => setShowModal(false)} addVote={addVote} />
        </div>
    )

}

export default VotingPage;