import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";

import { redirect } from "../../helpers";

import style from "./Navbar.module.css";

export default function MyNavbar(props) {
  const [authStorage, setAuthStorage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authStorage")) {
      setAuthStorage(JSON.parse(localStorage.getItem("authStorage")));
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("authStorage");
    redirect("/");
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home" className={style["navbar-brand"]}>
        {" "}
        MenPC Dash
      </Navbar.Brand>
    </Navbar>
  );
}
