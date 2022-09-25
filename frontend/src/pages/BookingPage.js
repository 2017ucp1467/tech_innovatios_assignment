import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import PassengerInfo from "../components/PassengerInfo";
import Loader from "../components/Loader";
import Message from "../components/Message";

function BookingPage() {
  const [queryParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [busList, setBusList] = useState([]);
  const [busId, setBusId] = useState("");
  const [onward, setOnward] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get(`/bus-tickets?${queryParams}`);
        console.log(response.data);
        setBusList(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchBuses();
  }, []);

  const handleBooking = (id) => {
    setBusId(id);;
    setOnward(queryParams.get("onward"));
    setShowModal(true);
  };

  return (
    <>
      <div id='booking_div'>
        <Row className='py-3'>
          <Col xs='auto'>
            <span title={queryParams.get("fromCity")}>
              {`${queryParams.get("fromCity")}`.toUpperCase()}
            </span>
            <i
              className='fas fa-arrow-right'
              style={{ marginLeft: "0.5rem" }}
            ></i>
          </Col>
          <Col xs='auto'>
            <span title={queryParams.get("toCity")}>
              {`${queryParams.get("toCity")}`.toUpperCase()}
            </span>
          </Col>
          <Col xs='auto'>
            <i
              className='far fa-less-than'
              style={{ marginLeft: "0.1rem", marginRight: "0.2rem" }}
            ></i>
            <span title={queryParams.get("onward")}>
              {`${queryParams.get("onward")}`.toUpperCase()}
            </span>
            <i
              className='far fa-greater-than'
              style={{ marginLeft: "0.5rem" }}
            ></i>
          </Col>
        </Row>
      </div>
      <div className='align-items-center'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Table
            striped
            bordered
            hover
            style={{ marginLeft: "2rem", marginRight: "5rem" }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Departure</th>
                <th>Duration</th>
                <th>Arrival</th>
                <th>Fare</th>
                <th>Seats Available</th>
              </tr>
            </thead>
            <tbody>
              {busList.map((bus) => (
                <tr key={bus.id}>
                  <td>
                    {bus.name}
                    <br></br>
                    <small>{bus.bus_type}</small>
                  </td>
                  <td>{bus.departure}</td>
                  <td>{bus.duration}</td>
                  <td>{bus.arrival}</td>
                  <td>Rs {bus.fare}</td>
                  <td>
                    {bus.seats_available ? (
                      <Button
                        type='button'
                        onClick={() => handleBooking(bus.id)}
                      >
                        Book Now
                      </Button>
                    ) : (
                      <Button disabled>Seats Full</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <PassengerInfo
        showModal={showModal}
        setShowModal={setShowModal}
        busId={busId}
        onward={onward}
      />
    </>
  );
}

export default BookingPage;
