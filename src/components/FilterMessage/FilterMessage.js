 
import { useEffect, useState } from 'react';
import ActorModel from '../model/ActorModel';
import ActorCard from '../components/ActorCard/ActorCard'
import { Container, Row, Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import axios from 'axios';


function FilterMessage() {

    const [ActorsData, setActorsData] = useState([]);
    const [filteredText, setFilteredText] = useState("");
    const filteredActors = ActorsData.filter(actor =>
        actor.first_name.toLowerCase().includes(filteredText.toLowerCase()) ||
        actor.last_name.toLowerCase().includes(filteredText.toLowerCase()));

    let ActorCardsarr = filteredActors.map(actor => <ActorCard actor={actor} />);
    let temp_actor_arr = [];

    useEffect(() => {
        
        axios.get("actors.json").then(res=>{
            setActorsData(res.data.map(single_actor => new ActorModel(single_actor)));
        });
    }, []);

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

    return (
        <Container>
            <Row>
                <InputGroup size="sm" className="mb-3" onChange={e => setFilteredText(e.target.value)} value={filteredText}>
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-sm">Filter Actor</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </Row>
            <br />

            <Row>
                {ActorCardsarr}
            </Row>
        </Container>
    );
}

export default FilterMessage;