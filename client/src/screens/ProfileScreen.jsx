import { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useProfileMutation } from "../redux/slices/usersApiSlice";
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

  useEffect(() => {
    if (name && email) {
      setProfile((prevState) => ({ ...prevState, name, email }));
      console.log(profile);
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
      <Col md={9}></Col>
    </Row>
  );
};

export default ProfileScreen;
