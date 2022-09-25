import React from "react";
import { Row, Col } from "react-bootstrap";

function ConfirmationPage() {
  return (
    <div id='booking_success'>
      <Row>
        <Col style={{ marginLeft: "5rem" }}>
          <img src='/success.jpeg' alt='success-img'></img>
          <p style={{ marginLeft: "3rem" }}>Congratulations!</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Your booking is Successful.You will receive an email with booking
            details shortly.
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default ConfirmationPage;
