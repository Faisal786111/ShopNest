import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useUpdateOrderByIdMutation,
  useUploadProductImageMutation,
} from "../../redux/slices/productApiSlice";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [updateProduct, setUpdateProduct] = useState({
    name: "",
    price: "",
    brand: "",
    countInStock: "",
    category: "",
    description: "",
  });

  const [image, setImage] = useState("");

  const [updateProductById, { isLoading: loadingUpdate }] =
    useUpdateOrderByIdMutation();

  const [uploadProductImage, { isLoading: loadingUplaodImage }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  const {
    data: products,
    isLoading: loadingProduct,
    isError: error,
  } = useGetProductByIdQuery(productId);

  useEffect(() => {
    if (products) {
      const [product] = products;

      if (product) {
        const {
          name,
          price,
          brand,
          countInStock,
          category,
          description,
          image,
        } = product;
        setUpdateProduct((prevState) => ({
          ...prevState,
          name,
          price,
          brand,
          countInStock,
          category,
          description,
        }));
        setImage(image);
        console.log(updateProduct);
      }
    }
  }, [products]);

  const productChangeHandler = (e, image) => {
    const { name, value } = e.target;

    setUpdateProduct((prevState) => {
      console.log(prevState);
      return { ...prevState, [name]: value };
    });

    console.log(updateProduct);
  };

  const uploadFileHandler = async (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    console.log(formData.get("image"));

    try {
      const { image, message } = await uploadProductImage(formData).unwrap();
      setImage(image);
      toast.success(message);
    } catch (e) {
      toast.error(e?.data?.message || e.error);
      console.log("Error while uploading the image of product", e);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProductById({
        updateProduct,
        productId,
      }).unwrap();
      console.log(res);
      navigate("/admin/productlist");
      toast.success("Product updated successfully.");
    } catch (e) {
      toast.error(e?.data?.message || e.error);
      console.log(e);
    }
    console.log("submit");
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-block btn-light my-3">
        Go Back
      </Link>
      {loadingProduct && <Loader />}
      {loadingUpdate ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>Edit Product</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={updateProduct.name}
                onChange={productChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={updateProduct.price}
                onChange={productChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                name="name"
                value={image}
                onChange={(e)=> setImage(e.target.files[0])}
              />
              <Form.Control
                type="file"
                label="Choose file"
                placeholder="Enter price"
                onChange={uploadFileHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="bran">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                name="brand"
                value={updateProduct.brand}
                onChange={productChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                name="countInStock"
                value={updateProduct.countInStock}
                onChange={productChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={updateProduct.category}
                onChange={productChangeHandler}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={updateProduct.description}
                onChange={productChangeHandler}
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

export default ProductEditScreen;
