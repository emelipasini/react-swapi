import React from "react";
import Card from "react-bootstrap/Card";

function Home() {
    return(
        <main>
            <h1>Home</h1>
                <h2>Swapi App</h2>
                
                <Card className="carta">
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
        </main>
    );
}

export default Home;