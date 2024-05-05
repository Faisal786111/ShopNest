import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../redux/slices/usersApiSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import toast from "react-hot-toast";
import { Form, Button } from "react-bootstrap";

const UserEditScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  const { id: userId } = useParams();

  const {
    data: userDetails,
    isLoading,
    refetch,
    isError: error,
  } = useGetUserByIdQuery(userId);

  const [updateUser, { isLoading: updateLoader }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      const { name, email, isAdmin } = userDetails;
      setName(name);
      setEmail(email);
      setIsAdmin(isAdmin);
      console.log("Name" , name , "email " , email , "isAdmin " , isAdmin);
    }
  }, [userDetails]);
  console.log("Name" , name , "email " , email , "isAdmin " , isAdmin);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({
        name: name,
        email: email,
        isAdmin: isAdmin,
        userId: userId,
      }).unwrap();
      console.log(res);
      toast.success("User updated successfully.");
      navigate("/admin/userlist");
      refetch();
    } catch (e) {
      toast.error(e?.data?.message || e.error);
      console.log(e);
    }
    console.log("submit");
  };
  return (
    <>
      <Link to="/admin/userList" className="btn btn-block btn-light my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <FormContainer>
          <h1>Edit User</h1>
          {updateLoader && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default UserEditScreen;
