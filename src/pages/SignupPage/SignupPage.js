import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import './SignupPage.css'

function SignupPage(props) {
    const [email, setEmail] = useState("eyal@barak.com");
    const [pwd, setPwd] = useState("123");
    const [fname, setfname] = useState("Eyal");
    const [lname, setlname] = useState("Barak");
    const [building, setBuilding] = useState("Einstein");

    const [redirectToMessages, setRedirectToMessages] = useState(false);
    const { users, onLogin, AddCommittee } = props;

    function SignUp() {

        const newCommittee = {
            id: Date.now(),
            fname,
            lname,
            email,
            pwd,
            role: "committee",
            building,
        }

        AddCommittee(newCommittee);
        setRedirectToMessages(true);

    }


    if (redirectToMessages) {
        const userFound = users.find(user => user.email.toLowerCase() === email.toLowerCase() && user.pwd === pwd);
        onLogin(userFound);
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <h1>Create a Committee Member Account</h1>
            <div className="p-signup">
                <Form>
                    <Form.Group controlId="formBasicfname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" value={fname} onChange={e => setfname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasiclname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" value={lname} onChange={e => setlname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicbuilding">
                        <Form.Label>Building/Condomium Community Name</Form.Label>
                        <Form.Control type="text" placeholder="Building/Condomium Community Name" value={building} onChange={e => setBuilding(e.target.value)} />
                    </Form.Group>

                    <Button variant="warning" type="button" block onClick={SignUp}>
                        SignUp
                </Button>
                </Form>
            </div>
        </Container>
    )

}

export default SignupPage;