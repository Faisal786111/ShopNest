import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../redux/slices/productApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading, isError: error } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <div>...Loading</div>
      ) : error ? (
        <div>{error?.data?.message || error.error || "Something went wrong"}</div>
      ) : (
        <>
          <h1>Latest Products</h1>
          {products?.length > 0 ? (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <div>No products available.</div>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
