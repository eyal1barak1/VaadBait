
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col, InputGroup, FormControl, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import axios from 'axios';
import "./FilterMessage.css"



function FilterMessage() {

    const [ActorsData, setActorsData] = useState([]);
    const [filteredText, setFilteredText] = useState("");
    const filteredActors = ActorsData.filter(actor =>
        actor.first_name.toLowerCase().includes(filteredText.toLowerCase()) ||
        actor.last_name.toLowerCase().includes(filteredText.toLowerCase()));

    // let ActorCardsarr = filteredActors.map(actor => <ActorCard actor={actor} />);
    let temp_actor_arr = [];

    // useEffect(() => {

    //     axios.get("actors.json").then(res => {
    //         setActorsData(res.data.map(single_actor => new ActorModel(single_actor)));
    //     });
    // }, []);

    function compareFirst() {
        var checkBox = document.getElementById("first");
        if (checkBox.checked === true) {
            ActorsData.sort(function (a, b) {
                var x = a.first_name.toLowerCase();
                var y = b.first_name.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });
            ActorsData.forEach(item => temp_actor_arr.push(item));
            setActorsData(temp_actor_arr);
        }
    }
    function compareLast() {
        var checkBox = document.getElementById("last");
        if (checkBox.checked === true) {
            ActorsData.sort(function (a, b) {
                var x = a.last_name.toLowerCase();
                var y = b.last_name.toLowerCase();
                if (x < y) { return -1; }
                if (x > y) { return 1; }
                return 0;
            });
            ActorsData.forEach(item => temp_actor_arr.push(item));
            setActorsData(temp_actor_arr);
        }
    }

    function compareAge() {
        var checkBox = document.getElementById("age");
        if (checkBox.checked === true) {
            ActorsData.sort(function (a, b) { return a.calculateAge() - b.calculateAge() });
            ActorsData.forEach(item => temp_actor_arr.push(item));
            setActorsData(temp_actor_arr);
        }
    }

    function Filter(eventKey, event) {
        console.log(event.target.innerHTML);
    }
    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <InputGroup size="sm" className="mb-3" onChange={e => setFilteredText(e.target.value)} value={filteredText}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon="search" />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Filter by Text Title and Details"
                            aria-label="Medium" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </Col>
                <Col>

                    <DropdownButton onSelect={Filter} size="sm" variant="warning" id="dropdown-basic-button" title="Filter by Priority">
                        <Dropdown.Item >Info</Dropdown.Item>
                        <Dropdown.Item >Important</Dropdown.Item>
                    </DropdownButton>

                </Col>
                <Col>
                    <Form.Group className="filter-field" controlId="formBasicCheckboxFirst">
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