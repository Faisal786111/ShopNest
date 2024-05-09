import { Form, Button, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    if (keyword.trim()) {
        setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex align-items-center justify-content-center " style={{height : "50px"}}>
      <FormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5 "
      ></FormControl>
      <Button type="submit" variant="outline-light" className="p-2 m-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
