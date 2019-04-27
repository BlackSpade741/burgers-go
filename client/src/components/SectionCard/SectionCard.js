import React from 'react'

import { Container, Row, Col, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import './SectionCard.css'

const sectionCard = (props) => {
    if ("to" in props) {
        return (
            <LinkContainer className="link-card" to={props.to}>
                <Container className="section-card">
                    <Row style={{ height: "100%" }}>
                        <Col sm={3}>
                            <Image className="card-img" src={props.imgSrc} thumbnail/>
                        </Col>
                        <Col>
                            <div className="card-content">
                                <h4>{props.title}</h4>
                                <p>
                                    {props.children}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </LinkContainer>
        );
    }
    return (
        <Container className="section-card">
                    <Row style={{ height: "100%" }}>
                        <Col sm={3}>
                            <Image className="card-img" src={props.imgSrc} thumbnail/>
                        </Col>
                        <Col>
                            <div className="card-content">
                                <h4>{props.title}</h4>
                                {props.children}
                            </div>
                        </Col>
                    </Row>
                </Container>
    );
}

export default sectionCard;