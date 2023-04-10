import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../actions/blogActions";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Loader from "../components/loader";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Blogs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const { blogs, loading } = useSelector((state) => state.blogsData);

  return (
    <div>
      <Navbar />
      {loading && <Loader />}
      <Container>
        <Row>
          <Col md={12}>
            <p className="blog-description mt-5">
              At our cybersecurity firm, we understand that the greatest
              vulnerability to a system can often be the people who use it.
              While software vulnerabilities are certainly a major concern, it
              is important not to overlook the role that human error can play in
              compromising the security of a system. That's why our team
              leaders, Mr. Ali Zain Zahid and Mr. Abdul Hakim A. W. Shabazz El,
              are committed to addressing both software and human
              vulnerabilities in order to provide the most comprehensive
              cybersecurity solutions possible.
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Image className="blog-image mt-5 mb-5" src={"https://120mybucket.s3.amazonaws.com/images/pexels-pixabay-39584.jpg"}/>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h1 className="blog-main-head mt-5">Blogs</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {blogs && blogs.length > 0 && !loading ? (
              blogs.map((blog) => {
                return (
                  <>
                    <Link
                      key={blog._id}
                      className="blog-link"
                      to={`/blog/${blog._id}`}
                    >
                      <h1 className="blog-head mt-5">{blog.title}</h1>
                      <p className="blog-para">
                        {blog?.intro.length > 120
                          ? blog?.intro.slice(0, 120) + "..."
                          : blog?.intro}
                      </p>
                    </Link>
                  </>
                );
              })
            ) : (
              <h1 className="no-data-heading">No Data Found</h1>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Blogs;
