import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: []
        };
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/planets")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    planets: data.results
                })
            }).catch(err => console.log(err));
    }

    render() {
        let { planets } = this.state;
        return (
            <main>
                <h2>Planets</h2>
                <ul>
                    {planets.map((planet, i) => {
                        return (
                            <Card className="carta" key={"card" + planet + i} >
                                <li key={planet + i}>{planet.name}</li>
                            </Card>
                        )
                    })}
                </ul>
            </main>
        );
    }
}

export default Planets;