import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Modal,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "../../redux/auth/authAction";
import { Formik } from "formik";
import * as Yup from "yup";

import style from "./index.module.css";

export default function Register() {
  const dispatch = useDispatch();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [passwordRepeat, setPassworRepeat] = useState("");
  const loading = useSelector((state) => state.authReducer.loading);
  const success = useSelector((state) => state.authReducer.success);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, "Name too short!")
      .max(50, "Name too long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string()
      .min(5, "Password minimal 6 characters")
      .required("Password Required"),
    passwordRepeat: Yup.string()
      .min(5, "Password minimal 6 characters")
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password Repeat Required"),
  });

  return (
    <div className={style.register}>
      <Container>
        <Modal show={success}>
          <Modal.Header color="primary">
            <Modal.Title>Login Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>You are redirecting to Login Page</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" href="/login">
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="justify-content-md-center">
          <Col md={5}>
            <Card>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  passwordRepeat: "",
                }}
                validationSchema={RegisterSchema}
                onSubmit={(values) => {
                  dispatch(
                    authRegister({
                      name: values.name,
                      email: values.email,
                      password: values.password,
                      password_again: values.passwordRepeat,
                    })
                  );
                }}
              >
                {({
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                }) => (
                  <Form method="post" onSubmit={handleSubmit}>
                    <Card.Header>
                      <h3 style={{ textAlign: "center" }}>Register</h3>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group className="mb-3">
                        <Form.Label> Name </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></Form.Control>

                        <Form.Text
                          style={{ color: errors.email ? "red" : "green" }}
                        >
                          {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                          ) : null}
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label> Email </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Text
                          style={{ color: errors.email ? "red" : "green" }}
                        >
                          {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                          ) : null}
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label> Password </Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Text
                          style={{ color: errors.email ? "red" : "green" }}
                        >
                          {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                          ) : null}
                        </Form.Text>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label> Password Repeat </Form.Label>
                        <Form.Control
                          type="password"
                          name="passwordRepeat"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        ></Form.Control>
                        <Form.Text
                          style={{ color: errors.email ? "red" : "green" }}
                        >
                          {errors.passwordRepeat && touched.passwordRepeat ? (
                            <div>{errors.passwordRepeat}</div>
                          ) : null}
                        </Form.Text>
                      </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                      <Row>
                        <Col md={6}></Col>
                        <Col md={6} style={{ textAlign: "right" }}>
                          <Button
                            className={style["btn-submit"]}
                            type="submit"
                            variant="primary"
                            disabled={loading}
                          >
                            {" "}
                            Register{" "}
                          </Button>
                          <Button
                            className={style["btn-cancel"]}
                            type="button"
                            variant="secondary"
                          >
                            {" "}
                            Cancel{" "}
                          </Button>
                        </Col>
                      </Row>
                    </Card.Footer>
                  </Form>
                )}
              </Formik>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
