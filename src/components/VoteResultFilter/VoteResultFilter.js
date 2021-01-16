
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import "./VoteResultFilter.css"



function VoteResultFilter(props) {

    const { votes, filterVotings } = props;
    const [votesData, setVotesData] = useState(votes);
    const [filteredText, setFilteredText] = useState("");
    
    let filteredVotes = votesData.filter(vote =>
        vote.title.toLowerCase().includes(filteredText.toLowerCase()) ||
        vote.details.toLowerCase().includes(filteredText.toLowerCase()));

    // Make sure to add the new message before Rerender
    if (votes !== votesData) {
        setVotesData([...votes]);
        
    }

    useEffect(() => {
        filterVotings(filteredVotes);
    }, [filteredText]);

    
    return (
        <Container>
            <Row>
                <Col >
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
            </Row>
        </Container>
    );
}

export default VoteResultFilter;