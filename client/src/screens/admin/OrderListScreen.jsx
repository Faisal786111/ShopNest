import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useGetAllOrdersQuery } from "../../redux/slices/ordersApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import {Link} from "react-router-dom"

const OrderListScreen = () => {
  const { data: orders, isLoading, isError: error } = useGetAllOrdersQuery();
  console.log(orders);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error}</Message>
  ) : (
    <Table striped hover responsive className="">
      <thead>
        <tr>
          <th>ID</th>
          <th>NAME</th>
          <th>DATE</th>
          <th>TOTAL</th>
          <th>PAID</th>
          <th>DELIVERED</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.length ? (
          orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user && order.user.name}</td>
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
          ))
        ) : (
          <td colSpan={6}>
            <Message variant="secondary">
              There are no order history. <Link to={`/`}>Go Back</Link>
            </Message>
          </td>
        )}
      </tbody>
    </Table>
  );
};

export default OrderListScreen;
