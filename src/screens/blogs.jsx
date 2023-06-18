import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../actions/blogActions";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Loader from "../components/loader";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Blogs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const { blogs, loading } = useSelector((state) => state.blogsData);

  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Blogs - Cyber Sec Global</title>
        <meta name="description" content="Stay informed with our blog on internal network penetration testing services, wireless pentesting, and IT security scans. Explore topics like external infrastructure penetration testing and social engineering in cyber security." />
        <meta name="keywords" content="internal network penetration testing services, wireless pentesting, it security scan, external infrastructure penetration testing,social engineering and cyber security,  internal network penetration testing methodology" />
        <meta property="og:title" content="Blogs - Cyber Sec Global" />
        <meta property="og:description" content="Stay informed with our blog on internal network penetration testing services, wireless pentesting, and IT security scans. Explore topics like external infrastructure penetration testing and social engineering in cyber security." />
        <meta property="og:url" content="https://cybersecglobal.net/blogs" />
        <meta property="og:image" content="https://120mybucket.s3.amazonaws.com/images/logobutton%403x.png" />
        <meta name="twitter:card" content="Stay informed with our blog on internal network penetration testing services, wireless pentesting, and IT security scans. Explore topics like external infrastructure penetration testing and social engineering in cyber security." />
        <meta name="twitter:title" content="Blogs - Cyber Sec Global" />
        <meta name="twitter:description" content="Stay informed with our blog on internal network penetration testing services, wireless pentesting, and IT security scans. Explore topics like external infrastructure penetration testing and social engineering in cyber security." />
        <meta name="twitter:image" content="https://120mybucket.s3.amazonaws.com/images/logobutton%403x.png" />





      </Helmet>
      <div>
        <Navbar />
        {loading && <Loader />}
        <Container>
          <Row>
            <Col md={12}>
              <p className="blog-description mt-5">
              At our cybersecurity firm, we specialize in internal network penetration testing services and wireless pentesting. We understand the criticality of IT security scans and external infrastructure penetration testing. With a focus on social engineering and cyber security, our team, led by Mr. Ali Zain Zahid and Mr. Abdul Hakim A. W. Shabazz El, diligently addresses software and human vulnerabilities to offer comprehensive cybersecurity solutions. Trust us for reliable internal network penetration testing methodology.
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Image alt="blogs - Cyber-Sec Global LLC" className="blog-image mt-5 mb-5" src={"https://120mybucket.s3.amazonaws.com/images/pexels-pixabay-39584.jpg"} />
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
    </>

  );
};

export default Blogs;
