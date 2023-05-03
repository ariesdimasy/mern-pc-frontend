import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  createProduct,
  updateProductProcess,
  fetchProducts,
} from "../../../redux/product/productAction";
import { getAllCategories } from "../../../redux/category/categoryAction";

const authStorage = JSON.parse(localStorage.getItem("authStorage"));

export default function ProductFormModal(props) {
  const dispatch = useDispatch();
  const { showCFM, handleCloseCFM, typeModal, product } = props;

  const categories = useSelector((state) => state.categoryReducer.categories);

  const handleAddProduct = (data) => {
    dispatch(createProduct(data));
  };

  const handleUpdateProduct = (data) => {
    dispatch(updateProductProcess(product.id, data));
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (
      product?.message === "success" &&
      product?.type === "add" &&
      typeModal === "Add"
    ) {
      alert("add product success");
      setTimeout(() => {
        handleCloseCFM();
        dispatch(
          fetchProducts({
            orderBy: "id",
            order: "desc",
          })
        );
      }, 2000);
    } else if (
      product?.message === "success" &&
      product?.type === "update" &&
      typeModal === "Update"
    ) {
      alert("udpate product success");
      setTimeout(() => {
        handleCloseCFM();
        dispatch(
          fetchProducts({
            orderBy: "id",
            order: "desc",
          })
        );
      }, 2000);
    }
  }, [dispatch, product]);

  const ProductSchema = Yup.object().shape({
    productName: Yup.string()
      .min(5, "Product Name too short!")
      .max(200, "Product Name too long!")
      .required("Product name is Required"),
    description: Yup.string()
      .min(5, "Description too short!")
      .max(10000, "Description too long!")
      .required("Description Required"),
    price: Yup.number().required().positive().integer(),
    categoryId: Yup.number().required().positive().integer(),
  });

  return (
    <Modal show={showCFM} onHide={handleCloseCFM}>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#0d6efd", color: "white" }}
      >
        <Modal.Title>Product {typeModal}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          productName: product?.productName || "",
          price: product?.price || 0,
          description: product?.description || "",
          categoryId: product?.Category?.id || 0,
        }}
        validationSchema={ProductSchema}
        onSubmit={(values) => {
          if (typeModal === "Add") {
            handleAddProduct({
              product_name: values.productName,
              price: values.price,
              description: values.description,
              category_id: values.categoryId,
              user_id: authStorage?.id,
            });
          } else if (typeModal === "Update") {
            handleUpdateProduct({
              product_name: values.productName,
              price: values.price,
              description: values.description,
              category_id: values.categoryId,
              user_id: authStorage.id,
            });
          }
        }}
      >
        {({ errors, touched, handleSubmit, handleChange, handleBlur }) => (
          <Form method="post" onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  defaultValue={product?.productName || ""}
                  name="productName"
                  type="text"
                  placeholder="product name ..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Text
                  style={{ color: errors.productName ? "red" : "green" }}
                >
                  {errors.productName && touched.productName ? (
                    <div>{errors.productName}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  defaultValue={product?.price || 0}
                  name="price"
                  type="text"
                  placeholder="price ..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Text style={{ color: errors.price ? "red" : "green" }}>
                  {errors.price && touched.price ? (
                    <div>{errors.price}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  defaultValue={product?.description || ""}
                  name="description"
                  as="textarea"
                  placeholder="desciption ..."
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Text
                  style={{ color: errors.description ? "red" : "green" }}
                >
                  {errors.description && touched.description ? (
                    <div>{errors.description}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  defaultValue={product?.Category?.id || 0}
                  name="categoryId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option>-- Select Category --</option>
                  {categories.map((item) => (
                    <option value={item.id}>{item.categoryName}</option>
                  ))}
                </Form.Select>
                <Form.Text
                  style={{ color: errors.categoryId ? "red" : "green" }}
                >
                  {errors.categoryId && touched.categoryId ? (
                    <div>{errors.categoryId}</div>
                  ) : null}
                </Form.Text>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseCFM}>
                Close
              </Button>
              <Button type="submit">Save product</Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
