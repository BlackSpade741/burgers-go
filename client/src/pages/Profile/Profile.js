import React, { Component } from 'react';
import { Card, Button, ListGroup, Nav, Form } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";

import './Profile.css';

import OrderCardItem from '../../components/OrderCard/orderCardItem'
import PageHeader from '../../components/PageHeader/PageHeader'
import datetime from 'date-and-time'

const Section = (props) => {
    return (
        <div className="profile-section">
            { props.children }
        </div>
    );
}

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.userDetails.user,
            favourites: props.userDetails.favourites,
            addresses: props.userDetails.addresses,
            paymentInfos: props.userDetails.paymentInfos,
            dietaryRestrictions: props.userDetails.dietaryRestrictions,
            newRestriction: "",
            recentOrders: []
        }
        this.addDietaryRestriction = this.addDietaryRestriction.bind(this)
        this.removeDietaryRestriction = this.removeDietaryRestriction.bind(this)
    }

    addDietaryRestriction (e) {
        e.preventDefault();
        console.log(this.state.newRestriction)
        const newRestrictions = this.state.dietaryRestrictions.slice()
        if (!(this.state.newRestriction in newRestrictions)) {
            newRestrictions.push(this.state.newRestriction)

            this.setState((prevState, props) => ({
                dietaryRestrictions: newRestrictions.slice()
            }))
        }
    }

    removeDietaryRestriction (e) {
        e.preventDefault();
        const restriction = e.target.parentElement.getElementsByTagName("span")[0].textContent;
        console.log(restriction)
        if (this.state.dietaryRestrictions === []) {
            return
        }

        const newRestrictions = this.state.dietaryRestrictions.slice()
        let index = newRestrictions.indexOf(restriction)
        if (index !== -1) newRestrictions.splice(index, 1)
        console.log(newRestrictions)

        this.setState({
            dietaryRestrictions: newRestrictions.slice()
        })
    }

    render() {
        const allOrders = this.props.getAllOrders()
        allOrders.sort((a, b) => {
            const aTime = datetime.parse(a.orderTime, "YYYY-MM-DD HH:mm:ss     ", true)
            const bTime = datetime.parse(b.orderTime, "YYYY-MM-DD HH:mm:ss     ", true)
            console.log(aTime)
            console.log(bTime)
            console.log(aTime > bTime)
            return bTime - aTime
        })
        const newOrders = allOrders.slice(0, 3)
        console.log(newOrders)

        const setOrderSummaryOrder = this.props.setOrderSummaryOrder
        return (
            <div className="profile">
                <PageHeader>
                    Your Account
                </PageHeader>
                
                <div className="profile-content">
                    <Section id="recent-orders">
                        <div className="profile-section-title">
                            <h4>Recent Orders</h4>
                            <LinkContainer to="orders" style={{display: "inline", marginLeft: "10px"}}>
                                <Nav.Link>
                                    View All Orders
                                </Nav.Link>
                            </LinkContainer>
                        </div>
                        
                        {
                            newOrders.length === 0 ? (
                                <h5>You don't have any orders yet. Go place one now!</h5>
                            ):(
                                <Card >
                                    <ListGroup variant="flush">
                                        {
                                            newOrders.map(order => {
                                                return (
                                                    <OrderCardItem 
                                                        key={order._id}
                                                        orderId={order._id}
                                                        price={order.total}
                                                        date={order.orderTime}
                                                        status={order.status}
                                                        imgAddress="https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35-1500x1125.jpg"
                                                        setOrderSummaryOrder={setOrderSummaryOrder}
                                                        order={order}
                                                        linkTo="/orderSummary"
                                                    />
                                                )
                                            })
                                        }
                                    </ListGroup>
                                </Card>
                            )
                        }
                    </Section>
    
                    {/* <Section id="dietary-restrictions">
                        <h4>Dietary Restrictions</h4>
    
                        {
                             this.state.dietaryRestrictions.map(
                                 (restriction, index) => (
                                     <div key={index} className="restriction">
                                        <span>{restriction}</span>
                                        <Button variant="outline-primary" className="restriction-remove" onClick={this.removeDietaryRestriction}>X</Button>
                                     </div>
                                 )
                             )
                        }
    
                        <Form inline onSubmit={this.addDietaryRestriction}>
                            <Form.Group controlId="restriction">
                                <Form.Control type="text" placeholder="Enter restriction" onChange={((e)=>this.setState({newRestriction: e.target.value}))}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add restriction
                            </Button>
                            </Form>
                    </Section> */}
                </div>
            </div>
        );
    }
}

export default Profile;