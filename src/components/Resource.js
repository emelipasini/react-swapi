import React, { Component } from "react";

// React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';


class Resource extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            url: props.url,
            loading: true,
            nextPage: null
        };
    }

    // Llamadas asincronicas
    fetchCall = (endpoint, callback) => {
        fetch(endpoint)
            .then(res => res.json())
            .then(data => callback(data))
            .catch(err => console.log(err));
    }

    // Se fija que la siguiente pagina exista
    nextPageExists(data, oldData = null) {
        let nextp = data.next;
        let newData = data.results;
        if (oldData) {
            newData = [...oldData, ...newData];
        }
        if (nextp) {
            // Arreglo de que la url viene con http
            nextp = nextp.replace("http:", "https:");
            this.setState({
                data: newData,
                nextPage: nextp,
                loading: false
            });
        } else {
            this.setState({
                data: newData,
                nextPage: null,
                loading: false
            });
        }
    }

    // Montado del componente
    componentDidMount() {
        this.fetchCall(
            "https://swapi.dev/api/" + this.state.url,
            data => {
                this.nextPageExists(data);
            }
        );
    }

    // Actualizacion del componente
    componentDidUpdate(prevProps) {
        // Si la url cambio hace un nuevo llamado
        if (this.props.url !== prevProps.url) {
            this.setState({
                url: this.props.url
            }, function () {
                // Espera a que se guarde el nuevo estado y luego hace el llamado
                this.fetchCall(
                    "https://swapi.dev/api/" + this.state.url,
                    data => {
                        this.nextPageExists(data);
                    }
                );
            });
        }
    }

    // Trae mas informacion
    loadMore = () => {
        let {nextPage} = this.state;
        if (nextPage) {
            let oldData = this.state.data;

            this.setState({
                loading: true
            }, function () {
                // Espera a que se guarde el nuevo estado y luego hace el llamado
                this.fetchCall(
                    nextPage, data => {
                        this.nextPageExists(data, oldData);
                    }
                );
            });
        }
    }

    render() {
        let { data, url, loading } = this.state;
        // Atajo por si se cae la API
        if(!data) {
            return (
                <div className="m-3">
                    <h1>Sorry!</h1>
                    <h2>The API isn't working right now. :/</h2>
                    <p>Hopefully it would be back soon.</p>
                    <a href="https://swapi.dev/">API Link</a>
                </div>
            );
        }
        return (
            <Container>
                <h2 className="my-2 pt-5 pb-2">{url.toUpperCase()}</h2>
                <Row>
                    {
                        data.map((fact, i) => {
                            return (
                                <Col sm={12} md={6} lg={4} key={"col" + i}>
                                    <Card className="resource-card d-flex align-items-center m-3" key={"card" + fact + i} >
                                        {/* Todos tienen name menos films */}
                                        {
                                            (url === "films")
                                                ? <p className="p-1 px-4 m-1 w-100 d-flex justify-content-center align-items-center" key={fact + i}>
                                                    {fact.title}
                                                </p>
                                                : <p className="p-1 px-4 m-1 w-100 d-flex justify-content-center align-items-center" key={fact + i}>
                                                    {fact.name}
                                                </p>
                                        }
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row>
                    {/* Si esta cargando muestra un spinner */}
                    {
                        loading
                            ?
                            <Col sm={6}>
                                <Spinner className="m-3" animation="border" role="status" variant="light" />
                            </Col>
                            : null
                    }
                    <Col sm={6}>
                        <Button className="m-3 btn-more" onClick={this.loadMore}>
                            Load more
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Resource;