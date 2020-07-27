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
            nextPage: ""
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
                nextp = nextp.replace("http:", "https:");
                this.setState({
                    nextPage: nextp,
                    data: data.results,
                    loading: false
                });
            }
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.url !== prevProps.url) {
            this.setState({
                url: this.props.url
            });
            this.fetchCall(
                "https://swapi.dev/api/" + this.state.url,
                data => {
                    this.setState({
                        data: data.results,
                        loading: false,
                        nextPage: data.next
                    });
                }
            );
        }
    }

    loadMore = () => {
        let {nextPage} = this.state;
        let oldData = this.state.data;
        this.setState({
            loading: true
        });
        this.fetchCall(
            nextPage, data => {
                let nextp = data.next;
                nextp = nextp.replace("http:", "https:");
                this.setState({
                    data: [...oldData, ...data.results],
                    nextPage: nextp,
                    loading: false
                }, function () {
                    console.log(this.state.data);
                })
            }
        );
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
                <h2 className="my-2">{url.toUpperCase()}</h2>
                <Row>
                    {
                        data.map((fact, i) => {
                            return (
                                <Col sm={12} md={6} lg={4} key={"col" + i}>
                                    <Card className="resource-card d-flex align-items-center" key={"card" + fact + i} >
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
                    {
                        loading
                            ?
                            <Col sm={6}>
                                <Spinner animation="border" role="status" variant="light" />
                            </Col>
                            : null
                    }
                    <Col sm={6}>
                        <Button onClick={this.loadMore}>
                            Load more
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Resource;