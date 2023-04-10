import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./navbar";
import { Col, Container, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../actions/blogActions";
import Loader from "./loader";
import Footer from "./footer";
import ButtonComponent from "./button";
import DeleteModal from "./deletModal";

const Blog = () => {
  const { id: blogId } = useParams();
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getBlog(blogId));
  }, [blogId]);

  const { data: blog, loading } = useSelector((state) => state.blog);

  return (
    <div>
      <Navbar />
      {loading && <Loader />}
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="blog-head mt-5">{blog?.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Image className="blog-image mt-5 mb-5" src={"https://120mybucket.s3.amazonaws.com/images/hacker-g3b42780f1_1920.jpg"}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="blog-description mt-5">{blog?.description}</p>
          </Col>
        </Row>
        {userInfo && userInfo?.role === "admin" && (
          <>
            <ButtonComponent
              className={"update-blog-button rounded-pill"}
              label={"UPDATE"}
              handleClick={(e) => navigate(`/updateBlog/${blogId}`)}
              type="submit"
            />
            <ButtonComponent
              className={"delete-blog-button rounded-pill"}
              label={"DELETE"}
              handleClick={() => setModalShow(true)}
              type="submit"
            />
            <DeleteModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              setModalShow={setModalShow}
              blogId={blogId}
            />
          </>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default Blog;
