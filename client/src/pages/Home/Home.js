import React from 'react';

import { Carousel, Button, Container, Row, Col, Card } from 'react-bootstrap';

import './Home.css'
import NavLink from '../../components/NavLink/NavLink'

const StartBuildingButton = () => {
    return (
        <Button variant="success">
        <NavLink to="/build">
        Start Building
        </NavLink>
        </Button>
    );
}

const home = () => {
    return (
        <div className="home">
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://i1.wp.com/sautemagazine.com/wp-content/uploads/2016/10/burgers-banner.jpg?ssl=1"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Only the freshest ingredients</h3>
                        <StartBuildingButton/>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="http://www.burgersage.com/wp-content/uploads/2016/07/img-new-burger-banner.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Fully customizable, fully yours</h3>
                        <StartBuildingButton/>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://s3-ap-southeast-1.amazonaws.com/cdn.quickee.lk/7154/conversions/banner_image.jpg"
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Delivered right to your door</h3>
                        <StartBuildingButton/>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

            <Container className="home-content">
                <Row>
                    <Col md={12}>
                        <div className="section-title">
                            <h2 style={{ marginBottom: "20px", fontSize:"35px" }}>Trending Burgers</h2>
                            <h4>Pulled Pork Angus Deluxe</h4>
                            <p>Ingredients: Potato bun, beef patty, pulled pork, lettuce, tomato, pickles, onions, ketchup, Big Mike sauce</p>
                            <Button variant="success">
                            <NavLink to="/build">
                            Add to Order
                            </NavLink>
                            </Button>
                        </div>
                        
                        <div className="product-item bg-light">
                            <Card>
                                <div className="thumb-content">
                                    {/* <a href=""> */}
                                        <img className="card-img-top img-fluid" src="https://www.buffalowildwings.com/globalassets/menuitems/10210001-big-jack-daddy-burger.png" alt="Card cap"/>
                                    {/* </a> */}
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default home;