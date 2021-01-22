import { useState } from "react";
import { Button, Modal, Form, Col, Row, Image } from "react-bootstrap";
// import messagePlaceHolder from '../../images/messagePlaceholder.png'


function NewMessageModal(props) {
    const { show, handleClose, addMessage, isUpdate, messageId, updateMessageContent } = props;
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [priority, SetPriority] = useState("Info");
    const [img, setImg] = useState("");
    const placeHolderImage = "https://www.arde.co.il/wp-content/uploads/2014/06/default-placeholder.png";

    function closeModal() {
        setTitle("");
        setDetails("");
        setImg("");
        handleClose();
    }

    function handleAddMessage() {
        // 1) triggers addMessage at App that will then add this message to its messages state
        addMessage(title, details, priority, img);

        // 2) cleanup (clean all field + close the modal)
        closeModal();
    }

    function handleUpdateMessage() {
        updateMessageContent(title, details, priority, img, messageId);

        closeModal();
    }

    function handleFileChange(e) {
        if (e.target.files.length === 1) {
            setImg(e.target.files[0]);
        } else {
            setImg(null);
        }
    }

    const imgURL = img ? URL.createObjectURL(img) : "";

    return (
        <Modal show={show} onHide={closeModal} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>{isUpdate ? "Update Message" : "Create New Message"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalTitle">
                        <Form.Label column sm={2}>
                            Title:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Message Title" value={title} onChange={e => setTitle(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDetails">
                        <Form.Label column sm={2}>
                            Details:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="textarea" rows={3} type="text" placeholder="Message Details" value={details} onChange={e => setDetails(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPriority">
                        <Form.Label column sm={2}>
                            Priority:
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" onChange={e => SetPriority(e.target.value)}>
                                <option > Info</option>
                                <option >Important</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalImage">
                        <Form.Label column sm={2}>
                            Image URL:
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                        </Col>
                        <Col sm={5}>
                            <Image width="200" height="200" src={imgURL === "" ? placeHolderImage : imgURL} />
                        </Col>
                    </Form.Group>
                </Form>

            </Modal.Body>
            <div>
                {isUpdate ?
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleUpdateMessage}>
                            Update Message
                        </Button>
                    </Modal.Footer>
                    :
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddMessage}>
                            Create Message
                    </  Button>
                    </Modal.Footer>}
            </div>
        </Modal>
    );
}

export default NewMessageModal;