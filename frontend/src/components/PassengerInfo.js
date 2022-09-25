import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PassengerInfo({ showModal, setShowModal, busId,onward }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submitHandler = () => {
    const createBooking = async () => {
      try {
        const data = { name, age, gender, email, phone, busId,onward };
        console.log("data", data);
        const response = await axios.post("/bus-tickets/book", data);
        if (response.status === 200) {
          navigate("/bus-tickets/booking-confirmation");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    createBooking();
  };
  return (
    <div>
      <Modal size='lg' show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Passenger Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className='mb-3' controlId='name'>
              <Form.Label column sm={2} className='float-left'>
                Name:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='age'>
              <Form.Label column sm={2}>
                Age:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='number'
                  placeholder='Enter Age'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='gender'>
              <Form.Label column sm={2}>
                Gender:
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  inline
                  label='Male'
                  name='gender'
                  type='radio'
                  value='male'
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  inline
                  label='Female'
                  name='gender'
                  type='radio'
                  value='female'
                  onChange={(e) => setGender(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='email'>
              <Form.Label column sm={2}>
                Email:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='phoneNumber'>
              <Form.Label column sm={2}>
                Phone:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  placeholder='Enter Number'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel Booking
          </Button>
          <Button type='submit' onClick={() => submitHandler()}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PassengerInfo;
