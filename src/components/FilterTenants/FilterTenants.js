import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';




function FilterTenants(props) {

    const { filteredText, onFilterChange } = props;
    
    return (
        <Container>
            <Row>
                <Col >
                    <InputGroup size="sm" className="mb-3" onChange={e => onFilterChange(e)} value={filteredText}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Filter by First Name and Last Name and Email"
                            aria-label="Medium" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
   
}

export default FilterTenants;