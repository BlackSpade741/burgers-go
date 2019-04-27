import React, { Component } from 'react';
import { Tab, Row, Col, Nav, Table, Button, Form } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';

import "./Admin.css";

import PageHeader from '../../components/PageHeader/PageHeader'

const log = console.log

class UserItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user
        }
        this.deleteSelf = this.deleteSelf.bind(this)
    }

    deleteSelf(e) {
        e.preventDefault()
        log("deleteSelf")

        this.props.deleteUser(this.state.user)
    }

    render() {
        const user = this.state.user
        return (
            <tr>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isUserAdmin ? "Admin User": "Regular User"}</td>
                <td>
                    <Button onClick={this.deleteSelf}>Remove</Button>
                </td>
            </tr>
        );
    }
}


class UserPanel extends Component {
    constructor (props) {
        super(props)

        this.state = {
            validated: false,
            submitted: false,
            error: false
        }

        this.submitCredentials = this.submitCredentials.bind(this)
    }

    submitCredentials(e) {
        log("UserPanel submitCredentials")
        e.preventDefault()
        const form = e.currentTarget

        if (form.checkValidity() === false) {
            e.stopPropagation()
        }

        const email = form.getElementsByClassName("form-control")[0].value
        const username = form.getElementsByClassName("form-control")[1].value
        const password = form.getElementsByClassName("form-control")[2].value
        const isAdmin = form.getElementsByClassName("form-check-input")[0].checked

        this.props.addUser(username, email, password, isAdmin).then(result => {
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


    render() {
        return (
            <div>
                <h4>Users</h4>
        
                <div className="userTable">
    
                    <div id="userTable">
                        <Table striped bordered hover>
                            <thead>
                                <th>User Name</th>
                                <th>Email</th>
                                <th>User Status</th>
                                <th>Actions</th>
                            </thead>
                            <tbody>
                                {
                                    this.props.users.map(user => {
                                        return <UserItem user={user} deleteUser={this.props.deleteUser}/>
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
    
                <h4>Add User</h4>
                <Form onSubmit={this.submitCredentials} validated={this.state.validated}>
                    <Form.Group controlId="formAddUserEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formAddUserUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" />
                    </Form.Group>
                    <Form.Group controlId="formAddUserPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" />
                    </Form.Group>
                    <Form.Group controlId="formAddUserIsAdmin">
                        <Form.Check type="checkbox" label="Admin User" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    {
                        this.state.submitted && !this.state.error ? 
                        (<>
                            <p >User Added! </p>
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
        )
    }
}


class Admin extends Component { 
    constructor (props) {
        super(props)
        log("Admin constructor")
        /* 
            Props should contain: 
            {
                users: a list of users,
                deleteUser: remove user from app,
                addUser: add user to app
            }
        */

        this.state = {
            users: []
        }

        this.getAllUsers().then(
            body => {
                log(body)
                this.setState({
                    users: body
                })
            }
        ).catch(
            error => {
                log(error)
            }
        )
        
        this.deleteUser = this.deleteUser.bind(this)
        this.addUser = this.addUser.bind(this)
    }

    getAllUsers () {
        return fetch("/api/users", {
            method: "GET"
        }).then(
            result => result.json()
        ).catch(
            error => {
                return Promise.reject(error)
            }
        )
    }

    deleteUser (user) {
        log("deleteUser")
        fetch("/api/users/" + user._id, {
            method: "DELETE"
        }).then(
            result => {
                log(result)
                this.getAllUsers().then(
                    body => {
                        log(body)
                        this.setState({
                            users: body
                        })
                    }
                ).catch(
                    error => {
                        log(error)
                    }
                )
            }
        ).catch(
            error => {
                log(error)
            }
        )
    }

    addUser(username, email, password, isAdmin) {
        log("Admin addUser")

        return this.props.submitCredentials(username, email, password, isAdmin).then(result => {
            console.log(result)
            this.getAllUsers().then(
                body => {
                    log(body)
                    this.setState({
                        users: body
                    })
                }
            ).catch(
                error => {
                    log(error)
                }
            )

            return Promise.resolve(result)
        }).catch(error => {
            console.log(error)
            return Promise.reject(error)
        })
    }

    render () {
        return (
            <div className="admin">
                <PageHeader>
                    Admin Panel
                </PageHeader>
    
                <div className="admin-content">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="users">
                        <Row>
                            <Col sm={3} lg={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="users">Users</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="orders">Orders</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9} lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="users">
                                    <UserPanel users={this.state.users} deleteUser={this.deleteUser} addUser={this.addUser}/>
                                </Tab.Pane>
    
                                <Tab.Pane eventKey="orders">
                                    <div>
                                        <h4>Orders</h4>
                                        <LinkContainer to="ordersAdmin">
                                        <Button >
                                            Go to Admin Orders Page
                                        </Button>
                                        </LinkContainer>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                            </Col>
                        </Row>
                        </Tab.Container>
                </div>
            </div>
        );
    }
}
export default Admin;