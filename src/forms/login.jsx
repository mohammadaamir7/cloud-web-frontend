import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import Navbar from "../components/navbar";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Loader from "../components/loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../style/index.css";
import { getBreadcrumbSchema, getOpenAnAccountSchema, getOrganizationSchema, getWebSiteSchema } from "../actions/schemas";
import { Helmet } from "react-helmet";
// import logo_2 from "../assets/images/logo-2.png";

const validationSchema = Yup.object().shape({
  password: Yup.string("Enter your password").required("Password Required"),
  email: Yup.string("Enter your email")
    .email("Invalid email")
    .required("Email Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { 
    loading, 
    // error, 
    userInfo 
  } = userLogin;
  // Define the data for each schema
  const schemaData = [
    {
      type: 'application/ld+json',
      data: getOrganizationSchema(),
    },
    {
      type: 'application/ld+json',
      data: getBreadcrumbSchema(),
    },
    {
      type: 'application/ld+json',
      data: getWebSiteSchema(),
    },
    {
      type: 'application/ld+json',
      data: getOpenAnAccountSchema(),
    }
  ];
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values.email, values.password));
    },
  });

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Cyber Sec Global</title>
      <meta name="description" content="Building secure cloud systems. Expert cybersecurity services: external/internal penetration testing, vulnerability scanning, web app testing, wireless testing, social engineering awareness. Protecting your data." />
      <meta name="keywords" content="Cybersecurity services,Cloud computing security, External penetration testing, Internal penetration testing, Web app penetration testing, Vulnerability scanning, Wireless penetration testing, Social engineering awareness, Cybersecurity expertise, Data security" />
      {schemaData.map((schema, index) => (
        <script
          key={index}
          type={schema.type}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.data) }}
        />
      ))}
    </Helmet>



    <div className="register-background">
      <Navbar />
      {loading && <Loader />}
      <Container>
        <Row>
          <Col md={6}>
            {/* <Image className="register-logo" fluid src={logo_2} alt="logo" /> */}
            <Image className="register-logo" fluid src={'https://120mybucket.s3.amazonaws.com/images/logo-2.png'} alt="cover" />
          </Col>
          <Col md={6}>
            <div className="vertical-mid">
              <h1 className="register-head-style">Welcome Back</h1>

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  sx={{
                    border: "1px solid #ffffff",
                    borderRadius: 1,
                    input: { color: "#ffffff" },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "#ffffff",
                    },
                  }}
                  style={{ margin: "10px 0" }}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  className="register-field"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  sx={{
                    border: "1px solid #ffffff",
                    borderRadius: 1,
                    input: { color: "#ffffff" },
                  }}
                  InputLabelProps={{
                    style: {
                      color: "#ffffff",
                    },
                  }}
                  style={{ margin: "10px 0" }}
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  className="register-field"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  style={{ marginTop: "20px", marginRight: "1vw" }}
                  className="rounded-button"
                  color="primary"
                  size="large"
                  variant="contained"
                  type="submit"
                >
                  Login Account
                </Button>
                <Button
                  style={{ marginTop: "20px" }}
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="rounded-button-outlined"
                  color="primary"
                  size="large"
                  variant="outlined"
                  type="submit"
                >
                  Create Account
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    </>
    
  );
};

export default LoginForm;
