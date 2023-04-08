import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function MyNavbar(props) {
  const [authStorage, setAuthStorage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authStorage")) {
      setAuthStorage(JSON.parse(localStorage.getItem("authStorage")));
    }
  }, []);

  const onLogout = () => {
    localStorage.removeItem("authStorage");
    window.location.href = "/";
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">MERN PC</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/product">Product</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
        {authStorage ? (
          <Nav>
            <Navbar.Collapse>
              <Nav>
                <NavDropdown title={authStorage.name}>
                  <NavDropdown.Item href="#" onClick={() => onLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
