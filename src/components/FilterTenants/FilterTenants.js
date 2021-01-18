
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';




function FilterTenants(props) {

    const { tenants, filterTenants } = props;
    const [tenantsData, setTenantsData] = useState(tenants);
    const [filteredText, setFilteredText] = useState("");
    const [tenantAdded, setMessageAdded] = useState(false);
    let filteredTenants = tenantsData.filter(tenant =>
        tenant.fname.toLowerCase().includes(filteredText.toLowerCase()) ||
        tenant.lname.toLowerCase().includes(filteredText.toLowerCase()) ||
        tenant.email.toLowerCase().includes(filteredText.toLowerCase())
    );

    // Make sure to add the new message before Rerender
    if (tenants !== tenantsData) {
        setTenantsData(tenants);
        setMessageAdded(!tenantAdded);
    }

    useEffect(() => {
        filterTenants(filteredTenants);
    }, [filteredText, tenantAdded]);

    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <InputGroup size="sm" className="mb-3" onChange={e => setFilteredText(e.target.value)} value={filteredText}>
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