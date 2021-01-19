import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import NewTenantModal from "../../components/NewTenantModal/NewTenantModal";
import './TenantCard.css'


function TenantCard(props) {
    const { tenant, removeTenant, updateTenantContent } = props;
    const [showModal, setShowModal] = useState(false);
    const placeHolderImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4tJDcJYnlhTCuciLukYiHdpeS9XL5wGGHSg&usqp=CAU";

    function removeTenantById() {
        removeTenant(tenant.id);
    }
 
    return (
        <div className="c-tenant-card">
            <Container fluid>
                <Row>
                    <Col sm={10}>
                        <Row>
                            <Col sm={4}>
                                <img alt="tenantImg" className="tenant-image" src={typeof tenant.img === 'undefined' ? placeHolderImage : tenant.img} ></img>
                            </Col>
                            <Col sm={8}>
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
                updateTenantContent={updateTenantContent} userId={tenant.id} />
        </div >
    );
}

export default TenantCard;