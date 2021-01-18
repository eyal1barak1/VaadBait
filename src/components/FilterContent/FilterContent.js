
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, InputGroup, FormControl, Form, Dropdown, DropdownButton } from 'react-bootstrap';
import "./FilterContent.css"



function FilterContent(props) {

    const { filteredText, onFilterChange, FilterPriority, Sort, isMessagesPage } = props;

    return (
        <Container>
            <Row>
                <Col xs={isMessagesPage ? 7 : 12}>
                    <InputGroup size="sm" className="mb-3" onChange={e => onFilterChange(e)} value={filteredText}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Filter"
                            aria-label="Medium" aria-describedby="inputGroup-sizing-sm" />
                    </InputGroup>
                </Col>
                {isMessagesPage ?
                    <>
                        <Col>
                            <DropdownButton onSelect={FilterPriority} size="sm" variant="warning" id="dropdown-basic-button" title="Filter by Priority">
                                <Dropdown.Item >No Filter</Dropdown.Item>
                                <Dropdown.Item >Info</Dropdown.Item>
                                <Dropdown.Item >Important</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                        <Col>
                            <Form.Group onChange={e => Sort(e.target.id)} className="sort-radio" controlId="formBasicCheckboxFirst">
                                <div className="sortByLabel"><Form.Label >Sort By:</Form.Label></div>
                                <Form.Check inline id="date" type="radio" label="Date" name="sort" />
                                <Form.Check inline id="priority" type="radio" label="Priority" name="sort" />
                            </Form.Group>
                        </Col>
                    </>
                    : null}
            </Row>
            {isMessagesPage ? <br /> :<> </>}
        </Container>
    );
}

export default FilterContent;