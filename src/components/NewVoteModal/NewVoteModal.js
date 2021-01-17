import { useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import VoteOptions from "../VoteOptions/VoteOptions";


function NewVoteModal(props) {
    const { show, handleClose, addVote } = props;
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [options, setOptions] = useState([]);
    const [endDate, setEndDate] = useState(new Date());

    function closeModal() {
        setTitle("");
        setDetails("");
        setOptions([]);
        setEndDate("");
        handleClose();
    }

    function updateOptions(newOptions) {
        setOptions(newOptions);
    }

    function handleAddVote() {
        // 1) triggers addVote at App that will then add this vote to its votes state
        let date = new Date(endDate);
        let jsonStr = JSON.stringify(date);
        var dateStr = JSON.parse(jsonStr);  
        addVote(title, details, options, dateStr);

        // 2) cleanup (clean all field + close the modal)
        closeModal();
    }

    return (
        <Modal show={show} onHide={closeModal} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>New Vote</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalTitle">
                        <Form.Label column sm={2}>
                            Title:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Vote Title" value={title} onChange={e => setTitle(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDetails">
                        <Form.Label column sm={2}>
                            Details:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="textarea" rows={3} type="text" placeholder="Vote Details" value={details} onChange={e => setDetails(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalOptions">
                        <Form.Label column sm={2}>
                            Options:
                        </Form.Label>
                        <Col sm={10}>
                            <VoteOptions updateOptions={updateOptions}></VoteOptions>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalEndDate">
                        <Form.Label column sm={2}>
                            End Date:
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control type="date" onChange={e => setEndDate(e.target.value)}>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAddVote}>
                    Create Vote
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewVoteModal;