import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap'

import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validated: false,
            badLogin: false
        }
    }

    submitCredentials (e) {
        e.preventDefault()
        const form = e.currentTarget

        if (form.checkValidity() === false) {
            e.stopPropagation()
        }

        console.log(form)
        const username = form.getElementsByClassName("form-control")[0].value
        const password = form.getElementsByClassName("form-control")[1].value

        this.props.checkCredentials(username, password).then((result) => {
            console.log("success")
        }).catch((error) => {
            console.log(error)
        })
    }

    render () {
        return (
            <div className="login">
                <div className="floating-dialog">
                    <h3 className="login-header">Login to BurgersGo</h3>
                    <Form onSubmit={this.submitCredentials.bind(this)} validated={this.state.validated}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="Enter username" />
                        </Form.Group>
    
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Enter password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        {
                            this.state.badLogin ? 
                            (<p className="bad-login">Invalid username or password.</p>) : null
                        }
                    </Form>
                </div>
            </div>
        );
    }
}

export default Login;