import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Row, Table } from "react-bootstrap";
import MyPagination from "../../../components/MyPagination";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategories,
  deleteCategoryProcess,
} from "../../../redux/category/categoryAction";
import Swal from "sweetalert2";

import CategoryFormModal from "../../../components/DashboardComponent/CategoryFormModal";

import style from "./index.module.css";

export default function Category() {
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categoryReducer.categories);
  const pageCount = useSelector((state) => state.categoryReducer.pageCount);

  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("id");

  const [showCFM, setShowCFM] = useState(false);
  const [typeModal, setTypeModal] = useState("Add");
  const [categoryId, setCategoryId] = useState(0);

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

    dispatch(getAllCategories(queryParams));
  }, [page, search, orderBy, order, dispatch]);

  const handleCloseCFM = () => {
    setShowCFM(false);
  };

  const handleShowUpdateModal = (id) => {
    setTypeModal("Update");
    setCategoryId(id);
    setShowCFM(true);
  };

  const handleDeleteModal = (id, categoryName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this category '" + categoryName + "' !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategoryProcess(id));
        dispatch(
          getAllCategories({
            orderBy: "id",
            order: "desc",
          })
        );
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      }
    });
  };

  return (
    <div>
      <h3 className={style["header-title"]}> Category List </h3>
      <CategoryFormModal
        showCFM={showCFM}
        handleCloseCFM={handleCloseCFM}
        typeModal={typeModal}
        categoryId={categoryId}
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
                <option value="category_name">Category Name</option>
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
              setShowCFM(true);
              setTypeModal("Add");
            }}
          >
            {" "}
            + Add Category{" "}
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
            <th> Category </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.categoryName}</td>
              <td>
                <Button
                  href="#"
                  type={"button"}
                  variant="danger"
                  className={style["table-btn"]}
                  onClick={() => {
                    handleDeleteModal(item.id, item.categoryName);
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
