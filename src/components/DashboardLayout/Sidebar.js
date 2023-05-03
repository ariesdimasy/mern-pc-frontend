import React from "react";
import { ListGroup } from "react-bootstrap";

import style from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div>
      <ListGroup className={style["sidebar-menu"]}>
        <ListGroup.Item className={style["sidebar-menu-list"]}>
          <a href="/admin-dashboard"> Home </a>
        </ListGroup.Item>
        <ListGroup.Item className={style["sidebar-menu-list"]}>
          <a href="/admin-dashboard/category"> Category </a>
        </ListGroup.Item>
        <ListGroup.Item className={style["sidebar-menu-list"]}>
          <a href="/admin-dashboard/product"> Product </a>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
