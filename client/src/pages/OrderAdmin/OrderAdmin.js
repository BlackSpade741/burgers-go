import React, { Component } from 'react'

import { Card, ListGroup } from 'react-bootstrap'
import './OrderAdmin.css'
import NavLink from '../../components/NavLink/NavLink'
import OrderCardItem from '../../components/OrderCard/orderCardItem'
import PageHeader from '../../components/PageHeader/PageHeader'
import datetime from 'date-and-time'

class OrderHistory extends Component {
	constructor(props) {
		super(props)
		console.log(props)
		this.state = {
			allOrders: []
		}
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
					linkTo="/orderSummaryAdmin"
				/>
			)
		})

		return (
			<div id="content">
            <PageHeader className>
				Order Administration Panel
			</PageHeader>
            {
				allOrders.length === 0 ? (
					<h5>No orders found. </h5>
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
		)
	}
}


export default OrderHistory;