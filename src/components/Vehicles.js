import React, { Component } from "react";
import Card from "react-bootstrap/Card";

class Vehicles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicles: []
        };
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/vehicles")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    vehicles: data.results
                })
            }).catch(err => console.log(err));
    }

    render() {
        let { vehicles } = this.state;
        return (
            <main>
                <h2>Vehicles</h2>
                <ul>
                    {vehicles.map((vehicle, i) => {
                        return (
                            <Card className="carta" key={"card" + vehicle + i} >
                                <li key={vehicle + i}>{vehicle.name}</li>
                            </Card>
                        )
                    })}
                </ul>
            </main>
        );
    }
}

export default Vehicles;