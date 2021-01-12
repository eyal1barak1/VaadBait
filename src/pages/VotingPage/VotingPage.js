import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewRecipeModal from "../../components/NewMessageModal/NewMessageModal";
import VoteCard from "../../components/VoteCard/VoteCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './VotingPage.css'
import NewVoteModal from "../../components/NewVoteModal/NewVoteModal";

function VotingPage(props) {
    const {activeUser, onLogout, votings, addVote} = props;
    const [showModal, setShowModal] = useState(false);

    if (!activeUser) {
        return <Redirect to="/"/>
    }



    const voteView = votings.map(vote => <Col key={vote.id} lg={3} md={6}><VoteCard vote={vote}/></Col>)

    return (
        <div className="p-votes">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout}/>
            <Container>
                <div className="heading">
                    <h1>{activeUser.fname}'s Recipes</h1>
                    <Button variant="link" onClick={() => setShowModal(true)}>New Vote</Button>
                </div>
                <Row>
                    {voteView}
                </Row>
            </Container>
            <NewVoteModal show={showModal} handleClose={() => setShowModal(false)} addVote={addVote}/>
        </div>
    )

}

export default VotingPage;