import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductByIdQuery } from "../redux/slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError: error,
  } = useGetProductByIdQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({...product[0], qty}));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error || "Something went wrong"}
        </Message>
      ) : (
        <>
          <Link className="btn btn-light my-3" to="/">
            Go Back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product[0].image} alt={product[0].name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product[0].name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product[0].rating}
                    text={product[0].numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price : {product[0].price}</ListGroup.Item>
                <ListGroup.Item>
                  Description : {product[0].description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product[0].price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product[0].countInStock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product[0].countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product[0].countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product[0].countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
