import { useState } from "react";
import { Button, Modal, Form, Col, Image, Row } from "react-bootstrap";
import './NewTenantModal.css'

function NewTenantModal(props) {
    const { show, handleClose, addTenant, userId, isUpdate, updateTenantContent, phImg, buildingName } = props;
    const [email, setEmail] = useState("eyal@barak.com");
    const [pwd, setPwd] = useState("123");
    const [fname, setfname] = useState("Eyal");
    const [lname, setlname] = useState("Barak");
    const [building, setBuilding] = useState(buildingName);
    const [img, setImg] = useState("");
    const placeHolderImage = typeof phImg === 'undefined' ? "" : phImg.img.url();


    function closeModal() {
        setEmail("");
        setPwd("");
        setfname([]);
        setlname("");
        setImg("");
        handleClose();
    }

    function handleAddTennant() {

        // 2) cleanup (clean all field + close the modal)
        addTenant(fname, email, lname, buildingName, img, pwd);
        closeModal();
    }


    function handleUpdateTenant() {
        updateTenantContent(fname, lname, email, buildingName, pwd, img, userId);

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
                <Modal.Title>{isUpdate ? "Update Tenats Details" : "Create New Tenant"} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formBasicfname">
                        <Form.Label column sm={2}>
                            First Name:
                            </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Enter first name" value={fname} onChange={e => setfname(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formBasiclname">
                        <Form.Label column sm={2}>Last Name:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Enter last name" value={lname} onChange={e => setlname(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicEmail">
                        <Form.Label column sm={2}>Email address:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicPassword">
                        <Form.Label column sm={2}>Password:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formBasicbuilding">
                        <Form.Label column sm={2}>Building Name:</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" placeholder="Building/Condomium Community Name" value={buildingName} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formHorizontalImage">
                        <Form.Label column sm={2}>
                            Image URL:
                        </Form.Label>
                        <Col sm={5}>
                            <Form.Control className="chooseFile" type="file" accept="image/*" onChange={handleFileChange} />
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
                        <Button variant="primary" onClick={handleUpdateTenant}>
                            Update Tenant
                        </Button>
                    </Modal.Footer>
                    :
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddTennant}>
                            Add Tenant
                    </  Button>
                    </Modal.Footer>}
            </div>
        </Modal>
    );
}

export default NewTenantModal;