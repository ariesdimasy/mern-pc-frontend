import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../redux/auth/authAction";

import style from "./index.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.authReducer.loading);
  const dispatch = useDispatch();

  const onLoginSubmit = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(authLogin(email, password));
    }
  };

  return (
    <div className={style.login}>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card>
              <Form>
                <Card.Header>
                  <h3 style={{ textAlign: "center" }}>Login</h3>
                </Card.Header>
                <Card.Body>
                  <Form.Group className="mb-4">
                    <Form.Label> Email </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    <Form.Text></Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label> Password </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="enter password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
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
                        onClick={(e) => onLoginSubmit(e)}
                        disabled={loading}
                      >
                        {" "}
                        Login{" "}
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
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
