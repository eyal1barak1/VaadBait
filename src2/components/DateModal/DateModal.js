import { useState } from "react";
const { Modal, Form, Button, Col, Row } = require("react-bootstrap");

function DateModal(props) {
    const { show, handleClose, handleUpdateEndDate } = props;
    const [endDate, setEndDate] = useState(new Date());

    function UpdateEndDate() {

        let date = new Date(endDate);
        let jsonStr = JSON.stringify(date);
        var dateStr = JSON.parse(jsonStr);  
        handleUpdateEndDate(dateStr);
        handleClose();
    }

    return (
        <>
            {/* <Button onClick={() => setSmShow(true)}>Small modal</Button> */}
            <Modal size="sm" show={show} onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Small Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formHorizontalEndDate">
                        <Form.Label column >
                            Choose End Date:
                        </Form.Label>
                        <Col>
                            <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)}>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={UpdateEndDate}>
                        Update End Date
                        </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default DateModal;
