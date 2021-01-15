const { Modal, Form } = require("react-bootstrap");
import { useState } from "react";

function DateModal() {
    const [smShow, setSmShow] = useState(false);


    function UpdateEndDate(date) {

    }

    return (
        <>
            <Button onClick={() => setSmShow(true)}>Small modal</Button>

            <Modal size="sm" show={smShow} onHide={() => setSmShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Small Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formHorizontalEndDate">
                        <Form.Label column sm={2}>
                            End Date
                        </Form.Label>
                        <Col sm={2}>
                            <Form.Control type="date" onChange={e => UpdateEndDate(e.target.value)}>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                </Modal.Body>
            </Modal>

        </>
    );
}

export default DateModal;
