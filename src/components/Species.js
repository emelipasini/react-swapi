import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Species extends Component {
    constructor(props) {
        super(props);
        this.state = {
            species: []
        };
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/species")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    species: data.results
                })
            }).catch(err => console.log(err));
    }

    render() {
        let { species } = this.state;
        return (
            <main>
                <h2>Species</h2>
                <ul>
                    {species.map((specie, i) => {
                        return (
                            <Card className="carta" key={"card" + specie + i} >
                                <li key={specie + i}>{specie.name}</li>
                            </Card>
                        )
                    })}
                </ul>
            </main>
        );
    }
}

export default Species;