import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, Container, Row, Col, Dropdown, Form } from "react-bootstrap";

import style from "./index.module.css";
import MyPagination from "../../components/MyPagination";
import { fetchProducts } from "../../redux/product/productAction";

export default function Index() {
  const dispatch = useDispatch();
  // const [products, setProducts] = useState([]);
  const products = useSelector((state) => state.productReducer.products);
  const pageCount = useSelector((state) => state.productReducer.pageCount);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    const queryParams = {};

    queryParams.limit = 20;

    if (page) {
      queryParams["page"] = page;
    }

    if (search) {
      queryParams["search"] = search;
    }

    if (order) {
      queryParams["order"] = order;
    }

    if (orderBy) {
      queryParams["orderBy"] = orderBy;
    }

    // action di panggil disini
    dispatch(fetchProducts(queryParams));
    console.log("products ===> ", products);
  }, [page, search, order, orderBy, dispatch]);

  useEffect(() => {
    const queryParams = {};

    queryParams.limit = 20;

    if (page) {
      queryParams["page"] = page;
    }
    dispatch(fetchProducts(queryParams));
  }, []);

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}> Product </h1>

      <Row style={{ marginTop: 20 }}>
        <Col md={6}>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Select
                aria-label="Sort By"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option>Sort by</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Sort : {order === "asc" ? "Ascending" : "Descending"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#" onClick={() => setOrder("asc")}>
                    Ascending
                  </Dropdown.Item>
                  <Dropdown.Item href="#" onClick={() => setOrder("desc")}>
                    Descending
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
        <Col md={6}>
          <MyPagination
            page={page}
            setPage={setPage}
            pageCount={pageCount}
          ></MyPagination>
        </Col>
      </Row>
      <div className={style["product-list"]}>
        {products
          ? products?.map((item) => {
              return (
                <a
                  href={`/product/${item.id}`}
                  className={style["product-item"]}
                >
                  <Card>
                    <Card.Img
                      variant="top"
                      height={150}
                      src={
                        item.productImage
                          ? "http://localhost:4500/products/" +
                            item.productImage
                          : "http://localhost:4500/products/no-image.png"
                      }
                    />
                    <Card.Body>
                      <Card.Title>{item.productName}</Card.Title>
                      <Card.Text>{item.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              );
            })
          : JSON.stringify(products)}
      </div>
      <Row>
        <Col md={6}></Col>
        <Col md={6}>
          <MyPagination
            page={page}
            setPage={setPage}
            pageCount={pageCount}
          ></MyPagination>
        </Col>
      </Row>
    </Container>
  );
}
