import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './VotingPage.css'
import NewVoteModal from "../../components/NewVoteModal/NewVoteModal";
import VotesAccordion from "../../components/Accordion/VotesAccordion";
import ActiveVoteCard from "../../components/ActiveVoteCard/ActiveVoteCard";

function VotingPage(props) {
    const { activeUser, onLogout, votings, addVote, updateVote, addVoteItems, vote_items } = props;
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



    const activeVoteView = votings.map(vote => <ActiveVoteCard vote={vote} addVoteItems={addVoteItems}
        vote_items={vote_items} activeUser={activeUser}/>)

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
                        <VotesAccordion panels={activeVoteView} updateVote={updateVote} />
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