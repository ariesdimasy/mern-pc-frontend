import React, { useEffect, useState, useRef } from "react";
import {
  Badge,
  Button,
  Col,
  Dropdown,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import MyPagination from "../../../components/MyPagination";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchDetailProduct,
  setEmptyProduct,
  deleteProductProcess,
} from "../../../redux/product/productAction";
import { formatingNumber, apiUrl } from "../../../helpers";

import Swal from "sweetalert2";

import ProductFormModal from "../../../components/DashboardComponent/ProductFormModal";

import style from "./index.module.css";

export default function Product() {
  const dispatch = useDispatch();
  const prevProduct = useRef();

  const product = useSelector((state) => state.productReducer.product);
  const products = useSelector((state) => state.productReducer.products);
  const pageCount = useSelector((state) => state.productReducer.pageCount);

  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("id");

  const [showCFM, setShowCFM] = useState(false);
  const [typeModal, setTypeModal] = useState("Add");
  const [productId, setProductId] = useState(0);

  useEffect(() => {
    const queryParams = {};

    queryParams.limit = 10;

    if (search) {
      queryParams["search"] = search;
    }

    if (order) {
      queryParams["order"] = order;
    }

    if (orderBy) {
      queryParams["orderBy"] = orderBy;
    }

    if (page) {
      queryParams["page"] = page;
    }

    dispatch(fetchProducts(queryParams));
  }, [page, search, orderBy, order, dispatch]);

  useEffect(() => {
    if (productId) {
      dispatch(fetchDetailProduct(productId));
    }
  }, [productId, dispatch]);

  useEffect(() => {
    if (product?.message) {
      prevProduct.current = product?.data;
    } else {
      prevProduct.current = product;
      if (product?.id) {
        setShowCFM(true);
      }
    }
  }, [product]);

  const handleCloseCFM = () => {
    setShowCFM(false);
    setProductId(0);
  };

  const handleShowUpdateModal = (id) => {
    setTypeModal("Update");
    setProductId(id); // 72

    alert(JSON.stringify(prevProduct.current));
    if (prevProduct.current.id === id) {
      setShowCFM(true);
    }
  };

  const handleDeleteModal = (id, productName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product '" + productName + "' !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductProcess(id));
        dispatch(
          fetchProducts({
            orderBy: "id",
            order: "desc",
          })
        );
        setOrderBy("id");
        setOrder("desc");
        setPage(1);
        Swal.fire("Deleted!", "product has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <h3 className={style["header-title"]}> Product List </h3>
      <ProductFormModal
        showCFM={showCFM}
        handleCloseCFM={handleCloseCFM}
        typeModal={typeModal}
        product={product}
      />
      <Row style={{ paddingTop: 20, marginBottom: 20 }}>
        <Col md={10}>
          <Row>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="search"
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
                <option value="id">ID</option>
                <option value="product_name">product Name</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  Sort : {order === "desc" ? "Descending" : "Ascending"}
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
        <Col md={2} style={{ textAlign: "right" }}>
          <Button
            onClick={() => {
              setEmptyProduct();
              setShowCFM(true);
              setTypeModal("Add");
            }}
          >
            {" "}
            + Add product{" "}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={5}></Col>
        <Col md={7} style={{ textAlign: "right" }}>
          <MyPagination
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            className={style.pagination}
          />
        </Col>
      </Row>
      <Table striped responsive bordered hover>
        <thead>
          <tr>
            <th style={{ width: 30 }}> ID </th>
            <th style={{ width: 150 }}> Product Image </th>
            <th> Product name </th>
            <th> Price </th>
            <th> Category </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>
                <Image
                  height={150}
                  src={
                    item.productImage
                      ? apiUrl("products/" + item.productImage)
                      : apiUrl("products/no-image.png")
                  }
                ></Image>
              </td>
              <td>{item.productName}</td>
              <td>{formatingNumber(item.price)}</td>
              <td>
                <Badge bg="primary">{item.Category.categoryName}</Badge>
              </td>
              <td>
                <Button
                  href="#"
                  type={"button"}
                  variant="danger"
                  className={style["table-btn"]}
                  onClick={() => {
                    handleDeleteModal(item.id, item.productName);
                  }}
                >
                  Delete
                </Button>
                <Button
                  href="#"
                  type={"button"}
                  variant="primary"
                  className={style["table-btn"]}
                  onClick={() => {
                    handleShowUpdateModal(item.id);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col md={5}></Col>
        <Col md={7} style={{ textAlign: "right" }}>
          <MyPagination
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            className={style.pagination}
          />
        </Col>
      </Row>
    </div>
  );
}
