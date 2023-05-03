import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Badge,
  Container,
  Col,
  Row,
  Card,
  ListGroup,
  Image,
  Form,
} from "react-bootstrap";

import style from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchDetailProduct,
  postComment,
} from "../../redux/product/productAction";

import PriceFormat from "../../components/PriceFormat";
import { apiUrl } from "../../helpers";

export default function ProductDetail(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productReducer.product);

  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(fetchDetailProduct(id));
  }, []);

  return (
    <div className={style["product-detail"]}>
      <Container>
        <Row>
          <Col md={5}>
            <Card>
              <Card.Body>
                <Card.Img
                  variant="top"
                  height={300}
                  src={
                    productDetail.productImage
                      ? apiUrl("products/" + productDetail.productImage)
                      : apiUrl("products/no-image.png")
                  }
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={7}>
            <h3 className={style["product-title"]}>
              {" "}
              {productDetail.productName}{" "}
            </h3>
            <Badge bg="primary" className={style["product-category"]}>
              {productDetail?.Category?.categoryName}
            </Badge>
            <div className={style["product-price"]}>
              <PriceFormat num={productDetail?.price || 0}></PriceFormat>
            </div>
            <p>
              {productDetail.description
                ? productDetail.description
                : `Belum ada Deskripsi, mohon hubungi admin untuk menambahkan
              deskripsi pada barang`}
            </p>
          </Col>
        </Row>
        <Row className={style["comment-section"]}>
          <Col md={12}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col md={1}>
                    {props.authStorage && (
                      <Image
                        thumbnail
                        height={50}
                        width={50}
                        src="https://picsum.photos/50"
                      />
                    )}
                  </Col>
                  <Col md={11}>
                    {props.authStorage ? (
                      <Form.Group>
                        <Form.Label>
                          <b>{props.authStorage.name}</b>{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={comment}
                          multiple
                          onChange={(e) => setComment(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && comment.length >= 5) {
                              dispatch(postComment(id, comment));
                              setComment("");
                            }
                          }}
                        />
                      </Form.Group>
                    ) : (
                      <>
                        You must <a href="/login">login</a> to commented thid
                        product
                      </>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {productDetail.Comments?.map((item) => (
                <ListGroup.Item>
                  <Row>
                    <Col md={1}>
                      <Image
                        thumbnail
                        height={50}
                        width={50}
                        src={
                          item.User.profile_picture
                            ? apiUrl("users/" + item.User.profile_picture)
                            : "https://picsum.photos/50"
                        }
                      />
                    </Col>
                    <Col md={11}>
                      <div>
                        <strong> {item.User.name || "No Name"} </strong>
                      </div>
                      <div> {item.comment} </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
