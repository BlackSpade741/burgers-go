import React, { Component } from 'react';

import { Container, Row, Col, ListGroup, Button, Nav } from 'react-bootstrap';

import './orderCardItem.css';

import NavLink from '../NavLink/NavLink'

const datetime = require("date-and-time")

const StyledButton = (props) => {
    return (
        <Button className="styledButton" variant="outline-info">
            { props.children }
        </Button>
    );
}


class OrderCardItem extends Component {
    constructor (props) {
        super(props)

        this.onDetailsClicked = this.onDetailsClicked.bind(this)
    }

    onDetailsClicked (e) {
        console.log("details clicked")
        this.props.setOrderSummaryOrder(this.props.order)
    }

    render() {
        return (
            <ListGroup.Item>
                <Container>
                    <Row>
                        <Col xs={2}>
                            <div className="orderImageContainer">
                                <img className="orderImage" src="https://image.flaticon.com/icons/svg/837/837589.svg" alt="burgerImage" style={{backgroundColor: "white"}}/>
                            </div>
                        </Col>
                        <Col xs={7}>
                            <div className="orderContentContainer">
                                <h6>Order Number # { this.props.orderId }</h6>
                                <p>Name on Order: {this.props.order.address.name}</p>
                                <p>Total Price: {this.props.price}</p>
                                <p>Order Time: {datetime.format(datetime.parse(this.props.order.orderTime, "YYYY-MM-DD HH:mm:ss     "), 'YYYY/MM/DD HH:mm:ss')}</p>
                                <p>Status: {this.props.status}</p>
                            </div>
                        </Col>
                        <Col xs={3}>
                            <StyledButton>
                                <NavLink to={this.props.linkTo} colour="black" onClick={this.onDetailsClicked}>
                                    Details
                                </NavLink>
                            </StyledButton>
                        </Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        );
    }
}

export default OrderCardItem;