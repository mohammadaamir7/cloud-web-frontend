import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Loader from "../components/loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../style/index.css";
// import logo_2 from "../assets/images/logo-2.png";
import Navbar from "../components/navbar";
import { getBlog } from "../actions/blogActions";
import { updateBlog } from "../actions/blogActions";

const validationSchema = Yup.object().shape({
  blogTitle: Yup.string("Enter blog title").required("Blog Heading Required"),
  blogIntro: Yup.string("Enter Blog Intro").required("Blog Intro Required"),
  blogDescription: Yup.string("Enter Blog Description").required(
    "Blog Description Required"
  ),
});

const UpdateBlog = () => {
  const { id: blogId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLoginInfo = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLoginInfo;

  const { data: blog, blogLoading } = useSelector((state) => state.blog);

  const formik = useFormik({
    initialValues: {
      blogTitle: blog?.title,
      blogIntro: blog?.intro,
      blogDescription: blog?.description,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const success = await dispatch(
        updateBlog(
          blog?._id,
          values.blogTitle,
          values.blogIntro,
          values.blogDescription
        )
      );
      if (success) {
        navigate("/blogs");
      }
    },
  });

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      dispatch(getBlog(blogId));
    }
  }, [userInfo, navigate, blogId]);

  return (
    <div className="blog-background">
      <Navbar />
      {(loading || blogLoading) && <Loader />}
      <Container>
        <Row>
          <Col md={6}>
            {/* <Image className="register-logo" fluid src={logo_2} alt="logo" /> */}
            <Image
              className="register-logo"
              fluid
              src={"https://120mybucket.s3.amazonaws.com/images/logo-2.png"}
              alt="logo"
            />
          </Col>
          <Col md={6}>
            <div className="vertical-mid">
              <h1 className="register-head-style">Add New Blog Post</h1>
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
                  id="blogTitle"
                  name="blogTitle"
                  label="Title"
                  className="register-field"
                  value={formik.values.blogTitle}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.blogTitle && Boolean(formik.errors.blogTitle)
                  }
                  helperText={
                    formik.touched.blogTitle && formik.errors.blogTitle
                  }
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
                  id="blogIntro"
                  name="blogIntro"
                  label="Intro"
                  className="register-field"
                  value={formik.values.blogIntro}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.blogIntro && Boolean(formik.errors.blogIntro)
                  }
                  helperText={
                    formik.touched.blogIntro && formik.errors.blogIntro
                  }
                />

                <TextareaAutosize
                  maxRows={6}
                  minRows={6}
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
                  id="blogDescription"
                  name="blogDescription"
                  label="Description"
                  placeholder="Description"
                  className="blog-text"
                  type="text"
                  value={formik.values.blogDescription}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.blogDescription &&
                    Boolean(formik.errors.blogDescription)
                  }
                  helperText={
                    formik.touched.blogDescription &&
                    formik.errors.blogDescription
                  }
                />
                <Button
                  style={{ marginTop: "20px" }}
                  className="rounded-button mb-5"
                  size="large"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Update Blog
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateBlog;
