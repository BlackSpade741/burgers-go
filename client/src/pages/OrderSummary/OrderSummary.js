import React, { Component } from 'react'
import './OrderSummary.css'
import SectionCard from '../../components/SectionCard/SectionCard'
import PageHeader from '../../components/PageHeader/PageHeader';
import PageDescription from '../../components/PageDescription/PageDescription';
import { Button, ListGroup } from "react-bootstrap";

import NavLink from '../../components/NavLink/NavLink'

const datetime = require("date-and-time")


class orderSummary extends Component {
    constructor(props) {
        super(props)
        console.log("constructing orderSummary")
        console.log(props.order)

        this.getAddress = this.getAddress.bind(this)
    }

    getAddress() {
        return `${this.props.order.address.address1}, ${this.props.order.address.address2}, ${this.props.order.address.city}, Ontario ${this.props.order.address.postal}`
    }

    render() {
        const orderedItems = this.props.order.order.map((burger) => {
            return (
                <SectionCard key={burger._id} title={burger.name} imgSrc="https://image.flaticon.com/icons/svg/837/837589.svg">
				<>
					<p>${burger.price}</p>
					<p>This customized burger contains the following ingredients:</p>
					<ListGroup>
					{										
						burger.burger.map((ingredient, key) => {							
							return (							
							<ListGroup.Item key={key}>{ingredient.name}</ListGroup.Item>							
							)							
						})
					}
					</ListGroup>
					<br/>
				</>
			</SectionCard>
            )
        })

        return (
            <div id="order-summary">
        	<PageHeader>Order Number #{this.props.order._id}</PageHeader>
        	<PageDescription>See your order page update in real time as your burger is being delivered to your door.</PageDescription>

            <Button variant="success">
            <NavLink to="/orders">
            See all Orders
            </NavLink>
            </Button>
            <br /><br />
            <h4>Delivery Information</h4>
            <p>Name: {this.props.order.address.name}</p>
            <p>Deliver to: {this.getAddress()}</p>
            <p>Total Price: ${this.props.order.total}</p>
            <p>Payment Method: Credit</p>
            <p>Order Time: {datetime.format(datetime.parse(this.props.order.orderTime, "YYYY-MM-DD HH:mm:ss     "), 'YYYY/MM/DD HH:mm:ss')}</p>
            <p>Status: <span className="green">{this.props.order.status}</span></p>
            <br />
            <h4>Items in Order:</h4>
            {orderedItems}
        </div>
        )
    }
}

export default orderSummary;