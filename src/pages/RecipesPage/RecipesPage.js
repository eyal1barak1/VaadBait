import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewRecipeModal from "../../components/NewMessageModal/NewMessageModal";
import RecipeCard from "../../components/MessageCard/MessageCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './RecipesPage.css'
import NewMessageModal from "../../components/NewMessageModal/NewMessageModal";

function RecipesPage(props) {
    const {activeUser, onLogout, recipes, addMessage} = props;
    const [showModal, setShowModal] = useState(false);

    if (!activeUser) {
        return <Redirect to="/"/>
    }



    const recipesView = recipes.map(recipe => <Col key={recipe.id} lg={3} md={6}><RecipeCard recipe={recipe}/></Col>)

    return (
        <div className="p-recipes">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout}/>
            <Container>
                <div className="heading">
                    <h1>{activeUser.fname}'s Recipes</h1>
                    <Button variant="link" onClick={() => setShowModal(true)}>New Recipe</Button>
                </div>
                <Row>
                    {recipesView}
                </Row>
            </Container>
            <NewMessageModal show={showModal} handleClose={() => setShowModal(false)} addMessage={addMessage}/>
        </div>
    )

}

export default RecipesPage;