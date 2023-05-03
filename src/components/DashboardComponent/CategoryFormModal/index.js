import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewCategory,
  getAllCategories,
  getCategoryDetail,
  setCategoryName,
  updateCategoryProcess,
} from "../../../redux/category/categoryAction";

export default function CategoryFormModal(props) {
  const dispatch = useDispatch();
  const { showCFM, handleCloseCFM, typeModal, categoryId } = props;

  const category = useSelector((state) => state.categoryReducer.category);
  const categoryName = useSelector(
    (state) => state.categoryReducer.categoryName
  );

  const handleAddCategory = () => {
    dispatch(
      addNewCategory({
        category_name: categoryName,
      })
    );
  };

  const handleUpdateCategory = () => {
    dispatch(
      updateCategoryProcess(categoryId, {
        category_name: categoryName,
      })
    );
  };

  useEffect(() => {
    if (typeModal === "Update") {
      dispatch(getCategoryDetail(categoryId));
    } else if (typeModal === "Add") {
      dispatch(setCategoryName(""));
    }
  }, [categoryId, typeModal, dispatch]);

  useEffect(() => {
    if (
      category?.message === "success" &&
      category?.type === "add" &&
      typeModal === "Add"
    ) {
      alert("add category success");
      setTimeout(() => {
        handleCloseCFM(false);
        dispatch(
          getAllCategories({
            orderBy: "id",
            order: "desc",
          })
        );
      }, 2000);
    } else if (
      category?.message === "success" &&
      category?.type === "update" &&
      typeModal === "Update"
    ) {
      alert("udpate category success");
      setTimeout(() => {
        handleCloseCFM(false);
        dispatch(
          getAllCategories({
            orderBy: "id",
            order: "desc",
          })
        );
      }, 2000);
    }
  }, [category]);

  return (
    <Modal show={showCFM} onHide={handleCloseCFM}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0d6efd", color: "white" }}
      >
        <Modal.Title>Category {typeModal}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            value={categoryName}
            type="text"
            placeholder="Category name ..."
            onChange={(e) => {
              dispatch(setCategoryName(e.target.value));
            }}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseCFM}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (typeModal === "Add") {
              handleAddCategory();
            } else if (typeModal === "Update") {
              handleUpdateCategory();
            }
          }}
        >
          Save Category
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
