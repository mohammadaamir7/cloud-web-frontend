import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Image } from "react-bootstrap";
// import logo_2 from "../assets/images/logobutton@3x.png";
import { Icon } from "react-icons-kit";
import { bars } from "react-icons-kit/fa/bars";
// import jsonwebtoken from "jsonwebtoken"
import jwt_decode from "jwt-decode";

export default function MiniDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const checkTokenExpiration = () => {
    const info = localStorage.getItem('userInfo');
    const token = info ? JSON.parse(info).token : null
    if (token) {
      const { exp } = jwt_decode(token);
      if (exp < Date.now() / 1000) {
        logoutHandler();
      }
    }
  }

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar className="navbar-background" expand="md">
        <Container>
          <Navbar.Brand>
            <Image
              onClick={(e) => navigate("/")}
              className="navbar-logo"
              src={
                "https://120mybucket.s3.amazonaws.com/images/logobutton%403x.png"
              }
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle
            style={{ borderColor: "white" }}
            aria-controls="basic-navbar-nav"
          >
            <Icon
              icon={bars}
              style={{ color: "white", paddingBottom: "0.5vh" }}
            />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                className="navbar-heading"
                onClick={(e) => navigate("/about-us")}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                className="navbar-heading"
                onClick={(e) => navigate("/who-we-are")}
              >
                Who we are
              </Nav.Link>
              <Nav.Link
                className="navbar-heading"
                onClick={(e) => navigate("/services")}
              >
                Services
              </Nav.Link>
              {!userInfo && (
                <Nav.Link
                  className="navbar-heading"
                  onClick={(e) => navigate("/login")}
                >
                  Login
                </Nav.Link>
              )}
              {userInfo && (
                <Nav.Link
                  className="navbar-heading"
                  onClick={(e) => navigate("/profile")}
                >
                  Profile
                </Nav.Link>
              )}
              {userInfo && userInfo?.role === "admin" && (
                <Nav.Link
                  className="navbar-heading"
                  onClick={(e) => navigate("/addBlog")}
                >
                  Add Blog
                </Nav.Link>
              )}
              <Nav.Link
                className="navbar-heading"
                onClick={(e) => navigate("/blogs")}
              >
                Blog
              </Nav.Link>
              {userInfo && (
                <Nav.Link className="navbar-heading" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
