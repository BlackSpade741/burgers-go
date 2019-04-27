import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom"
import './App.css';

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop'

import Home from './pages/Home/Home'
import About from './pages/About/About'
import Admin from './pages/Admin/Admin'
import AdminSettings from './pages/AdminSettings/AdminSettings'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import SignOut from './pages/SignOut/SignOut'
import Profile from './pages/Profile/Profile'
import StartBuilding from './pages/StartBuilding/StartBuilding'
import ProfileSettings from './pages/ProfileSettings/ProfileSettings'
import NotFound from './pages/NotFound/NotFound'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import OrderAdmin from './pages/OrderAdmin/OrderAdmin'

import Customization from './pages/Customization/Customization'
import Buns from './pages/Customization/Buns/Buns'
import Proteins from './pages/Customization/Proteins/Proteins'
import Sauces from './pages/Customization/Sauces/Sauces'
import Sides from './pages/Customization/Sides/Sides'
import Toppings from './pages/Customization/Toppings/Toppings'
import Veggies from './pages/Customization/Veggies/Veggies'

import OrderDetails, {Address} from './pages/OrderDetails/OrderDetails'
import OrderSummary from './pages/OrderSummary/OrderSummary'
import OrderSummaryAdmin from './pages/OrderSummaryAdmin/OrderSummaryAdmin'
import uniqid from 'uniqid'

const axios = require("axios")


const request = require("request")
const log = console.log
/* 

App.js is where the frame of the app lives, including the header, footer, and any routing needed between views. 

*/

const LoginRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}

            render={props =>
                rest.isAuthenticated() ?
                    rest.isAdmin() ? (<Redirect to={{pathname: "/admin", state: { from:props.location }}}/>)
                        : <Redirect to={{pathname: "/profile", state: { from:props.location }}}/>
                    : <Component {...props} checkCredentials={rest.checkCredentials}
                    isAdmin={rest.isAdmin}
                    isAuthenticated={rest.isAuthenticated}/>
            }
        />
    );
}

const BuildRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}

            render={props =>
                <Component {...props} ass={rest.ass}
                    drop={rest.drop} currentOrder={rest.currentOrder}/>
            }
        />
    );
}

const OrderDetailsRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props =>
                rest.isLoggedIn ? 
                (<Component {...props} ass={rest.ass}
                    checkout={rest.checkout}
                    checkoutItems={rest.checkoutItems}
                    delete={rest.delete}
                    isLoggedIn={rest.isLoggedIn}
                    currentUser={rest.currentUser}/>)
                    : <Redirect to={{pathname: "/login", state: { from:props.location }}}/>
            }
        />
    );
}

const OrderSummaryRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props =>
                rest.isLoggedIn ? 
                (<Component {...props} ass={rest.ass}
                    order={rest.order}
                    changeOrderStatus={rest.changeOrderStatus}
                    />)
                    : <Redirect to={{pathname: "/login", state: { from:props.location }}}/>
            }
        />
    );
}

const OrderHistoryRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => 
                rest.isLoggedIn ? 
                (
                    <Component {...props} getAllOrders={rest.getAllOrders} setOrderSummaryOrder={rest.setOrderSummaryOrder} />
                ) : (
                    <Redirect to={{pathname: "/login", state: { from:props.location }}}/>
                )
            }
        />
    )
}

const SignupRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}

            render={props =>
                rest.isAuthenticated() ?
                    rest.isAdmin() ? (<Redirect to={{pathname: "/admin", state: { from:props.location }}}/>)
                        : <Redirect to={{pathname: "/profile", state: { from:props.location }}}/>
                    : <Component {...props} submitCredentials={rest.submitCredentials}/>
            }
        />
    );
}


const SignoutRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}

            render={props =>
                rest.isAuthenticated() ? (<Component {...props} signOut={rest.signOut}/>) 
                    : <Redirect to={{ pathname: "/login", state: { from: props.location } }}/>
            }
        />
    );
}


const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props =>
                rest.isAuthenticated()
                    ? (
                        rest.isAdmin() ? <Component {...props} isAdminAuthenticated={rest.isAdminAuthenticated} getUsers={rest.getUsers} submitCredentials={rest.submitCredentials}/> 
                        : <Redirect 
                            to={{pathname: "/404", state: { from:props.location }}}
                        />
                    )
                    : <Redirect 
                        to={{pathname: "/login", state: { from:props.location }}}
                    />
            }
        />
    );
}

const AdminSettingsRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props =>
                rest.isAuthenticated()
                    ? (
                        rest.isAdmin() ? <Component {...props} isAdminAuthenticated={rest.isAdminAuthenticated}/> 
                        : <Redirect 
                            to={{pathname: "/404", state: { from:props.location }}}
                        />
                    )
                    : <Redirect 
                        to={{pathname: "/login", state: { from:props.location }}}
                    />
            }
        />
    );
}

const ProfileRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props =>
                rest.isUserAuthenticated()
                    ? <Component {...props} 
                        userDetails={rest.userDetails()}
                        getAllOrders={rest.getAllOrders}
                        setOrderSummaryOrder={rest.setOrderSummaryOrder}
                        /> 
                    : <Redirect 
                        to={{pathname: "/login", state: { from:props.location }}}
                    />
            }
        />
    );
} 

const ProfileSettingsRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props =>
                rest.isUserAuthenticated()
                    ? <Component {...props} isUserAuthenticated={rest.isUserAuthenticated} userDetails={rest.userDetails()} confirmPassword={rest.confirmCurrentUserPassword} changePassword={rest.changeCurrentUserPassword}/> 
                    : <Redirect 
                        to={{pathname: "/login", state: { from:props.location }}}
                    />
            }
        />
    );
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isAdmin: false,
            currentUser: null,
            checkout: [],
            orderSummaryOrder: {
                total: 0, 
                order: [],
                userId: 0,
                orderTime: Date.now(),
                status: "cancelled",
                address: {
                    address1: "address1",
                    address2: "address2",
                    city: "city",
                    postal: "postal",
                    name: "name",
                    phone: 1234567890
                },
                payment: {
                    cardNumber: 123456789012,
                    nameOnCard: "John Smith", 
                    expiryDate: "1020"
                }
            },
            mostRecentOrder: null,
            allTransactions: []
        }

        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
        this.isAdmin = this.isAdmin.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.isAdminAuthenticated = this.isAdminAuthenticated.bind(this)
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this)
        this.signOut = this.signOut.bind(this)
        this.getCurrentUserDetails = this.getCurrentUserDetails.bind(this)
        this.getUserAddresses = this.getUserAddresses.bind(this)
        this.getUserFavourites = this.getUserFavourites.bind(this)
        this.getUserPaymentInfos = this.getUserPaymentInfos.bind(this)
        this.getUserDietaryRestrictions = this.getUserDietaryRestrictions.bind(this)
        this.drop = this.drop.bind(this)
        this.checkoutItems = this.checkoutItems.bind(this)
        this.delete = this.delete.bind(this)
        this.getAllUsers = this.getAllUsers.bind(this)
        this.checkout = this.checkout.bind(this)
        this.setOrderSummaryOrder = this.setOrderSummaryOrder.bind(this)
        this.getAllOrders = this.getAllOrders.bind(this)
        this.getAllOrdersAsync = this.getAllOrdersAsync.bind(this)
        this.getAllOrdersForUser = this.getAllOrdersForUser.bind(this)
        this.getAllOrdersForCurrentUser = this.getAllOrdersForCurrentUser.bind(this)
        this.changeOrderStatus = this.changeOrderStatus.bind(this)
        this.changeCurrentUserPassword = this.changeCurrentUserPassword.bind(this)
        this.confirmCurrentUserPassword = this.confirmCurrentUserPassword.bind(this)
    }

    login(username, password) {
        log("username: " + username)
        log("password: " + password)

        return fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                id: username,
                password: password,
                type: "username"
            }),
            headers: { "Content-Type": "application/json" }
        }).then(
            res => res.json()
        ).then(
            body => {
                const isAdmin = body.isUserAdmin
                this.setState((prevState, props) => ({
                    isLoggedIn: true, isAdmin: isAdmin, 
                    currentUser: body
                    }));
                console.log("user logged in")
                log(this.state.currentUser)
                return Promise.resolve(this.state.currentUser)
            }
        ).catch(
            error => {
                return Promise.reject(error)
            }
        )
    }

    signup(username, email, password, isAdmin) {
        log("username: " + username)
        log("email: " + email)
        log("password: " + password)

        return fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                isUserAdmin: isAdmin
            }),
            headers: { "Content-Type": "application/json" }
        }).then(
            result => result.text()
        ).catch(
            error => {
                return Promise.reject(error)
            }
        )
    }

    signOut() {
        fetch("/api/users", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            this.setState((prevState, props) => ({
                isLoggedIn: false, isAdmin: false, currentUser: null
            }));
        }).catch(error => {
            console.log(error)
        })
        
    }

    isAdmin() {
        return this.state.isAdmin
    }

    isAuthenticated() {
        return this.state.isLoggedIn
    }

    isAdminAuthenticated() {
        console.log("admin: " + (this.state.isLoggedIn && this.state.isAdmin))
        return this.state.isLoggedIn && this.state.isAdmin
    }

    isUserAuthenticated() {
        console.log("user: " + (this.state.isLoggedIn && !this.state.isAdmin))
        return this.state.isLoggedIn && !this.state.isAdmin
    }

    getCurrentUserDetails() {
        if (!this.isAuthenticated()) {
            return {}
        }

        return {
            user: this.state.currentUser,
            favourites: this.getUserFavourites(this.state.currentUser.userId),
            addresses: this.getUserAddresses(this.state.currentUser.userId),
            paymentInfos: this.getUserPaymentInfos(this.state.currentUser.userId),
            dietaryRestrictions: this.getUserDietaryRestrictions(this.state.currentUser.userId)
        }
    }

    getUserFavourites(userId) {
        if (userId !== this.state.currentUser.userId && !this.state.currentUser.isAdmin) {
            return []
        }
        if (userId === 1) {
            return [
                {
                    nickname: "Yum Burger",
                    ingredients: [
                        "lettuce", "beef patty", "potato bun"
                    ]
                }, 
                {
                    nickname: "Chicken Burger",
                    ingredients: [
                        "lettuce", "chicken patty", "sesame bun"
                    ]
                }
            ]
        } 
        return []
    }

    getUserAddresses(userId) {
        if (userId === this.state.currentUser.userId || this.state.currentUser.isAdmin) {
            return [
                {
                    name: "John Smith",
                    phone: "6471234567",
                    address1: "100 Maginer St",
                    address2: "",
                    city: "Toronto", 
                    province: "Ontario", 
                    postal: "M5L2T6"
                },
                {
                    name: "Jake Smith",
                    phone: "4161234567",
                    address1: "120 Maginer St",
                    address2: "",
                    city: "Toronto", 
                    province: "Ontario", 
                    postal: "M5L2T6"
                }
            ]
        }

        return []
    }

    getUserPaymentInfos(userId) {
        if (userId === this.state.currentUser.userId || this.state.currentUser.isAdmin) {
            return [
                {
                    type: "credit",
                    cardNum: "4100010002000300",
                    expiry: "0520",
                    name: "John Smith"
                },
                {
                    type: "dedit",
                    cardNum: "4100010002000300",
                    expiry: "0520",
                    name: "Jake Smith"
                }
            ]
        }

        return []
    }

    getUserDietaryRestrictions(userId) {
        if (userId === this.state.currentUser.userId || this.state.currentUser.isAdmin) {
            return [
                "fish", "nuts"
            ]
        }
        return []
    }      

    drop(burger) {
        if (burger.length !== 0) {
            let name = burger.find(x => x.default === "patty").name
            name = name.charAt(0).toUpperCase() + name.slice(1) + " Burger"        
            console.log((burger.length*1.5))
            const id = uniqid();
            this.state.checkout.push({
                id: id,
                name: name,
                price: (burger.length*1.5),
                burger: burger
            })
        }
                       
    }

    delete(id) {          
        
        for (let i = 0; i < this.state.checkout.length; i++) {
            if (this.state.checkout[i].id === id) {
                console.log("found name")
                this.state.checkout.splice(i, 1);
            }
        }        
    }
    
    checkoutItems() {
        return this.state.checkout
    }   

    getAllUsers() {
        log("getAllUsers")
        return fetch("/api/users", {
            method: "GET"
        }).then(
            result => { result.text() }
        ).catch(
            error => {
                return Promise.reject(error)
            }
        )
    }

    checkout(address, payment) {
		let total = 0;
		this.state.checkout.forEach((burger) => total += burger.price)
        console.log("userId: " + this.state.currentUser._id)
        
		return fetch("/api/transactions", {
            method: "POST",
            body: JSON.stringify({
                total: total,
                order: this.state.checkout,
                userId: this.state.currentUser._id,
                address: address,
                payment: payment
            }),
            headers: { "Content-Type": "application/json" },
        }).then(result => {
            console.log(result)
            this.setState({
                checkout: []
            })
            
            return result.json()
		}).then(body => {
            log("setting state")
            log(body)
            this.setState({
                mostRecentOrder: body,
                orderSummaryOrder: body
            })
            this.getAllOrdersAsync().then(result => {
                console.log(result)
                this.setState({
                    allTransactions: result,
                })
                if (result.length > 0) {
                    this.setState({
                        mostRecentOrder: result[result.length - 1],
                        orderSummaryOrder: result[result.length - 1]
                    })
                }
            }).catch(error => {
                console.log(error)
            })
            return Promise.resolve(body)
        }).catch(error => {
            console.log(error)
            this.setState({
                checkout: []
            })
            return Promise.reject(error)
		})
    }

    setOrderSummaryOrder(order) {
        log("setting order summary order")
        log(order)
        this.setState({
            orderSummaryOrder: order
        })
    }

    getAllOrders() {
        return this.state.allTransactions
    }

    getAllOrdersAsync() {
        return fetch("/api/transactions", {
            method: "GET"
        }).then(
            result => { 
                console.log(result)
                return result.json() 
            }
        ).catch(
            error => {
                return Promise.reject(error)
            }
        )
    }

    getAllOrdersForUser(userId) {
        return this.state.allTransactions.filter(trans => trans.userId === userId)
    }

    getAllOrdersForCurrentUser() {
        return this.getAllOrdersForUser(this.state.currentUser._id)
    }

    componentDidMount(){
        log("componentDidMount")
        this.getAllOrdersAsync().then(result => {
            console.log(result)
            this.setState({
                allTransactions: result,
            })
            if (result.length > 0) {
                this.setState({
                    mostRecentOrder: result[result.length - 1],
                    orderSummaryOrder: result[result.length - 1]
                })
            }
        }).catch(error => {
            console.log(error)
        })
    }

    changeOrderStatus(updatedOrder) {
        log("changeOrderStatus")
        return fetch("/api/transactions/" + updatedOrder._id, {
            method: "PATCH",
            body: JSON.stringify(updatedOrder),
            headers: { "Content-Type": "application/json" },
        }).then(
            result => { 
                console.log(result)
                return result.json() 
            }
        ).catch(
            error => {
                return Promise.reject(error)
            }
        )
    }

    changeCurrentUserPassword(newPassword) {
        log("changeOrderStatus")
        return fetch("/api/users/" + this.state.currentUser._id, {
            method: "PATCH",
            body: JSON.stringify({password: newPassword}),
            headers: { "Content-Type": "application/json" },
        }).then(
            result => { 
                console.log(result)
                return result.json()
            }
        ).then(body => {
            console.log(body)
            this.setState({
                currentUser: body
            })
            return body
        }).catch(
            error => {
                return Promise.reject(error)
            }
        )
    }

    confirmCurrentUserPassword(password) {
        return fetch("/api/users/" + this.state.currentUser._id, {
            method: "POST",
            body: JSON.stringify({password: password}),
            headers: { "Content-Type": "application/json" },
        }).then(
            result => {
                if (result.status !== 200) {
                    console.log("bad password")
                    return Promise.reject("bad password")
                }
                console.log("confirmed")
                console.log(result)
                return result.json() 
            }
        ).catch(
            error => {
                return Promise.reject(error)
            }
        )
    }

    render() {
        return (
            <Router onUpdate={() => window.scrollTo(0, 0)}>
                <ScrollToTop>
                    <div className="App">
                        {/* navbar */}
                        <Header id="header" isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} user={this.state.currentUser}/>

                        {/* Content of page */}

                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        
                        <LoginRoute path="/login" component={Login} isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} checkCredentials={this.login}/>
                        <SignupRoute path="/signup" component={SignUp} isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} submitCredentials={this.signup}/>
                        <SignoutRoute path="/signout" component={SignOut} isAuthenticated={this.isAuthenticated} signOut={this.signOut}/>

                        <AdminRoute path="/admin" component={Admin} isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} getUsers={this.getAllUsers} submitCredentials={this.signup}/>

                        {/* <Route path="/admin" component={Admin}/> */}
                        <AdminSettingsRoute path="/adminSettings" component={AdminSettings} isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin}/>

                        <ProfileRoute path="/profile" component={Profile} isUserAuthenticated={this.isUserAuthenticated} userDetails={this.getCurrentUserDetails} getAllOrders={this.getAllOrdersForCurrentUser} setOrderSummaryOrder={this.setOrderSummaryOrder}/>

                        {/* <Route path="/profile" render={() => <Profile userDetails={this.getCurrentUserDetails}/>} /> */}
                        <ProfileSettingsRoute path="/profileSettings" component={ProfileSettings} isUserAuthenticated={this.isUserAuthenticated} userDetails={this.getCurrentUserDetails} confirmCurrentUserPassword={this.confirmCurrentUserPassword} changeCurrentUserPassword={this.changeCurrentUserPassword}/>

                        {/**=========changed build route===========*/}
                        <BuildRoute path="/build" component={StartBuilding} ass={this.checck} drop={this.drop} ingredients={this.ingredients} currentOrder={this.state.checkout}/>

                        <OrderHistoryRoute path="/orders" component={OrderHistory} getAllOrders={this.getAllOrdersForCurrentUser} setOrderSummaryOrder={this.setOrderSummaryOrder} isLoggedIn={this.state.isLoggedIn}/>

                        <OrderHistoryRoute path="/ordersAdmin" component={OrderAdmin} getAllOrders={this.getAllOrders} setOrderSummaryOrder={this.setOrderSummaryOrder} isLoggedIn={this.state.isLoggedIn}/>
                        

                        <Route path="/404" component={NotFound}/>

                        <Route path="/customization" component={Customization}/>
                        <Route path="/buns" component={Buns}/>
                        <Route path="/proteins" component={Proteins}/>
                        <Route path="/sauces" component={Sauces}/>
                        <Route path="/sides" component={Sides}/>
                        <Route path="/toppings" component={Toppings}/>
                        <Route path="/veggies" component={Veggies}/>

                        {/**===========Change The order Details Page=================*/}
                        <OrderDetailsRoute path="/order" component={OrderDetails} checkout={this.checkout} checkoutItems={this.checkoutItems()} delete={this.delete} isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser}/>
                        <OrderSummaryRoute path="/orderSummary" component={OrderSummary} checkoutItems={this.checkoutItems()} delete={this.delete} isLoggedIn={this.state.isLoggedIn} order={this.state.orderSummaryOrder}/>
                        <OrderSummaryRoute path="/orderSummaryAdmin" component={OrderSummaryAdmin} checkoutItems={this.checkoutItems()} delete={this.delete} isLoggedIn={this.state.isLoggedIn} order={this.state.orderSummaryOrder === null? this.state.mostRecentOrder : this.state.orderSummaryOrder} changeOrderStatus={this.changeOrderStatus}/>

                        {/* Footer */}
                        <Footer isAuthenticated={this.isAuthenticated} isAdmin={this.isAdmin} user={this.state.currentUser}/>
                    </div>
                </ScrollToTop>
            </Router>
        );
    }
}

export default App;
