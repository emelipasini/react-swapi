import React, { Component } from "react";

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

    fetchCall = (endpoint, callback) => {
        fetch(endpoint)
            .then(res => res.json())
            .then(data => callback(data))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.fetchCall(
            "https://swapi.dev/api/" + this.state.url,
            data => {
                let nextp = data.next;
                if (nextp) {
                    nextp = nextp.replace("http:", "https:");
                    this.setState({
                        data: data.results,
                        nextPage: nextp,
                        loading: false
                    });
                } else {
                    this.setState({
                        data: data.results,
                        loading: false
                    });
                }
            }
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            this.setState({
                url: this.props.url
            }, function () {
                this.fetchCall(
                    "https://swapi.dev/api/" + this.state.url,
                    data => {
                        let nextp = data.next;
                        if (nextp) {
                            nextp = nextp.replace("http:", "https:");
                            this.setState({
                                data: data.results,
                                nextPage: nextp,
                                loading: false
                            });
                        } else {
                            this.setState({
                                data: data.results,
                                nextPage: null,
                                loading: false
                            });
                        }
                    }
                );
            });
        }
    }

    loadMore = () => {
        let {nextPage} = this.state;
        if (nextPage) {
            let oldData = this.state.data;

            this.setState({
                loading: true
            }, function () {
                this.fetchCall(
                    nextPage, data => {
                        let nextp = data.next;
                        if (nextp) {
                            nextp = nextp.replace("http:", "https:");
                            this.setState({
                                data: [...oldData, ...data.results],
                                nextPage: nextp,
                                loading: false
                            });
                        } else {
                            this.setState({
                                data: [...oldData, ...data.results],
                                nextPage: null,
                                loading: false
                            });
                        }
                    }
                );
            });
        }
    }

    render() {
        let { data, url, loading } = this.state;
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