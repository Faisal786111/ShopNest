import { useEffect, useState } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useProfileMutation } from "../redux/slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../redux/slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {
    userInfo: { name, email },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [userProfile, { isLoading }] = useProfileMutation();
  const {
    data: orders,
    isLoading: orderLoading,
    isError: error,
  } = useGetMyOrdersQuery();
  console.log(orders);

  useEffect(() => {
    if (name && email) {
      setProfile((prevState) => ({ ...prevState, name, email }));
    }
  }, [name, email]);

  const profileChangeHandler = (e) => {
    const { name, value } = e.target;
    setProfile((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit");
    try {
      const {
        message,
        user: { name, email },
      } = await userProfile(profile).unwrap();

      console.log(name, email);

      dispatch(setCredentials({ name: profile.name, email: profile.email }));
      toast.success(message);
    } catch (e) {
      toast.error(e?.data?.message || e.message);
      console.error(e);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <Form onSubmit={submitHandler}>
          <h2>User Profile</h2>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={profile.name}
              onChange={profileChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={profile.email}
              onChange={profileChangeHandler}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={profile.password}
              onChange={profileChangeHandler}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>
          {isLoading && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {orderLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error?.error}
          </Message>
        ) : (
          <Table striped hover responsive className="">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
