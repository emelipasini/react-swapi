import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

// Components
import Home from "./components/Home";
import Resource from "./components/Resource";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Router>
                    <header className="App-header">
                        <nav>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/people">People</Link></li>
                                <li><Link to="/planets">Planets</Link></li>
                                <li><Link to="/films">Films</Link></li>
                                <li><Link to="/species">Species</Link></li>
                                <li><Link to="/starships">Starships</Link></li>
                                <li><Link to="/vehicles">Vehicles</Link></li>
                            </ul>
                        </nav>
                    </header>
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

                <Router>
                    <footer>
                        <nav>
                            <ul className="">  
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/about">About</Link></li>
                            </ul>
                        </nav>
                    </footer>
                    <Switch>
                        {/* <Route path="/contact" component={} />
                        <Route path="/about" component={} /> */}
                    </Switch>
                </Router>
            </React.Fragment>
        );
    }
}

export default App;
