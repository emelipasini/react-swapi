import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class People extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []
        };
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/people")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    people: data.results
                })
            }).catch(err => console.log(err));
    }

    render() {
        let { people } = this.state;
        return (
            <main>
                <h2>People</h2>
                    <ul>
                        {people.map((person, i) => {
                            return (
                                <Card className="carta" key={"card" + person + i} >
                                    <li key={person + i}>{person.name}</li>
                                </Card>
                            )
                        })}
                    </ul>
            </main>
        );
    }
}

export default People;