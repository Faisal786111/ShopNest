import { Form, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setCredentials } from "../redux/slices/authSlice";
import { useLoginMutation } from "../redux/slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    // toast.success("Here is your toast.", {
    //   style: {
    //     border: "1px solid #7b8a8b",
    //     padding: "16px",
    //     color: "#7b8a8b",
    //   },
    //   iconTheme: {
    //     primary: "#7b8a8b",
    //     secondary: "#FFFAEE",
    //   },
    // });

    e.preventDefault();
    try {
      // unwrap() is used to return promise.
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Succesfully registered");
      navigate(redirect);
    } catch (e) {
      toast.error(e?.data?.message || e.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          Submit
        </Button>
        {isLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
