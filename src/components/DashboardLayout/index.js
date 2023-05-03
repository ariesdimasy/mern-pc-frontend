import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import MyNavbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

import styles from "./index.module.css";

import { checkToken } from "../../api/authApi";

export default function Layout(props) {
  useEffect(() => {
    setTimeout(() => {
      checkToken();
    }, 5 * 60 * 1000);
  }, []);

  return (
    <>
      <MyNavbar {...props}></MyNavbar>
      <div>
        <Row className={styles["row"]}>
          <Col md={2} className={styles["dashboard-sidebar"]}>
            <Sidebar />
          </Col>
          <Col md={10} className={styles["dashboard-content"]}>
            <Container className={styles["container"]}>
              {props.children}
            </Container>
          </Col>
        </Row>
      </div>
      <Footer></Footer>
    </>
  );
}
