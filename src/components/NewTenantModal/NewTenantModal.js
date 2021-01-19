import { useState } from "react";
import { Button, Modal, Form, Col, Image, Row } from "react-bootstrap";
import Parse from 'parse';
import UserModel from "../../model/UserModel";

function NewTenantModal(props) {
    const { show, handleClose, addTenant, userId, tenants, isUpdate, updateTenantContent } = props;
    const [email, setEmail] = useState("eyal@barak.com");
    const [pwd, setPwd] = useState("123");
    const [fname, setfname] = useState("Eyal");
    const [lname, setlname] = useState("Barak");
    const [building, setBuilding] = useState("Einstein");
    const [img, setImg] = useState("");
    const placeHolderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tJDcJYnlhTCuciLukYiHdpeS9XL5wGGHSg&usqp=CAU";


    function closeModal() {
        setEmail("");
        setPwd("");
        setfname([]);
        setlname("");
        setBuilding("");
        setImg("");
        handleClose();
    }

    function handleAddTennant() {

        const user = new Parse.User();
        user.set('username', fname);
        user.set('email', email);
        user.set('fname', fname);
        user.set('lname', lname);
        user.set('building', building);
        user.set('img', img);
        user.set('role', "tenant");
        user.set('password', pwd);
        var sessionToken = Parse.User.current().get("sessionToken");
        
        user.signUp().then((user) => {
            // This lines enable read and write for the added tenat
            var userACL = new Parse.ACL(user);
               userACL.setPublicWriteAccess(true);
               userACL.setPublicReadAccess(true);
               user.setACL(userACL);
               user.save();
            Parse.User.become(sessionToken).then(function (user) {
                // The current user is now set to user.
            }, function (error) {
                // The token could not be validated.
            });
            addTenant(tenants.concat(new UserModel(user)));
            console.log('User signed up', user);
        }).catch(error => {
            console.error('Error while signing up user', error);
        });
        
        // 2) cleanup (clean all field + close the modal)
        closeModal();
    }


    function handleUpdateTenant() {
        updateTenantContent(fname, lname, email, building, pwd, img, userId);

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
                    <Form.Group controlId="formHorizontalImage">
                        <Form.Label>
                            Image URL
                        </Form.Label>
                        <Row>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Image URL" value={img} onChange={e => setImg(e.target.value)} />
                            </Col>
                            <Col sm={2}>
                                <Image width="100" height="100" src={img === "" ? placeHolderImage : img} />
                            </Col>
                        </Row>
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