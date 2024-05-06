import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useCreateReviewMutation,
  useGetProductByIdQuery,
} from "../redux/slices/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const {
    data: product,
    isLoading,
    refetch,
    isError: error,
  } = useGetProductByIdQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product[0], qty }));
    navigate("/cart");
  };

  const [createReview, { isLoading: productReviewLoader }] =
    useCreateReviewMutation();
    
  const reviewSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await createReview({
        productId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success(res.message);
    } catch (e) {
      toast.error(e?.data?.message || e.error);
      console.error(e);
    }
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
          <Row>
            <Col md={6} className="">
              <h2>Reviews</h2>
              {product[0].reviews.length === 0 && (
                <Message>No reviews </Message>
              )}
              <ListGroup variant="flush">
                {product[0].reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                {userInfo ? (
                  <ListGroupItem>
                    <h2>Write a Customer Review</h2>
                    {productReviewLoader && <Loader />}
                    <Form onSubmit={reviewSubmitHandler}>
                      <FormGroup controlId="rating" className="mb-3">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value="">select....</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup controlId="rating" className="mb-3">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>

                      <Button
                        disabled={productReviewLoader}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  </ListGroupItem>
                ) : (
                  <Message>
                    Please <Link to="/login">Sign In</Link> first to write a
                    review.
                  </Message>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
