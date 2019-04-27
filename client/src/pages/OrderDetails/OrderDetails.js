import React, { Component } from 'react'
import './OrderDetails.css'
import SectionCard from '../../components/SectionCard/SectionCard'
import PageHeader from '../../components/PageHeader/PageHeader';
import PageDescription from '../../components/PageDescription/PageDescription';
import { Tab, Row, Col, Nav, Form, Button, FormControl, InputGroup, Container, ListGroup, ButtonGroup, Table } from "react-bootstrap";
import NavLink from '../../components/NavLink/NavLink'
import axios from 'axios'

const log = console.log

class OrderDetails extends Component {
	constructor(props) {
		super(props)

		this.state = {
			burg: [],
			addressDone: false,
			paymentDone: false,
			address: null,
			payment: null
		}

		this.deleteBurger = this.deleteBurger.bind(this)
		this.addBurger = this.addBurger.bind(this)
		this.checkout = this.checkout.bind(this)
		this.submitAddress = this.submitAddress.bind(this)
		this.submitPayment = this.submitPayment.bind(this)
	}

	deleteBurger(e, id){
    	e.preventDefault();
    	const card = e.target.parentElement.parentElement.parentElement.parentElement;
		card.parentElement.removeChild(card);
		this.props.delete(id);
	}
	
	addBurger(){
		this.props.checkoutItems.forEach((burger) => {			
			this.state.burg.push(
			<SectionCard key={burger.id} title={burger.name} imgSrc="https://image.flaticon.com/icons/svg/837/837589.svg">
				<>
					<p>${burger.price}</p>
					<p>Delicious and original. This customized burger contains the following ingredients:</p>
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
					<Button variant="danger" onClick={(e) => this.deleteBurger(e, burger.id)}>Remove</Button>
				</>
			</SectionCard>
			)
		})
	}

	submitAddress(e) {
		log("submit address")
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false) {
			e.stopPropagation()
		}

		const address = {
			name: form.getElementsByClassName("form-control")[0].value,
			phone: parseInt(form.getElementsByClassName("form-control")[1].value),
			address1: form.getElementsByClassName("form-control")[2].value,
			address2: form.getElementsByClassName("form-control")[3].value,
			city: form.getElementsByClassName("form-control")[4].value,
			postal: form.getElementsByClassName("form-control")[5].value
		}

		log(address)

		this.setState({
			addressDone: true,
			address: address
		})
	}

	submitPayment(e) {
		log("submit payment")
		e.preventDefault()
		const form = e.currentTarget
		if (form.checkValidity() === false) {
			e.stopPropagation()
		}

		const payment = {
			cardNumber: parseInt(form.getElementsByClassName("form-control")[0].value),
			nameOnCard: form.getElementsByClassName("form-control")[1].value,
			expiryDate: form.getElementsByClassName("form-control")[2].value,
		}

		log(payment)

		this.setState({
			paymentDone: true,
			payment: payment
		})
	}

	checkout(e) {
		log("checking out")
		e.preventDefault()

		this.setState({
			burg: []
		})
        this.props.checkout(this.state.address, this.state.payment)
    }

	render() {
		return (
			<div id="content">
				<h1>{console.log(this.props.checkoutItems)}</h1>
				<PageHeader>Order</PageHeader>
				<PageDescription>Fill in your order details, as well as the burger you are interested in. Your meal will be ready for delivery shortly.</PageDescription>

				{/* Input address information */}
				<div className="address-section">
					<h4>Delivery information</h4>
					<Form 
						validated={this.state.addressDone} 
						onSubmit={this.submitAddress}	
					>
						<Form.Row>
							<Form.Group as={Col} controlId="addressName">
								<Form.Label>Name</Form.Label>
								<Form.Control
									required
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid name.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group as={Col} controlId="addressPhone">
								<Form.Label>Phone Number</Form.Label>
								<Form.Control 
									required
									type="number"
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid phone number.
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Form.Group controlId="addressAddress1">
							<Form.Label>Address</Form.Label>
							<Form.Control 
								placeholder="1234 Main St" 
								required
								type="text"
							/>
							<Form.Control.Feedback type="invalid">
									Please enter a valid address.
								</Form.Control.Feedback>
						</Form.Group>

						<Form.Group controlId="addressAddress2">
							<Form.Label>Address 2</Form.Label>
							<Form.Control 
								type="text"
								placeholder="Apartment, studio, or floor" 
							/>
						</Form.Group>

						<Form.Row>
							<Form.Group as={Col} controlId="addressCity">
								<Form.Label>City</Form.Label>
								<Form.Control 
									required
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid city.
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} controlId="formPlaintextProvince">
								<Form.Label>
								Province
								</Form.Label>
								<Form.Control plaintext readOnly defaultValue="Ontario" />
							</Form.Group>
							<Form.Group as={Col} controlId="addressZip">
							<Form.Label>Postal Code</Form.Label>
								<Form.Control 
									required
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid postal code.
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Button variant="warning" type="submit" disabled={this.state.addressDone}>Done</Button>
					</Form>

					{
						this.state.addressDone ? (
							<p>Address Entered!</p>
						):null
					}
				</div>

				{/* Input payment information */}

				<div className="payment-section">
					<h4>Payment Method</h4>
					<p>We only accept credit cards. </p>
					<Form 
						onSubmit={this.submitPayment}
						validated={this.state.paymentDone}
					>
						<Form.Group controlId="paymentCardNumber">
							<Form.Label>Card Number</Form.Label>
							<Form.Control 
								required
								type="text"
							/>
							<Form.Control.Feedback type="invalid">
									Please enter a valid card number.
								</Form.Control.Feedback>
						</Form.Group>

						<Form.Row>
							<Form.Group as={Col} controlId="paymentName">
								<Form.Label>Name on Card</Form.Label>
								<Form.Control 
									required
									type="text"
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid name.
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group as={Col} controlId="paymentDate">
								<Form.Label>Expiry Date (MMYY)</Form.Label>
								<Form.Control 
									type="text"
									required
								/>
								<Form.Control.Feedback type="invalid">
									Please enter a valid expiry date.
								</Form.Control.Feedback>
							</Form.Group>
						</Form.Row>
						<Button variant="warning" type="submit" disabled={this.state.paymentDone}>Done</Button>
					</Form>
					{
						this.state.paymentDone ? (
							<p>Payment Entered!</p>
						):null
					}
				</div>

				<h4>Order items</h4>

				{/* Display items in order */}
				{this.addBurger()}
				
				{this.state.burg}

				{/* Other information */}
				<p>Add burgers and sides. When you are happy, proceed to checkout</p>
				<Button variant="success">
				<NavLink to="/build">
				Add another item
				</NavLink>
				</Button>
				<Button variant="success" onClick={this.checkout} disabled={!this.state.addressDone || !this.state.paymentDone}>
				{
					<NavLink to="/orderSummary">
					Proceed to checkout
					</NavLink>
				}
				</Button>
			</div>
		);
	}
}

export default OrderDetails;