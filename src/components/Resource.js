import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Resource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            url: props.url,
            show: false,
            selected: []
        };
    }

    componentDidMount() {
        fetch("https://swapi.dev/api/" + this.state.url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.results
                })
            }).catch(err => console.log(err));
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            this.setState({
                url: this.props.url
            })
        }
        fetch("https://swapi.dev/api/" + this.state.url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data.results
                })
            }).catch(err => console.log(err));
    }

    showModal(selected) {
        this.setState({
            show: true,
            selected: selected
        })
    }
    hideModal() {
        this.setState({
            show: false
        })
    }

    render() {
        let { data, url, show, selected } = this.state;
        if(!data) {
            return (
                <div>
                    <h1>Sorry!</h1>
                    <h2>The API isn't working right now. :/</h2>
                    <p>Hopefully it would be back soon.</p>
                    <a href="https://swapi.dev/">API Link</a>
                </div>
            );
        }
        return (
            <Container>
                <h2 className="my-2">{url.toUpperCase()}</h2>
                <Row>
                    {data.map((fact, i) => {
                        return (
                            <Col sm={12} md={6} lg={4} key={"col" + i}>
                                <Card className="resource-card d-flex align-items-center" key={"card" + fact + i} >
                                    {
                                        (url === "films")
                                        ? <p className="p-1 px-4 m-1 w-100 d-flex justify-content-between align-items-center" key={fact + i}>
                                            {fact.title}
                                            <Button onClick={() => this.showModal(fact)}>
                                                +
                                            </Button>
                                        </p>
                                        : <p className="p-1 px-4 m-1 w-100 d-flex justify-content-between align-items-center" key={fact + i}>
                                            {fact.name}
                                            <Button onClick={() => this.showModal(fact)}>
                                                +
                                            </Button>
                                        </p>
                                    }
                                </Card>
                            </Col>
                        )
                    })} 
                </Row>
                <Modal
                    show={show}
                    onHide={() => this.hideModal()}
                    dialogClassName="modal-90w"
                    aria-labelledby="detail"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="detail">
                            <p className="text-dark">{selected.name}</p>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ul>
                            <li className="text-dark">Height: {selected.height}</li>
                            <li className="text-dark">Mass: {selected.mass}</li>
                            <li className="text-dark">Hair color: {selected.hair_color}</li>
                            <li className="text-dark">Skin color: {selected.skin_color}</li>
                            <li className="text-dark">Eyes color: {selected.eye_color}</li>
                            <li className="text-dark">Birth year: {selected.birth_year}</li>
                            <li className="text-dark">Gender: {selected.gender}</li>
                        </ul>
                    </Modal.Body>
                </Modal>
            </Container>
        );
    }
}

export default Resource;