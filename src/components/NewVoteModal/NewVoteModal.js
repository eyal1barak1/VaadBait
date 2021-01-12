import { useState } from "react";
import { Button, Modal, Form, Col, Row, Image, DropdownButton, Dropdown } from "react-bootstrap";


function NewVoteModal(props) {
    const { show, handleClose, addVote } = props;
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [priority, SetPriority] = useState("Info");
    const [imgURL, setImgURL] = useState("");

    function closeModal() {
        setTitle("");
        setDetails("");
        setImgURL("");
        handleClose();
    }

    function handleAddMessage() {
        // 1) triggers addRecipe at App that will then add this recipe to its recipes state
        addVote(title, details, priority, imgURL);

        // 2) cleanup (clean all field + close the modal)
        closeModal();
    }

    return (
        <Modal show={show} onHide={closeModal} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>New Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalTitle">
                        <Form.Label column sm={2}>
                            Title
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Message Title" value={title} onChange={e => setTitle(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDetails">
                        <Form.Label column sm={2}>
                            Details
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="textarea" rows={3} type="text" placeholder="Message Details" value={details} onChange={e => setDetails(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPriority">
                        <Form.Label column sm={2}>
                            Priority
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" onChange={e => SetPriority(e.target.value)}>
                                <option selected> Info</option>
                                <option >Important</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>


                    <Form.Group as={Row} controlId="formHorizontalImage">
                        <Form.Label column sm={2}>
                            Image URL
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Control type="text" placeholder="Image URL" value={imgURL} onChange={e => setImgURL(e.target.value)} />
                        </Col>
                        <Col sm={2}>
                            <Image width="100" height="100" src={imgURL} />
                        </Col>
                    </Form.Group>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAddMessage}>
                    Create Message
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewVoteModal;