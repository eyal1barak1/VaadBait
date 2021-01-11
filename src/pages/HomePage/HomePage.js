import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import image1 from '../../Images/transparency.jpg';

import HomePageCard from "../../components/HomePageCard/HomePageCard";

import "./HomePage.css"

function HomePage(props) {
    const { activeUser, onLogout } = props;

    return (
        <div className="p-home">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <Jumbotron>
                <Container className="homePageTitle">
                    <h4>Welcome to HOA Management System</h4>
                    <p>Take your Homeowner Association Management to the next level and get an easy UI for full transparency</p>
                </Container>

            </Jumbotron>
            <Container className="homePageCards">
                <Row>
                    <Col><HomePageCard img="https://www.brandknewmag.com/wp-content/uploads/2018/11/advt-283.jpg" desc="Full Transparency"></HomePageCard></Col>
                    <Col><HomePageCard img="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1063184564%2F960x0.jpg%3Ffit%3Dscale" desc="Vote Online"></HomePageCard></Col>
                    <Col><HomePageCard img="https://images.squarespace-cdn.com/content/v1/527fb6bae4b04f95c720a907/1522090505822-63JM5RD7L5EQ9JE8RIFC/ke17ZwdGBToddI8pDm48kARgRj3gF56o5pPCLcgX83YUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcLhP6FrlsjHNVjgHYYFOnZY2fkf53yXnTjPV0F2ewkRAjGmv5qrb73FDOk_nyAWmN/glenn-carstens-peters-203007.jpg" desc="Write a message"></HomePageCard></Col>
                </Row>
            </Container>
        </div>
    )

}

export default HomePage;