import React, { useState } from "react";
import { Row, Col, Form, Button, FloatingLabel, Card } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";

function HomePage() {
  const [boarding, setBoarding] = useState("");
  const [dest, setDest] = useState("");
  const [journeyDate, setJourneyDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/bus-tickets",
      search: createSearchParams({
        fromCity: `${ boarding }`,
        toCity: `${ dest }`,
        onward: `${ journeyDate }`,
      }).toString(),
    });
  };

  return (
    <section>
      <div
        id='banner_div'
        style={{
          backgroundImage: "url(/banner.jpg)",
        }}
      ></div>
      <div id='search_div'>
        <section id='search'>
          <div className='search-wrap'>
            <Form onSubmit={handleSubmit}>
              <Row className='align-items-center'>
                <Col xs='auto'>
                  <FloatingLabel label='From'>
                    <Form.Control
                      type='text'
                      placeholder='Please Input From City.'
                      value={boarding}
                      onChange={(e) => setBoarding(e.target.value)}
                    ></Form.Control>
                  </FloatingLabel>
                </Col>
                <Col xs='auto'>
                  <FloatingLabel label='To'>
                    <Form.Control
                      type='text'
                      placeholder='Please Input Destination.'
                      value={dest}
                      onChange={(e) => setDest(e.target.value)}
                    ></Form.Control>
                  </FloatingLabel>
                </Col>
                <Col xs='auto'>
                  <FloatingLabel label='Date'>
                    <Form.Control
                      type='date'
                      value={journeyDate}
                      placeholder='ONWARD DATE'
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setJourneyDate(e.target.value)}
                    ></Form.Control>
                  </FloatingLabel>
                </Col>
                <Col xs='auto'>
                  <Button type='submit'>Search Buses</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </section>
      </div>
      <div>
        <Row>
          <Col>
            <Card
              className='align-items-center'
              style={{ width: "24rem", marginTop: "4rem", marginLeft: "22rem" }}
            >
              <Card.Title>
                <small style={{ fontWeight: "100" }}>
                  Save upto Rs 300 on bus tickets.
                </small>
              </Card.Title>
              <Card.Img variant='top' src='/promo1.png'></Card.Img>
              <Card.Text style={{ marginBottom: "0.5rem" }}>
                Use code EARLYBUS
              </Card.Text>
            </Card>
          </Col>
          <Col>
            <Card
              className='align-items-center'
              style={{
                width: "24rem",
                marginTop: "4rem",
                marginLeft: "0.3rem",
              }}
            >
              <Card.Title>
                <small style={{ fontWeight: "100" }}>
                  Save upto Rs 300 on bus tickets.
                </small>
              </Card.Title>
              <Card.Img variant='top' src='/promo2.png'></Card.Img>
              <Card.Text style={{ marginBottom: "0.5rem" }}>
                Use code SUPERHIT
              </Card.Text>
            </Card>
          </Col>
          <Col>
            <Card
              className='align-items-center'
              style={{
                width: "24rem",
                marginTop: "4rem",
                marginRight: "22rem",
              }}
            >
              <Card.Title>
                <small style={{ fontWeight: "100" }}>
                  Save upto Rs 200 on bus tickets in Chennai.
                </small>
              </Card.Title>
              <Card.Img variant='top' src='/promo3.png'></Card.Img>
              <Card.Text style={{ marginBottom: "0.5rem" }}>
                Use code RB200
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default HomePage;
