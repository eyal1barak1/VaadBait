import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './VotingPage.css'
import NewVoteModal from "../../components/NewVoteModal/NewVoteModal";
import VotesAccordion from "../../components/Accordion/VotesAccordion";
import ActiveVoteCard from "../../components/ActiveVoteCard/ActiveVoteCard";
import VoteResultCard from "../../components/VoteResultCard/VoteResultCard"
import VoteResultFilter from "../../components/VoteResultFilter/VoteResultFilter";

function VotingPage(props) {
    const { activeUser, onLogout, votings, addVote,
        addVoteItems, vote_items, updateEndDate, AddUsersVote } = props;
    const [showModal, setShowModal] = useState(false);
    const [votesData, setvotesData] = useState(votings);
    const [filteredVotings, setFilterdVotings] = useState([]);
    const [reRender, setReRender] = useState(false);

    if (votings !== votesData) {
        setvotesData(votings);
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }

    function filterVotings(filteredVotingsVar) {
        setFilterdVotings(filteredVotingsVar);
    }

    //Filter Only Active votes
    const activeVotes = votings.filter(vote => vote.voteStatus === "active");
    const activeVoteView = activeVotes.map(vote => <ActiveVoteCard vote={vote} addVoteItems={addVoteItems}
        vote_items={vote_items} activeUser={activeUser} updateEndDate={updateEndDate} AddUsersVote={AddUsersVote} />)

    //Filter Only NonActive votes
    const nonActiveVotes = filteredVotings.filter(vote => vote.voteStatus !== "active");
    const nonActiveVoteView = nonActiveVotes.map(vote => <VoteResultCard vote={vote} activeUser={activeUser}/>)


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
                        <VotesAccordion panels={activeVoteView} isResaultAccordion="false" />
                    </Col>
                    <Col>
                        <h1>Voting Results</h1>
                        <VoteResultFilter votes={votesData} filterVotings={filterVotings} />
                        <VotesAccordion panels={nonActiveVoteView} isResaultAccordion="true" />
                    </Col>
                </Row>
            </Container>
            <NewVoteModal show={showModal} handleClose={() => setShowModal(false)} addVote={addVote} />
        </div>
    )

}

export default VotingPage;