import React, { Component } from 'react'
import './OrderHistory.css'
import { Card, ListGroup, Nav, Button, Table } from 'react-bootstrap';

import PageHeader from '../../components/PageHeader/PageHeader'
import OrderCardItem from '../../components/OrderCard/orderCardItem'

import datetime from 'date-and-time'

class OrderHistory extends Component {
	constructor(props) {
		super(props)
		console.log(props)
	}

	render() {
        const allOrders = this.props.getAllOrders()
        console.log(allOrders)
        allOrders.sort((a, b) => {
            const aTime = datetime.parse(a.orderTime, "YYYY-MM-DD HH:mm:ss     ", true)
            const bTime = datetime.parse(b.orderTime, "YYYY-MM-DD HH:mm:ss     ", true)
            return bTime - aTime
        })

		const setOrderSummaryOrder = this.props.setOrderSummaryOrder
		const listOfOrders = allOrders.map(order => {
			return (
				<OrderCardItem 
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

		return (
			<div className="orderHistory">
				<PageHeader className>
					Order History
				</PageHeader>
	
				{
					allOrders.length === 0 ? (
						<h5>You don't have any orders yet. Go place one now!</h5>
					) : (
						<div>
							<Card >
								<ListGroup variant="flush">
									{ listOfOrders }
								</ListGroup>
							</Card>
						</div>
					)
				}
				
			</div>
		);
	}
}

export default OrderHistory;