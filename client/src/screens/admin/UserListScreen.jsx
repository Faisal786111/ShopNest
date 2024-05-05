import { useEffect, useState } from "react";
import { useGetUsersDetailsQuery } from "../../redux/slices/usersApiSlice";
import { Row, Col, Table, Button } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";

const UserListScreen = () => {
  const { data: usersDetail, isLoading, isError } = useGetUsersDetailsQuery();
  console.log(usersDetail);

  const deleteHandler = (userId) => {
    console.log("Dleete : ", userId);
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">
      {isError?.data?.message || isError.error}
    </Message>
  ) : (
    <>
      <h1>Users</h1>
      <Table striped hover responsive className="">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usersDetail.length ? (
            usersDetail.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button className="btn-sm mx-2" variant="light">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <td colSpan={6}>
              <Message variant="secondary">User not found.</Message>
            </td>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UserListScreen;
