import { useState } from "react";
import { Button, Modal, Form, Col, Row, Image } from "react-bootstrap";


function NewRecipeModal(props) {
    const { show, handleClose, addRecipe } = props;
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [imgURL, setImgURL] = useState("");

    function closeModal() {
        setName("");
        setDesc("");
        setImgURL("");
        handleClose();
    }

    function handleAddRecipe() {
        // 1) triggers addRecipe at App that will then add this recipe to its recipes state
        addRecipe(name, desc, imgURL);

        // 2) cleanup (clean all field + close the modal)
        closeModal();
    }

    return (
        <Modal show={show} onHide={closeModal} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>New Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formHorizontalName">
                        <Form.Label column sm={2}>
                            Recipe Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Recipe Name" value={name} onChange={e => setName(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalDesc">
                        <Form.Label column sm={2}>
                            Recipe Description
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Recipe Description" value={desc} onChange={e => setDesc(e.target.value)}  />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalImage">
                        <Form.Label column sm={2}>
                            Recipe Image URL
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Recipe Image URL" value={imgURL} onChange={e => setImgURL(e.target.value)}  />
                        </Col>
                    </Form.Group>
                </Form>
                <Image src={imgURL}/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleAddRecipe}>
                    Create Recipe
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewRecipeModal;