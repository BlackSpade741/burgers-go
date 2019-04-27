import React from 'react';

import { Nav } from 'react-bootstrap';
import './NavLink.css'

import { LinkContainer } from "react-router-bootstrap";

const NavLink = (props) => {
    let colour = props.colour;
    if(colour === undefined){
        colour = "white";
    }
    return (
        <LinkContainer to={props.to} className={colour}>
            <Nav.Link onClick={props.onClick}>
                { 
                    props.children
                }
            </Nav.Link>
        </LinkContainer>
    );
}

export default NavLink;