import React, {Component} from 'react';
import { Tab, Row, Col, Nav, Form, Button } from "react-bootstrap";

import "./ProfileSettings.css";

import PageHeader from '../../components/PageHeader/PageHeader'

class ProfileSettings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            validated: false,
            error: "",
            success: false
        }
        this.submitCredentials = this.submitCredentials.bind(this)
    }

    submitCredentials (e) {
        e.preventDefault()
        const form = e.currentTarget

        if (form.checkValidity() === false) {
            e.stopPropagation()
        }

        console.log(form)
        const oldPassword = form.getElementsByClassName("form-control")[0].value
        const newPassword = form.getElementsByClassName("form-control")[1].value
        const confirmNewPassword = form.getElementsByClassName("form-control")[2].value

        if (newPassword !== confirmNewPassword) {
            console.log("passwords don't match")
            this.setState({
                error: "New password must match confirm password!"
            })
        } else {
            this.props.confirmPassword(oldPassword).then(result => {
                console.log("password confirmed")
                this.props.changePassword(newPassword).then(result => {
                    console.log("password changed")
                    this.setState({
                        success: true,
                        error:""
                    })
                })
            }).catch(error =>{
                console.log(error)
                this.setState({
                    error: "Something went wrong. Try again later.",
                    success: false
                })
            })
        }
    }

    render () {

        // TODO: Customize Variable Names in Profile Picture Upload Section

        return (
            <div className="profileSettings">
                <PageHeader>
                    Settings
                </PageHeader>

                <div className="profile-content">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="passwordSettings">
                        <Row>
                            <Col sm={3} lg={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="passwordSettings">Password Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="profileIconSettings">Profile Icon Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="contactSettings">Contact Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="addressSettings">Address Settings</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="paymentSettings">Payment Settings</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            </Col>
                            <Col sm={9} lg={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="passwordSettings">
                                    <h4>Change Your Password</h4>
                                    <div className="passwordSettings">
                                        <Form onSubmit={this.submitCredentials}>
                                            <Form.Group controlId="userChangeOldPassword">
                                                <Form.Label>Old Password</Form.Label>
                                                <Form.Control type="password" placeholder="Enter current password" />
                                            </Form.Group>

                                            <Form.Group controlId="userChangeNewPassword">
                                                <Form.Label>New Password</Form.Label>
                                                <Form.Control type="password" placeholder="Enter new password" />
                                            </Form.Group>

                                            <Form.Group controlId="userChangeConfirmPassword">
                                                <Form.Label>Confirm New Password</Form.Label>
                                                <Form.Control type="password" placeholder="Enter new password again" />
                                            </Form.Group>

                                            <Button variant="primary" type="submit">
                                            Submit
                                            </Button>
                                        </Form>

                                        {
                                            this.state.success ? (
                                                <h5 style={{color: "green"}}>Password successfully changed!</h5>
                                            ) : null
                                        }
                                        {
                                            this.state.error !== "" ? (
                                                <h5 style={{color: "red"}}>Error: {this.state.error}</h5>
                                            ) : null
                                        }
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

export default ProfileSettings;