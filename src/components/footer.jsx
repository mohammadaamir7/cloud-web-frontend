import React from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
// import logo_2 from "../assets/images/logo-2.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InputAdornment from "@mui/material/InputAdornment";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { USER_REGISTER_PENDING } from "../constants/userConstants";

const validationSchema = Yup.object().shape({
  email: Yup.string("Enter your email")
    .email("Invalid email")
    .required("Email Required"),
});

const Footer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLoginInfo = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLoginInfo;

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({ type: USER_REGISTER_PENDING, payload: values.email });
      navigate("/register");
    },
  });

  return (
    <div className="footer-background">
      <Container>
        <Row className="pt-5">
          <Col md={4}>
            {/* <Image className="footer-logo" src={logo_2} /> */}
            <Image
              className="footer-logo"
              src={"https://120mybucket.s3.amazonaws.com/images/logo-2.png"}
            />
          </Col>
          <Col md={4} xs={6} sm={6}>
            <h1 className="footer-heading footer-head-left-margin">
              Contact US
            </h1>
            <h1 className="footer-heading footer-head-left-margin">
              +1 47 56789
            </h1>
            <h1 className="footer-heading footer-head-left-margin">
              CS@gmail.com
            </h1>
          </Col>
          <Col md={4} xs={6} sm={6}>
            <h1 className="footer-heading footer-head-left-margin-two">
              Follow Us
            </h1>
            <h1 onClick={() => window.open("https://www.youtube.com/@programmerboy6315")} className="footer-heading footer-head-width footer-head-left-margin-two">
              Youtube
            </h1>
            <h1 className="footer-heading footer-head-width footer-head-left-margin-two">
              Twitter
            </h1>
            <h1 className="footer-heading footer-head-width footer-head-left-margin-two">
              Instagram
            </h1>
          </Col>
        </Row>
        <Row md={4}>
          <Col md={4}>
            {!userInfo && (
              <>
                <h1 className="footer-heading footer-heading-base">
                  Sign Up to our news
                </h1>
                <form onSubmit={formik.handleSubmit}>
                  <TextField
                    sx={{
                      border: "1px solid #ffffff",
                      borderRadius: 1,
                      input: { color: "#ffffff" },
                    }}
                    style={{ margin: "10px 0" }}
                    fullWidth
                    id="email"
                    name="email"
                    label="Please enter your email"
                    className="footer-field mb-5"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button style={{ color: "white" }} type="submit">
                            <ArrowForwardIcon />
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      style: {
                        color: "#ffffff",
                      },
                    }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
