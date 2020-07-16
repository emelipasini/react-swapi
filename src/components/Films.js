import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Films extends Component {
    constructor(props) {
        super(props);
        this.state = {
            films: []
        };
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/films")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    films: data.results
                })
            }).catch(err => console.log(err));
    }

    render() {
        let { films } = this.state;
        return (
            <main>
                <h2>Films</h2>
                <ul>
                    {films.map((film, i) => {
                        return (
                            <Card className="carta" key={"card" + film + i} >
                                <li key={film + i}>{film.title}</li>
                            </Card>
                        )
                    })}
                </ul>
            </main>
        );
    }
}

export default Films;