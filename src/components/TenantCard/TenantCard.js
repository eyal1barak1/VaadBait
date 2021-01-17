import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import NewTenantModal from "../../components/NewTenantModal/NewTenantModal";
import './TenantCard.css'


function TenantCard(props) {
    const { tenant, removeTenant, activeUser, updateTenantContent} = props;
    const [showModal, setShowModal] = useState(false);

    function removeTenantById() {
        removeTenant(tenant.id);
    }
    return (
        <div className="c-tenant-card">
            <Container fluid>
                <Row>
                    <Col sm={4}>
                        <Row>
                            <Col sm={2}>
                                <img className="tenant-image" src={tenant.img} ></img>
                            </Col>
                            <Col sm={10}>
                                <div className="tenant-name">
                                    <label>Name: </label>
                                    <p>{tenant.fname + " " + tenant.lname}</p>
                                </div>
                                <div className="tenant-email">
                                    <label>Email: </label>
                                    <p>{tenant.email}</p>
                                </div>
                                <div className="tenant-building">
                                    <label>Building: </label>
                                    <p>{tenant.building}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="tenant-card-buttons" sm={2}>
                        <Button className="b-update-button" variant="info" onClick={() => setShowModal(true)}>Update</Button>
                        <Button onClick={removeTenantById} className="b-delete-button" variant="danger">Delete</Button>
                    </Col>
                </Row>
            </Container>
            <NewTenantModal isUpdate="true" show={showModal} handleClose={() => setShowModal(false)} 
            updateTenantContent={updateTenantContent} userId={tenant.id}/>
        </div >
    );
}

export default TenantCard;