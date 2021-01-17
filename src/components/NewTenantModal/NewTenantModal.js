import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";


function NewTenantModal(props) {
    const { show, handleClose, addTenant, userId, isUpdate, updateTenantContent } = props;
    const [email, setEmail] = useState("eyal@barak.com");
    const [pwd, setPwd] = useState("123");
    const [fname, setfname] = useState("Eyal");
    const [lname, setlname] = useState("Barak");
    const [building, setBuilding] = useState("Einstein");

    function closeModal() {
        setEmail("");
        setPwd("");
        setfname([]);
        setlname("");
        setBuilding("");
        handleClose();
    }

    function handleAddTennant() {
        const newCommittee = {
            id: Date.now(),
            fname,
            lname,
            email,
            pwd,
            role: "tenant",
            building,
        }

        addTenant(newCommittee);

        // 2) cleanup (clean all field + close the modal)
        closeModal();
    }


    function handleUpdateTenant() {
        updateTenantContent(fname, lname, email, building, pwd, userId);

        closeModal();
    }

    return (
        <Modal show={show} onHide={closeModal} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Create a Committee Member Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formBasicfname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" value={fname} onChange={e => setfname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasiclname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={lname} onChange={e => setlname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicbuilding">
                        <Form.Label>Building/Condomium Community Name</Form.Label>
                        <Form.Control type="text" placeholder="Building/Condomium Community Name" value={building} onChange={e => setBuilding(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <div>
                {isUpdate === "true" ?
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