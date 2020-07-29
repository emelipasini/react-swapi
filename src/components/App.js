import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

// Componentes
import Home from "./Home";
import Resource from "./Resource";

// React Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <header className="App-header">
                        <nav>
                            {/* Nav para pantallas md o superior */}
                            <ul className="d-none d-md-flex">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/people">People</Link></li>
                                <li><Link to="/planets">Planets</Link></li>
                                <li><Link to="/films">Films</Link></li>
                                <li><Link to="/species">Species</Link></li>
                                <li><Link to="/starships">Starships</Link></li>
                                <li><Link to="/vehicles">Vehicles</Link></li>
                            </ul>
                            {/* Nav para telefonos */}
                            <DropdownButton className="d-md-none" id="drop-menu" title="Menu">
                                <Dropdown.Item><Link to="/">Home</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/people">People</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/planets">Planets</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/films">Films</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/species">Species</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/starships">Starships</Link></Dropdown.Item>
                                <Dropdown.Item><Link to="/vehicles">Vehicles</Link></Dropdown.Item>
                            </DropdownButton>
                        </nav>
                    </header>
                    {/* Renderiza el componente elegido */}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/people" render={props => (
                            <Resource {...props} url="people" />
                        )} />
                        <Route path="/planets" render={props => (
                            <Resource {...props} url="planets" />
                        )} />
                        <Route path="/films" render={props => (
                            <Resource {...props} url="films" />
                        )} />
                        <Route path="/species" render={props => (
                            <Resource {...props} url="species" />
                        )} />
                        <Route path="/starships" render={props => (
                            <Resource {...props} url="starships" />
                        )} />
                        <Route path="/vehicles" render={props => (
                            <Resource {...props} url="vehicles" />
                        )} />
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
