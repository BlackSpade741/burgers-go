import React, { Component } from 'react';

import { Form, Button, Container, Row, Col } from 'react-bootstrap'

import PageHeader from '../../components/PageHeader/PageHeader'
import DelayedRedirect from '../../components/DelayedRedirect/DelayedRedirect'

import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validated: false,
            submitted: false,
            error: false
        }
    }

    submitCredentials(e) {
        e.preventDefault()
        const form = e.currentTarget

        if (form.checkValidity() === false) {
            e.stopPropagation()
        }

        console.log(form)
        const email = form.getElementsByClassName("form-control")[0].value
        const username = form.getElementsByClassName("form-control")[1].value
        const password = form.getElementsByClassName("form-control")[2].value


        this.props.submitCredentials(username, email, password, false).then(result => {
            console.log(result)
            this.setState({
                submitted: true,
                error: false
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                submitted: true,
                error: true
            })
        })
    }

    render () {
        return (
            <div className="signup">
                <Container>
                    <Row>
                        <Col>
                            <div className="description">
                                <PageHeader>Join BurgersGo now, and choose from more than 500 burger combinations to make your dream burger!</PageHeader>
                                <br/>
                                <p>Sign up now and enjoy $10 off on us. </p>
                                <img src="https://www.lynnesnissan.com/wp-content/uploads/2018/10/Burger-banner.png" alt="Burger banner"/>
                            </div>
                        </Col>
                        <Col xs={5}>
                            <div className="signup-dialog">
                                <h3 className="signup-header">Sign Up on BurgersGo</h3>
                                <Form onSubmit={this.submitCredentials.bind(this)} validated={this.state.validated}>
                                    <Form.Group controlId="formSignupEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group controlId="formSignupUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" />
                                    </Form.Group>
                                    <Form.Group controlId="formSignupPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" />
                                    </Form.Group>
                                    <Form.Group controlId="formSignupPostal">
                                        <Form.Label>Postal Code</Form.Label>
                                        <Form.Control type="text" placeholder="Enter postal code" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                    {
                                        this.state.submitted && !this.state.error ? 
                                        (<>
                                            <p >Sign up successful! You'll be redirected to the login page in 2 seconds. </p>
                                            <DelayedRedirect to={'/login'} delay={2000} />
                                        </>
                                        ) : null
                                    }
                                    {
                                        this.state.submitted && this.state.error ?
                                        (
                                            <p>Uh-oh, something went wrong. Try again later.</p>
                                        ) : null
                                    }
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    </Container>
            </div>
        );
    }
}

export default SignUp;