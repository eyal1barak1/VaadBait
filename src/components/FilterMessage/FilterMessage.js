
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, InputGroup, FormControl, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import "./FilterMessage.css"



function FilterMessage(props) {

    const { messages, filterMessages, SortMsg } = props;
    const [messagesData, setMessagesData] = useState(messages);
    const [filteredText, setFilteredText] = useState("");
    const [messageAdded, setMessageAdded] = useState(false);
    let filteredMessages = messagesData.filter(message =>
        message.title.toLowerCase().includes(filteredText.toLowerCase()) ||
        message.details.toLowerCase().includes(filteredText.toLowerCase()));
    const [priorityFilter, setPriorityFilter] = useState("");
    filteredMessages = filteredMessages.filter(message =>
        message.priority.toLowerCase().includes(priorityFilter.toLowerCase()));

    // Make sure to add the new message before Rerender
    if (messages !== messagesData) {
        setMessagesData(messages);
        setMessageAdded(!messageAdded);
    }

    useEffect(() => {
        filterMessages(filteredMessages);
    }, [filteredText, priorityFilter, messageAdded]);




    function Filter(eventKey, event) {
        if (event.target.innerHTML === "No Filter") {
            setPriorityFilter("");
        }
        else {
            setPriorityFilter(event.target.innerHTML);
        }

    }

    function Sort(e) {
        if (e.target.id === "date") {
            filteredMessages.sort(function (a, b) {
                const firstDate = Date.parse(a.date);
                const secondDate = Date.parse(b.date);

                return secondDate - firstDate;
            });
        }
        else {
            filteredMessages.sort(function (a, b) {
                var nameA = a.priority.toUpperCase(); // ignore upper and lowercase
                var nameB = b.priority.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names must be equal
                return 0;
                // return a.priority.toUpperCase() < b.priority.toUpperCase() ? 1 : -1;
            });
        }
        filterMessages(filteredMessages);
        SortMsg(e.target.id);
    }
    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <InputGroup size="sm" className="mb-3" onChange={e => setFilteredText(e.target.value)} value={filteredText}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Filter by Text Title and Details"
                            aria-label="Medium" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </Col>
                <Col>

                    <DropdownButton onSelect={Filter} size="sm" variant="warning" id="dropdown-basic-button" title="Filter by Priority">
                        <Dropdown.Item >No Filter</Dropdown.Item>
                        <Dropdown.Item >Info</Dropdown.Item>
                        <Dropdown.Item >Important</Dropdown.Item>
                    </DropdownButton>

                </Col>
                <Col>
                    <Form.Group onChange={Sort} className="filter-field" controlId="formBasicCheckboxFirst">
                        <Form.Label >Sort By:</Form.Label>
                        <Form.Check inline id="date" type="radio" label="Date" name="sort" />
                        <Form.Check inline id="priority" type="radio" label="Priority" name="sort" />
                    </Form.Group>
                </Col>
            </Row>
            <br />

            <Row>
                {/* {ActorCardsarr} */}
            </Row>
        </Container>
    );
}

export default FilterMessage;