import { Card } from "react-bootstrap";
import './RecipeCard.css'


function RecipeCard(props) {
    const { recipe } = props;
    return (
        <div className="c-recipe-card">
            <Card>
                <Card.Img variant="top" src={recipe.img} />
                <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text>{recipe.desc}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default RecipeCard;