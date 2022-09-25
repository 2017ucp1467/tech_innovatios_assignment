import React from "react";
import { Navbar, Container, Image, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <header>
      <Navbar
        bg='primary'
        style={{ color: "#d84f57" }}
        variant='dark'
        expand='lg'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <Row>
                <Col>
                  <Image
                    src='/logo.png'
                    style={{ width: "50px", height: "50px" }}
                    className='d-inline-block align-top'
                    alt='logo'
                    roundedCircle
                  />
                </Col>
                <Col>
                  <h2>Welcome to RedBus.</h2>
                </Col>
              </Row>
            </Navbar.Brand>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
