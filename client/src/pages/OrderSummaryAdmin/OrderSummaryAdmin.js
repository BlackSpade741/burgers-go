import React, { Component } from 'react'
import './OrderSummaryAdmin.css'
import SectionCard from '../../components/SectionCard/SectionCard'
import PageHeader from '../../components/PageHeader/PageHeader';
import PageDescription from '../../components/PageDescription/PageDescription';
import { Tab, Row, Col, Nav, Form, Button, FormControl, InputGroup, Container, ListGroup, ButtonGroup, Table } from "react-bootstrap";
import NavLink from '../../components/NavLink/NavLink'

const datetime = require("date-and-time")

function selectStatus(e){
  const btns = document.querySelector('#statusBtns').children;
  Array.prototype.forEach.call(btns, (btn)=>{btn.classList.remove("active")});
  console.log(btns);
  e.preventDefault();
  e.target.classList.add("active")
}

class OrderSummaryAdmin extends Component {
    constructor(props) {
        super(props)
        console.log(props.order)

        this.state = {
            orderId: props.order._id,
            address: props.order.address,
            payment: props.order.payment,
            total: props.order.total,
            orderItems: props.order.order,
            orderTime: props.order.orderTime,
            selectedButton: null,
            order: props.order,
            success: false,
            error: false
        }

        this.getAddress = this.getAddress.bind(this)
        this.onSetStatus = this.onSetStatus.bind(this)
        this.onStatusClicked = this.onStatusClicked.bind(this)
    }

    getAddress() {
        return `${this.state.address.address1}, ${this.state.address.address2}, ${this.state.address.city}, Ontario ${this.state.address.postal}`
    }

    onStatusClicked(e) {
        this.setState({
            selectedButton: e.currentTarget,
            success: false,
            error: false
        })
    }

    onSetStatus(e) {
        e.preventDefault()
        console.log("onSetStatus")
        const form = e.currentTarget
        console.log(form)
        const buttons = form.getElementsByClassName("btn")
        console.log(buttons)
        const changeOrderStatus = this.props.changeOrderStatus;

        if (this.state.selectedButton === null) return
        console.log(this.state.selectedButton)
        console.log(this.state.selectedButton.innerText)

        this.state.order.status = this.state.selectedButton.innerText.toLowerCase()

        console.log(this.state.order)
        changeOrderStatus(this.state.order).then(result => {
            this.setState({
                order: result,
                success: true,
                error: false
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                error: true,
                success: false
            })
        })
    }
    
    render() {
        const orderedItems = this.state.order.order.map((burger) => {
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
        	<PageHeader>Order Number #{this.state.orderId} Admin Panel</PageHeader>
        	<PageDescription>Manage the order, Review order items, Set the status.</PageDescription>

            <Button variant="success">
            <NavLink to="/ordersAdmin">
            See all Orders
            </NavLink>
            </Button>
            <br /><br />
            <h4>Delivery Information</h4>
            <p>Name: {this.state.address.name}</p>
            <p>Deliver to: {this.getAddress()}</p>
            <p>Total Price: ${this.state.total}</p>
            <p>Payment Method: Credit</p>
            <p>Order Time: {datetime.format(datetime.parse(this.state.orderTime, "YYYY-MM-DD HH:mm:ss     "), 'YYYY/MM/DD HH:mm:ss')}</p>
            {/* <p>Order Time: {this.state.orderTime}</p> */}
            <p>Status: {this.state.order.status}</p>

            {/* set status stuff here */}
            <h4>Set Order Status:</h4>
            <Form onSubmit={this.onSetStatus}>
                <ButtonGroup aria-label="Set Status">
                    <Button variant="outline-secondary" onClick={this.onStatusClicked}>Cancelled</Button>
                    <Button variant="outline-secondary" onClick={this.onStatusClicked}>Placed</Button>
                    <Button variant="outline-secondary" onClick={this.onStatusClicked}>In Progress</Button>
                    <Button variant="outline-secondary" onClick={this.onStatusClicked}>On the Way</Button>
                    <Button variant="outline-secondary" onClick={this.onStatusClicked}>Delivered</Button>
                </ButtonGroup>

                <Button variant="primary" type="submit">Set Status</Button>
            </Form>
            {
                this.state.success ? (<h5>Order status changed successfully!</h5>) : null
            }
            {
                this.state.error ? (<h5>Something went wrong.</h5>): null
            }

            <br />  
            <h4>Items in Order:</h4>
            {orderedItems}
        </div>
        )
    }
}

export default OrderSummaryAdmin;