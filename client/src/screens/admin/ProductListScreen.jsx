import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductByIdMutation,
} from "../../redux/slices/productApiSlice";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import toast from "react-hot-toast";
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const {
    data,
    refetch,
    isLoading,
    isError: error,
  } = useGetProductsQuery({ pageNumber });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductByIdMutation();

  const createProductHandler = async () => {
    if (window.confirm("Are you sure , you want to create product.")) {
      try {
        await createProduct().unwrap();
        refetch();
        toast.success("Product created Successfully.");
      } catch (e) {
        toast.error(e?.data?.message || e.error);
        console.error(e);
      }
    }
  };

  const deleteHandler = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      refetch();
      toast.success("Product deleted Successfully.");
    } catch (e) {
      toast.error(e?.data?.message || e.error);
      console.error(e);
    }
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm sm-3 " onClick={createProductHandler}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.products.length ? (
              data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button className="btn-sm mx-2" variant="light">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      className="btn-sm"
                      variant="danger"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <td colSpan={6}>
                <Message variant="secondary">
                  There are no product history. <Link to={`/`}>Go Back</Link>
                </Message>
              </td>
            )}
          </tbody>
        </Table>
      )}

      {data ? (
        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
      ) : isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : null}
    </>
  );
};

export default ProductListScreen;
