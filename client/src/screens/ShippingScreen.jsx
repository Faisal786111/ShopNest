import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);

  const [shippingAddress, setShippingAddress] = useState(
    cart.shippingAddress || {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("handle change");
    setShippingAddress((prevState) => ({ ...prevState, [name]: value }));
    console.log(shippingAddress);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit");
    dispatch(saveShippingAddress(shippingAddress));
    navigate("/payment");
  };

  useEffect(() => {
    console.log(shippingAddress);
  }, [shippingAddress]);

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            required
            onChange={handleChange}
            name="address"
            value={shippingAddress.address}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            required
            onChange={handleChange}
            name="city"
            value={shippingAddress.city}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            required
            onChange={handleChange}
            name="postalCode"
            value={shippingAddress.postalCode}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            required
            onChange={handleChange}
            name="country"
            value={shippingAddress.country}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
