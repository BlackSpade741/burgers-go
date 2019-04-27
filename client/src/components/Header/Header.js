import React from 'react';
import './Header.css';
import { Container, Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

const NavLink = (props) => {
    return (
        <LinkContainer to={props.to}>
            <Nav.Link>
                { props.children }
            </Nav.Link>
        </LinkContainer>
    );
}


const NavDropdownLink = (props) => {
    return (
        <LinkContainer to={ props.to }>
            <NavDropdown.Item>
                { props.children }
            </NavDropdown.Item>
        </LinkContainer>
    );
}


const header = (props) => {
    return (
        <div className="header">
            {/* <Container id="navbar-container"> */}
                <Navbar bg="white" expand="md">
                <Container id="navbar-container">
                    <LinkContainer to={"/"}>
                        <Navbar.Brand>
                        <img id="logo" src={require("../../resources/logo.png")} alt=""></img>
                        BurgersGo</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="mr-auto">
                            <NavLink to="/">
                                Home
                            </NavLink>
                            <NavLink to="/about">About</NavLink>
                            <NavDropdown title="Customization" id="basic-nav-dropdown">
                                <NavDropdownLink to="/customization">
                                    Customization Options
                                </NavDropdownLink>
                                <NavDropdown.Divider />
                                <NavDropdownLink to="/buns">
                                    Buns
                                </NavDropdownLink>
                                <NavDropdownLink to="/proteins">
                                    Proteins
                                </NavDropdownLink>
                                <NavDropdownLink to="/veggies">
                                    Veggies
                                </NavDropdownLink>
                                <NavDropdownLink to="/toppings">
                                    Toppings
                                </NavDropdownLink>
                                <NavDropdownLink to="/sauces">
                                    Sauces
                                </NavDropdownLink>
                                <NavDropdownLink to="/sides">
                                    Sides
                                </NavDropdownLink>
                            </NavDropdown>
                        </Nav>
                        <Form inline>
                            <Nav id="navlinks-right">
                                {
                                    props.isAuthenticated() ? 
                                        (props.isAdmin() ?
                                            (
                                                <NavDropdown title="Admin Options" id="basic-nav-dropdown">
                                                    <NavDropdownLink to="admin">Admin Panel</NavDropdownLink>
                                                    <NavDropdownLink to="adminSettings">Settings</NavDropdownLink>
                                                    <NavDropdown.Divider />
                                                    <NavDropdownLink to="signout">Sign Out</NavDropdownLink>
                                                </NavDropdown>
                                            ) : 
                                            (
                                                <>
                                                    <img src={require("../../resources/account-circle.svg")} alt="Account Icon"/>
                                                    <NavDropdown title={"Hi, " + props.user.username} id="basic-nav-dropdown">
                                                        <NavDropdownLink to="profile">Your Account</NavDropdownLink>
                                                        <NavDropdownLink to="orders">Order History</NavDropdownLink>
                                                        <NavDropdownLink to="profileSettings">Settings</NavDropdownLink>
                                                        <NavDropdown.Divider />
                                                        <NavDropdownLink to="signout">Sign Out</NavDropdownLink>
                                                    </NavDropdown>
                                                </>
                                            )
                                        ) :
                                        (
                                            <> 
                                                <NavLink to="/login">
                                                    Login
                                                </NavLink>
                                                <NavLink to="/signup">
                                                    Sign up
                                                </NavLink>
                                            </>
                                        ) 
                                }
                                
                            </Nav>
                            <Button variant="success">
                            <div id="build"> 
                                <NavLink to="/build" >
                                    Start Building
                                </NavLink>
                            </div>
                                                            
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            {/* </Container> */}
        </div>
    );
}

export default header;