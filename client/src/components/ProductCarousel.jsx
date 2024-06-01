import { useGetTopRatedProductsQuery } from "../redux/slices/productApiSlice";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopRatedProductsQuery();
  console.log(products);
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel puase="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} ${product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
