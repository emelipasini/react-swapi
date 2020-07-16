import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Starships extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starships: []
        };
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/starships")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    starships: data.results
                })
            }).catch(err => console.log(err));
    }

    render() {
        let { starships } = this.state;
        return (
            <main>
                <h2>Starships</h2>
                <ul>
                    {starships.map((starship, i) => {
                        return (
                            <Card className="carta" key={"card" + starship + i} >
                                <li key={starship + i}>{starship.name}</li>
                            </Card>
                        )
                    })}
                </ul>
            </main>
        );
    }
}

export default Starships;