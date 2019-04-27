import React from 'react';

import { Card } from 'react-bootstrap';

import './AddressCard.css';

const addressCard = (props) => {
    return (
        <Card className="address-card">
            <Card.Title>{props.name}</Card.Title>
            <Card.Subtitle>{props.phone}</Card.Subtitle>
            <Card.Text>

            {/* name: "John Smith",
                    phone: "6471234567",
                    address1: "100 Maginer St",
                    address2: "",
                    city: "Toronto", 
                    province: "Ontario", 
                    postal: "M5L2T6" */}
                {props.address1}
                <br/>
                {props.address2 !== "" ? (<>{props.address2} <br/></>) : null}
                {props.city}
                <br/>
                {props.province}
                <br/>
                {props.postal}
            </Card.Text>
        </Card>
    );
}

export default addressCard