import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Form, Button, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import './SignupPage.css'
import Parse from 'parse';
import UserModel from "../../model/UserModel";

function SignupPage(props) {
    const [email, setEmail] = useState("eyal@barak.com");
    const [pwd, setPwd] = useState("123");
    const [fname, setfname] = useState("Eyal");
    const [lname, setlname] = useState("Barak");
    const [building, setBuilding] = useState("Einstein");

    const [redirectToMessages, setRedirectToMessages] = useState(false);
    const { onLogin } = props;



    function SignUp() {
        var acl = new Parse.ACL();
        acl.setPublicReadAccess(true);
        
        const newUser = new Parse.User();
        newUser.set('username', fname);
        newUser.set('email', email);
        newUser.set('fname', fname);
        newUser.set('lname', lname);
        newUser.set('building', building);
        newUser.set('img', "");
        newUser.set('role', "committee");
        newUser.set('password', pwd);
        newUser.set('emailAddrr', email);
        newUser.signUp().then((newUser) => {
            onLogin(new UserModel(newUser));
            setRedirectToMessages(true);
        }).catch(error => {
            console.error('Error while signing up user', newUser);
        });
    }


    if (redirectToMessages) {
        return <Redirect to="/messages" />;
    }



    return (
        <Container className="p-signup">
            <Link className="goBackLink" to="/"> <FontAwesomeIcon icon={faArrowLeft} />Back</Link>
            <h1>Create a Committee Member Account</h1>
            <div >
            
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