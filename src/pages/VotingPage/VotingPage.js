import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";

import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './VotingPage.css'
import NewVoteModal from "../../components/NewVoteModal/NewVoteModal";
import VotesAccordion from "../../components/Accordion/VotesAccordion";
import ActiveVoteCard from "../../components/ActiveVoteCard/ActiveVoteCard";
import VoteResultCard from "../../components/VoteResultCard/VoteResultCard"
import FilterContent from "../../components/FilterContent/FilterContent";
import VoteModel from "../../model/VoteModel";
import Parse from 'parse';

function VotingPage(props) {
    const { activeUser, onLogout } = props;
    const [showModal, setShowModal] = useState(false);
    const [filteredText, setFilteredText] = useState("");
    const [votings, setVotings] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const ParseVote = Parse.Object.extend('Vote');
            const query = new Parse.Query(ParseVote);
            query.equalTo("building", Parse.User.current().attributes.building);
            await query.find().then((results) => {
                setVotings(results.map(parseVote => new VoteModel(parseVote)));
            }, (error) => {
                console.error('Error while fetching Vote', error);
            });
        }
        if (activeUser) {
            fetchData()
        }
    }, [activeUser, votings])

    async function addVote(title, details, options, endDate) {

        const Vote = Parse.Object.extend('Vote');
        const myNewVote = new Vote();

        myNewVote.set('title', title);
        myNewVote.set('details', details);
        myNewVote.set('building', Parse.User.current().attributes.building);
        myNewVote.set('options', options);
        myNewVote.set('voteStatus', 'active');
        myNewVote.set('voteEndDate', endDate);
        myNewVote.set('result', '');
        myNewVote.set('votesPieData', {});
        var relation = myNewVote.relation("userId");
        relation.add(Parse.User.current());
        const parsVote = await myNewVote.save();
        setVotings(votings.concat(new VoteModel(parsVote)));
    }

    function AddUsersVote(chosenOption, voteId, userId) {
        const Vote = Parse.Object.extend('Vote');
        const query = new Parse.Query(Vote);
        // here you put the objectId that you want to update
        query.get(voteId).then((object) => {
            let pieObj = object.get("votesPieData");
            pieObj[userId] = chosenOption;
            object.set('votesPieData', pieObj);
            object.save().then((response) => {
                const found = votings.find(element => element.id === voteId);
                const index = votings.indexOf(found);
                votings[index].votesPieData[userId] = chosenOption;
                setVotings([...votings]);
            }, (error) => {
                console.error('Error while updating Vote', error);
            });
        });
    }

    // Check the end Date And Update Vote Status
    function CheckDateAndUpdateVoteStat(voteItem) {
        var now = new Date();
        let objEndDate = new Date(voteItem.endDate);
        let voteStatus = now >= objEndDate ? "not active" : "active";
        if (voteStatus !== voteItem.voteStatus) {
            const Vote = Parse.Object.extend('Vote');
            const query = new Parse.Query(Vote);
            query.get(voteItem.id).then((object) => {
                object.set('voteStatus', voteStatus);
                object.save().then((response) => {
                    voteItem.voteStatus = voteStatus;
                }, (error) => {
                    console.error('Error while updating Vote', error);
                });
            });
        }
    }

    votings.forEach(CheckDateAndUpdateVoteStat);


    function updateEndDate(voteId, updatedEndDate) {
        const Vote = Parse.Object.extend('Vote');
        const query = new Parse.Query(Vote);
        // here you put the objectId that you want to update
        query.get(voteId).then((object) => {
            object.set('voteEndDate', updatedEndDate);
            object.save().then((response) => {
                const found = votings.find(element => element.id === voteId);
                const index = votings.indexOf(found);
                votings[index].endDate = updatedEndDate.toString();
                setVotings([...votings]);
            }, (error) => {
                console.error('Error while updating Vote', error);
            });
        });
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }


    let filteredVotes = votings.filter(vote =>
        vote.title.toLowerCase().includes(filteredText.toLowerCase()) ||
        vote.details.toLowerCase().includes(filteredText.toLowerCase()));


    //Filter Only Active votes
    const activeVotes = votings.filter(vote => vote.voteStatus === "active");
    const activeVoteView = activeVotes.map(vote => <ActiveVoteCard vote={vote}
        activeUser={activeUser} updateEndDate={updateEndDate} AddUsersVote={AddUsersVote} />)

    //Filter Only NonActive votes
    const nonActiveVotes = filteredVotes.filter(vote => vote.voteStatus !== "active");
    const nonActiveVoteView = nonActiveVotes.map(vote => <VoteResultCard vote={vote} activeUser={activeUser} />)


    return (
        <div className="p-votes">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <Container fluid>
                <Row>
                    <Col className="block-example border-right border-dark" sm={6}>
                        <h1>Active Votings</h1>
                        <div className="b-new-vote" style={{ visibility: activeUser.role === "committee" ? "visible" : "hidden" }}>
                            <Button variant="link" onClick={() => setShowModal(true)}>New Vote</Button>
                        </div>
                        <VotesAccordion panels={activeVoteView} isResaultAccordion="false" />
                    </Col>
                    <Col sm={6}>
                        <h1>Voting Results</h1>
                        <FilterContent isMessagesPage={false} filteredText={filteredText} onFilterChange={e => setFilteredText(e.target.value)} />
                        <VotesAccordion panels={nonActiveVoteView} isResaultAccordion="true" />
                    </Col>
                </Row>
            </Container>
            <NewVoteModal show={showModal} handleClose={() => setShowModal(false)} addVote={addVote} />
        </div>
    )

}

export default VotingPage;