import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Form, Button, Alert, Container } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import './LoginPage.css'
import UserModel from "../../model/UserModel";
import Parse from 'parse';

function LoginPage(props) {
    const [email, setEmail] = useState("john@john.com");
    const [pwd, setPwd] = useState("123");
    const [showLoginError, setShowLoginError] = useState(false);
    const [redirectToMessages, setRedirectToMessages] = useState(false);
    const { onLogin } = props;


    async function login() {
        try {
            const parseUser = await Parse.User.logIn(email, pwd);
            // Trigger onLogin event prop + update redirect state so we will redirect to recipes page
            onLogin(new UserModel(parseUser));
            setRedirectToMessages(true);
        } catch (error) {
            // show an error alert
            console.error('Error while logging in user', error);
            setShowLoginError(true);
        }
    }


    if (redirectToMessages) {
        return <Redirect to="/messages" />;
    }

    return (
        <Container className="p-login">
            <Link className="goBackLink" to="/"><FontAwesomeIcon icon={faArrowLeft} />Back</Link>
            <h1>Login to HOA and make a difference</h1>
            <p>or <Link to="/signup">create an account</Link></p>
            {showLoginError ? <Alert variant="danger">Invalid Credentials!</Alert> : null}
            <Form>
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
                <Button variant="success" type="button" block onClick={login}>
                    Login
                </Button>
            </Form>
        </Container>
    )

}

export default LoginPage;