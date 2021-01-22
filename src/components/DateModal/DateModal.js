import { useState } from "react";
import { Modal, Form, Button, Col, Row } from "react-bootstrap";

function DateModal(props) {
    const { show, handleClose, handleUpdateEndDate } = props;
    const [endDate, setEndDate] = useState(new Date());
    const [dateString, setDateString] = useState(formatDate());

    function UpdateEndDate() {
        let voteEndDate = typeof endDate === 'string' ? new Date(endDate) : endDate;
        handleUpdateEndDate(voteEndDate);
        handleClose();
    }

    function setDates(date) {
        setEndDate(date);
        setDateString(date);
    }

    function formatDate() {
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    return (
        <>
            {/* <Button onClick={() => setSmShow(true)}>Small modal</Button> */}
            <Modal size="sm" show={show} onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Pick A Date
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formHorizontalEndDate">
                        <Form.Label column >
                            Choose End Date:
                        </Form.Label>
                        <Col>
                            <Form.Control type="date" value={dateString} onChange={e => setDates(e.target.value)} />
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
