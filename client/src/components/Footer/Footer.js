import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './Footer.css';

const LinkListItem = (props) => {
    return (
        <li className="link-list-item">
            <LinkContainer to={props.to}>
                <a>
                { props.children }
                </a>
            </LinkContainer>
        </li>
    );
}

const footer = (props) => {
    return (
        <div>
            <footer className="footer">		
                <Container>
                <Row>
                    <Col lg={{span:7.5, offset:0}} md={{span:7, offset:1}}>
                    {/* About */}
                    <div className="block">
                        {/* Footer Logo */}
                        <LinkContainer to="/">
                        <Container id="footer-brand">
                            <Row>
                                <Col xs={3}>
                                <img id="footer-logo" src={require("../../resources/logo.png")} alt="Footer Logo"/>
                                </Col>
                                <Col>
                                    
                                    <div style={{marginTop:"20px"}}>
                                        <h3 style={{ color: "#fff" }}>BurgersGo</h3>
                                        <h5>Delicious custom burgers delivered.</h5>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        </LinkContainer>
                        
                        {/* Description */}
                        <p className="alt-color">BurgersGo is the new way to get your burger cravings filled! Customize every aspect of your burger to your liking, including buns, protein, toppings, and sauces, add on any sides you'd like, and have it delivered right to your door fresh off the grill!</p>
                    </div>
                    </Col>
                    {/* Link list */}
                    <Col lg={{span: 2, offset: 1}} md={3}>
                    <div className="block">
                        <h5>BurgersGo</h5>
                        <ul className="alt-color">
                            <LinkListItem to="/about">About Us</LinkListItem>
                            <LinkListItem to="/customization">Customization Options</LinkListItem>
                            <li>
                                <ul style={{marginLeft: "20px"}}>
                                    <LinkListItem to="/buns">Buns</LinkListItem>
                                    <LinkListItem to="/proteins">Proteins</LinkListItem>
                                    <LinkListItem to="/veggies">Veggies</LinkListItem>
                                    <LinkListItem to="/toppings">Other Toppings</LinkListItem>
                                    <LinkListItem to="/sauces">Sauces</LinkListItem>
                                    <LinkListItem to="/sides">Sides</LinkListItem>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    </Col>
                    {/* Link list */}
                    <Col lg={{span: 2, offset: 0}} md={{ span: 3, offset: 1 }}>
                    <div className="block">
                        {
                            props.isAuthenticated() ? 
                            (
                                props.isAdmin() ?
                                (
                                    <>
                                        <h5>Admin Portal</h5>
                                        <ul className="alt-color">
                                            <LinkListItem to="/admin">Admin Panel</LinkListItem>
                                            <LinkListItem to="/adminSettings">Settings</LinkListItem>
                                            <li><div style={{marginBottom: "5px"}}></div></li>
                                            <LinkListItem to="/signOut">Sign Out</LinkListItem>
                                        </ul>
                                    </>
                                ) :
                                (
                                    <>
                                        <h5>Hi, user</h5>
                                        <ul className="alt-color">
                                            <LinkListItem to="/profile">Your Account</LinkListItem>
                                            <LinkListItem to="/orders">Order History</LinkListItem>
                                            <LinkListItem to="/userSettings">Settings</LinkListItem>
                                            <li></li>
                                            <LinkListItem to="/signout">Sign Out</LinkListItem>
                                        </ul>
                                    </>
                                )
                            ) : 
                            (
                                <ul className="alt-color">
                                    <LinkListItem to="/login">Login</LinkListItem>
                                    <LinkListItem to="/signup">Sign Up</LinkListItem>
                                </ul>
                            )
                        }
                    </div>
                    </Col>
                </Row>
                </Container>
            </footer>


            {/* Footer Bottom */}
            <footer className="footer-bottom">
                <Container>
                    <Row>
                    <Col lg={12} md={12}>
                        {/* Copyright */}
                        <div className="copyright">
                        <p>Copyright © BurgersGo 2019. All Rights Reserved</p>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}

export default footer;