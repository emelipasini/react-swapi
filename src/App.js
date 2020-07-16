import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

import People from "./components/People";
import Planets from "./components/Planets";
import Home from "./components/Home";
import Films from "./components/Films";
import Species from "./components/Species";
import Starships from "./components/Starships";
import Vehicles from "./components/Vehicles";

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
                        <Route path="/people" component={People} />
                        <Route path="/planets" component={Planets} />
                        <Route exact path="/films" component={Films} />
                        <Route exact path="/species" component={Species} />
                        <Route exact path="/starships" component={Starships} />
                        <Route exact path="/vehicles" component={Vehicles} />
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
