import { Navbar, Nav } from "react-bootstrap";



function HoaNavbr(props) {
    const {activeUser, onLogout} = props;

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#/">HOA Systems</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {activeUser ? <Nav.Link href="#/messages">Messages</Nav.Link> : null}
                    {activeUser ? <Nav.Link href="#/voting">Voting</Nav.Link> : null}
                    {activeUser ? <Nav.Link href="#/tenants">Tenants</Nav.Link> : null}
                </Nav>
                <Nav className="ml-auto">
                    {activeUser ? null : <Nav.Link href="#/login">Login</Nav.Link>}
                    {activeUser ? null : <Nav.Link href="#/signup">Signup</Nav.Link>}
                    {activeUser ? <Nav.Link disabled>{"Hi "  + activeUser.fname + " " + activeUser.lname + " :)"}</Nav.Link> : null}
                    {activeUser ? <Nav.Link onClick={() => onLogout()}>Logout</Nav.Link> : null}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default HoaNavbr;