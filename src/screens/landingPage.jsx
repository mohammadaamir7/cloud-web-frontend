import { Image, Container, Row, Col } from "react-bootstrap";
import Navbar from "../components/navbar";
// import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
// import flattechnology from "../assets/images/flattechnology.png";
// import image1 from "../assets/images/rectangle-7@2x.png";
// import image2 from "../assets/images/rectangle-8@2x.png";
// import image3 from "../assets/images/rectangle-9@2x.png";
// import image4 from "../assets/images/rectangle-10@2x.png";
// import image5 from "../assets/images/rectangle-11@2x.png";
// import image6 from "../assets/images/rectangle-12@2x.png";
// import logo_2 from "../assets/images/logobutton@3x.png";
import ButtonComponent from "../components/button";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { sendEmail as sendEmailFunction } from "../actions/userActions";
import proposal from "../files/blank.pdf";
import { useEffect, useMemo, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import CardComponent from "../components/card";
import { Helmet } from "react-helmet";
import { getBreadcrumbSchema, getContactPointSchema, getOpenAnAccountSchema, getOrganizationSchema, getWebSiteSchema, servicesList } from "../actions/schemas";
import { services } from "../constants/servicesData";

const validationSchema = Yup.object().shape({
  email: Yup.string("Enter your email")
    .email("Invalid email")
    .required("Email Required"),
  firstName: Yup.string("Enter your first name").required(
    "First Name Required"
  ),
  lastName: Yup.string("Enter your last name").required("Last Name Required"),
  city: Yup.string("Enter your city").required("City Required"),
  phone: Yup.string("Enter your phone number")
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone Number Required"),
  requirements: Yup.string("Enter your Requirements").required(
    "Requirements section cannot be empty Required"
  ),
});

const LandingPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showRequirementsError, setShowRequirementsError] = useState(false);
  // Define the data for each schema
  const serviceListData = servicesList(services);
  const schemaData = useMemo(() => [
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
      data: getContactPointSchema(),
    },
    {
      type: 'application/ld+json',
      data: getWebSiteSchema(),
    },
    {
      type: 'application/ld+json',
      data: getOpenAnAccountSchema(),
    },
    {
      type: 'application/ld+json',
      data: serviceListData,
    },
  ], []);

  useEffect(() => {
    // Remove existing schema scripts
  const existingSchemaScripts = document.querySelectorAll('script[data-schema]');
  existingSchemaScripts.forEach((script) => script.remove());

    schemaData.forEach((schema) => {
      const script = document.createElement('script');
      script.type = schema.type;
      script.text = JSON.stringify(schema.data);
      document.head.appendChild(script);
    });
  }, [schemaData]);


  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      city: "",
      phone: "",
      requirements: "",
    },
    validationSchema: validationSchema,
  });

  const sendEmail = () => {
    setShowError(false);
    setShowRequirementsError(false);
    if (!isChecked) {
      setShowError(true);
    } else if (!formik.values.requirements) {
      setShowRequirementsError(true);
    } else {
      dispatch(
        sendEmailFunction(
          formik.values.email,
          formik.values.firstName,
          formik.values.lastName,
          formik.values.city,
          formik.values.phone,
          formik.values.requirements
        )
      );
    }
  };

  const pdfFile = () => {
    const link = document.createElement("a");
    link.href = proposal;
    link.download = "filename.pdf";
    link.click();
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cyber Sec Global</title>
        <meta name="description" content="Stay protected with our cyber security scan. We offer internal and external penetration testing, vulnerability detection, and social engineering services. Join us today for global cyber security." />
        <meta name="keywords" content="cyber global, cyber security scan, external penetration testing companies, internal penetration testing, internal and external penetration testing, vulnerability detection, social engineering services" />

        <meta property="og:title" content="Cyber Sec Global" />
        <meta property="og:description" content="Stay protected with our cyber security scan. We offer internal and external penetration testing, vulnerability detection, and social engineering services. Join us today for global cyber security." />
        <meta property="og:url" content="https://cybersecglobal.net" />
        <meta property="og:image" content="https://120mybucket.s3.amazonaws.com/images/logobutton%403x.png" />
        <meta name="twitter:card" content="Stay protected with our cyber security scan. We offer internal and external penetration testing, vulnerability detection, and social engineering services. Join us today for global cyber security." />
        <meta name="twitter:title" content="Cyber Sec Global" />
        <meta name="twitter:description" content="Stay protected with our cyber security scan. We offer internal and external penetration testing, vulnerability detection, and social engineering services. Join us today for global cyber security." />
        <meta name="twitter:image" content="https://120mybucket.s3.amazonaws.com/images/logobutton%403x.png" />




      </Helmet>


      <Navbar />
      <div className="home-hero">
        <Container>
          <Row>
            <Col md={8}>
              <div className="mt-5">
                <h1 className="home-heading">
                  Expert Cloud Architecture, Security Services and Penetration
                  Testing
                </h1>
                <p className="home-para">
                  Get flexibility and control. Go beyond virtualization with
                  multi-cloud services for cloud architecture, cloud management,
                  security and networking.
                </p>
                <p className="home-para-two">
                  Cloud architecture and security done right
                </p>
                <ButtonComponent
                  className={"get-started mt-5 rounded-pill"}
                  label={"Get Started"}
                  handleClick={pdfFile}
                />
              </div>
            </Col>
            <Col md={4}>
              <div style={{ height: "auto" }}>
                {/* <Image className="flattentech-image" src={flattechnology} /> */}
                <Image
                  className="flattentech-image"
                  alt="Cyber-Sec Global LLC, hero image component"
                  src={
                    "https://120mybucket.s3.amazonaws.com/images/flattechnology.png"
                  }
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container>
          <Row>
            <Col>
              <h1 className="llc-head mt-5">Cyber-Sec Global LLC</h1>
              <p className="llc-para">
                The goal is to help businesses and individuals understand the
                importance of building a strong foundation for their cloud
                computing systems, and to provide the expertise and resources
                necessary to do so.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container>
          <Row>
            <Col>
              <h1 className="services-head mt-5 mb-5">Services/Practices</h1>
            </Col>
          </Row>
          <Row>
            {
              services.map((x, i) => {
                return (
                  <Col md={4}>
                    <CardComponent key={i} className="mt-5 card-style" title={x.title} list={x.points} />
                  </Col>
                )
              })}

          </Row>
        </Container>
      </div>
      <div>
        <Container>
          <Row>
            <Col>
              <h1 className="expertise-head mt-5 mb-5">Expertise</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h1 className="expertise-para">
                Our team is made up of experienced professionals who have a deep
                understanding of cybersecurity and cloud technologies. We can
                help you navigate the complex world of these technologies and
                provide customized solutions to meet your specific needs.
              </h1>
            </Col>
            <Col md={6}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="expertise-svg"
                  viewBox="0 0 700 443"
                  fill="none"
                >
                  <g clip-path="url(#clip0_47_332)">
                    <path
                      d="M276.227 353.964H2.81545C2.069 353.963 1.35336 353.664 0.825536 353.133C0.297717 352.602 0.000827774 351.881 0 351.129V82.7684C0.000827774 82.0168 0.297717 81.2962 0.825536 80.7648C1.35336 80.2333 2.069 79.9344 2.81545 79.9336H276.227C276.974 79.9344 277.689 80.2333 278.217 80.7648C278.745 81.2962 279.042 82.0168 279.043 82.7684V351.129C279.042 351.881 278.745 352.602 278.217 353.133C277.689 353.664 276.974 353.963 276.227 353.964Z"
                      fill="#F0F0F0"
                    />
                    <path
                      d="M246.509 104.502H32.5342C31.7879 104.503 31.0724 104.802 30.5446 105.334C30.0169 105.865 29.7199 106.585 29.7188 107.337V274.275C29.7199 275.026 30.0169 275.747 30.5446 276.278C31.0724 276.81 31.7879 277.109 32.5342 277.11H246.509C247.255 277.109 247.97 276.81 248.498 276.278C249.026 275.747 249.323 275.026 249.324 274.275V107.337C249.323 106.585 249.026 105.865 248.498 105.334C247.97 104.802 247.255 104.503 246.509 104.502Z"
                      fill="white"
                    />
                    <path
                      d="M234.308 309.868H44.7343C44.3196 309.867 43.9221 309.701 43.6288 309.406C43.3356 309.111 43.1707 308.71 43.1702 308.293V299.473C43.1707 299.056 43.3356 298.655 43.6288 298.36C43.9221 298.065 44.3196 297.899 44.7343 297.898H234.308C234.723 297.899 235.12 298.065 235.414 298.36C235.707 298.655 235.872 299.056 235.872 299.473V308.293C235.872 308.71 235.707 309.111 235.414 309.406C235.12 309.701 234.723 309.867 234.308 309.868Z"
                      fill="white"
                    />
                    <path
                      d="M168.614 331.286H44.7343C44.3196 331.285 43.9221 331.119 43.6288 330.824C43.3356 330.529 43.1707 330.128 43.1702 329.711V320.891C43.1707 320.474 43.3356 320.074 43.6288 319.778C43.9221 319.483 44.3196 319.317 44.7343 319.316H168.614C169.029 319.317 169.426 319.483 169.72 319.778C170.013 320.074 170.178 320.474 170.178 320.891V329.711C170.178 330.128 170.013 330.529 169.72 330.824C169.426 331.119 169.029 331.285 168.614 331.286Z"
                      fill="white"
                    />
                    <path
                      d="M134.235 217.622C149.261 217.622 161.441 205.357 161.441 190.229C161.441 175.1 149.261 162.836 134.235 162.836C119.21 162.836 107.029 175.1 107.029 190.229C107.029 205.357 119.21 217.622 134.235 217.622Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M174.039 277.109H113.719L115.69 232.457L116.16 231.96L122.929 224.76H144.47L152.453 232.546L153.098 233.176L170.097 249.58L174.039 277.109Z"
                      fill="#2E4DB7"
                    />
                    <path
                      d="M124.093 277.109H78.4573C78.3448 267.03 78.2822 260.995 78.2822 260.995L80.9223 259.376C80.9256 259.372 80.9301 259.37 80.9349 259.37H80.9413L110.022 241.592L116.128 231.607L116.159 231.96L117.955 253.007C117.955 253.007 120.921 262.658 124.093 277.109Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M200.792 277.109H152.454C153.186 247.715 149.244 231.607 151.271 231.607L152.454 232.546L166.7 243.873L185.476 250.808H185.488L198.433 255.59L200.704 256.428V257.505C200.711 260.088 200.723 267.15 200.792 277.109Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M108.497 198.8C108.497 198.8 110.808 194.712 110.271 181.058C109.734 167.404 130.384 175.127 147.639 173.824C164.894 172.522 161.242 196.62 161.242 196.62C161.242 196.62 162.487 195.188 165.152 183.557C167.817 171.926 161.766 160.336 161.766 160.336C159.983 148.114 150.378 152.031 150.378 152.031C155.004 153.844 154.115 157.721 154.115 157.721C150.2 150.809 140.595 154.726 140.595 154.726C127.784 146.632 114.801 157.291 114.801 157.291C99.325 160.827 108.401 173.219 108.401 173.219C92.8373 181.138 108.497 198.8 108.497 198.8Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M84.5514 277.109H65.8003C65.9465 274.782 65.9507 272.449 65.8128 270.122C64.6929 265.631 80.447 259.558 80.9224 259.375C80.9257 259.372 80.9301 259.37 80.9349 259.369H80.9413L83.9444 260.994L84.5514 277.109Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M204.177 277.109H184.481L182.022 252.667L184.781 250.639C184.781 250.639 185.032 250.695 185.476 250.809H185.488C187.697 251.357 194.529 253.171 198.433 255.59C199.302 256.081 200.072 256.73 200.704 257.505C201.091 257.973 201.284 258.573 201.242 259.181C201.142 260.094 202.293 266.822 204.177 277.109Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M697.185 274.031H423.773C423.026 274.03 422.311 273.731 421.783 273.199C421.255 272.668 420.958 271.947 420.957 271.196V2.8348C420.958 2.08322 421.255 1.36267 421.783 0.831222C422.311 0.299774 423.026 0.000835814 423.773 0H697.185C697.931 0.000821755 698.647 0.299744 699.174 0.831195C699.702 1.36265 699.999 2.08321 700 2.8348V271.196C699.999 271.947 699.702 272.668 699.174 273.199C698.647 273.731 697.931 274.03 697.185 274.031Z"
                      fill="#F0F0F0"
                    />
                    <path
                      d="M667.466 24.5684H453.492C452.745 24.5695 452.03 24.8685 451.502 25.3999C450.974 25.9313 450.677 26.6517 450.676 27.4032V194.341C450.677 195.093 450.974 195.813 451.502 196.345C452.03 196.876 452.745 197.175 453.492 197.176H667.466C668.213 197.175 668.928 196.876 669.456 196.345C669.984 195.813 670.281 195.093 670.282 194.341V27.4032C670.281 26.6517 669.984 25.9313 669.456 25.3999C668.928 24.8685 668.213 24.5695 667.466 24.5684Z"
                      fill="white"
                    />
                    <path
                      d="M655.266 229.934H465.692C465.277 229.934 464.88 229.767 464.586 229.472C464.293 229.177 464.128 228.777 464.128 228.359V219.54C464.128 219.122 464.293 218.722 464.586 218.427C464.88 218.131 465.277 217.965 465.692 217.965H655.266C655.68 217.965 656.078 218.131 656.371 218.427C656.664 218.722 656.829 219.122 656.83 219.54V228.359C656.829 228.777 656.664 229.177 656.371 229.472C656.078 229.767 655.68 229.934 655.266 229.934Z"
                      fill="white"
                    />
                    <path
                      d="M589.572 251.352H465.692C465.277 251.351 464.88 251.185 464.586 250.89C464.293 250.595 464.128 250.195 464.128 249.777V240.958C464.128 240.54 464.293 240.14 464.586 239.845C464.88 239.549 465.277 239.383 465.692 239.383H589.572C589.986 239.383 590.384 239.549 590.677 239.845C590.97 240.14 591.135 240.54 591.136 240.958V249.777C591.135 250.195 590.97 250.595 590.677 250.89C590.384 251.185 589.986 251.351 589.572 251.352Z"
                      fill="white"
                    />
                    <path
                      d="M613.147 197.177C614.354 192.799 615.293 189.026 615.774 186.355C615.923 185.531 615.938 184.688 615.818 183.86C614.016 170.952 581.47 160.041 577.297 158.693L576.289 147.455L535.321 143.014L530.135 157.389L515.432 162.939C514.9 163.137 514.393 163.399 513.924 163.72C512.691 164.559 511.742 165.758 511.206 167.155C510.67 168.553 510.573 170.083 510.927 171.538L517.19 197.177H613.147V197.177Z"
                      fill="#2E4DB7"
                    />
                    <path
                      d="M528.22 197.177H496.43C497.569 190.033 498.589 183.714 499.252 179.695C501.68 165.068 512.266 163.82 513.924 163.72C514.055 163.707 514.137 163.707 514.143 163.707H520.831L528.22 197.177Z"
                      fill="#2E4DB7"
                    />
                    <path
                      d="M613.147 197.177H620.855C620.173 190.871 618.008 186.625 615.818 183.86C614.357 181.916 612.471 180.336 610.306 179.242L609.724 178.99L602.948 197.177H613.147Z"
                      fill="#2E4DB7"
                    />
                    <path
                      d="M554.205 135.901C570.496 135.901 583.702 122.603 583.702 106.2C583.702 89.7973 570.496 76.5 554.205 76.5C537.914 76.5 524.707 89.7973 524.707 106.2C524.707 122.603 537.914 135.901 554.205 135.901Z"
                      fill="#A0616A"
                    />
                    <path
                      d="M534.405 91.7301C537.459 95.3687 542.626 96.395 547.393 96.8123C557.074 97.6674 571.151 96.2806 580.612 94.0816C581.292 100.671 579.447 107.776 583.301 113.197C585.108 106.635 586.159 99.8844 586.432 93.0798C586.549 90.1615 586.503 87.1425 585.326 84.4636C584.148 81.7847 581.579 79.5105 578.621 79.487C580.819 77.8088 583.393 76.7011 586.117 76.2618L576.751 71.5227L579.156 69.0363L562.2 67.9916L567.111 64.8504C559.716 63.828 552.235 63.5912 544.792 64.1438C541.336 64.3999 537.723 64.8895 534.924 66.9058C532.124 68.922 530.506 72.9281 532.245 75.8875C530.069 76.2473 528.02 77.1605 526.293 78.5406C524.565 79.9206 523.217 81.7219 522.374 83.7736C521.126 86.9598 521.24 90.4987 521.625 93.894C522.263 99.324 523.517 104.663 525.36 109.806"
                      fill="#2F2E41"
                    />
                    <path
                      d="M491.908 442.999H218.496C217.75 442.999 217.034 442.7 216.506 442.168C215.978 441.637 215.681 440.916 215.681 440.165V171.804C215.681 171.052 215.978 170.331 216.506 169.8C217.034 169.269 217.75 168.97 218.496 168.969H491.908C492.654 168.97 493.37 169.268 493.898 169.8C494.426 170.331 494.723 171.052 494.723 171.804V440.165C494.723 440.916 494.426 441.637 493.898 442.168C493.37 442.7 492.654 442.999 491.908 442.999Z"
                      fill="#E4E4E4"
                    />
                    <path
                      d="M462.19 193.539H248.215C247.469 193.54 246.753 193.839 246.226 194.371C245.698 194.902 245.401 195.622 245.4 196.374V363.312C245.401 364.064 245.698 364.784 246.226 365.315C246.753 365.847 247.469 366.146 248.215 366.147H462.19C462.936 366.146 463.651 365.847 464.179 365.315C464.707 364.784 465.004 364.064 465.005 363.312V196.374C465.004 195.622 464.707 194.902 464.179 194.371C463.651 193.839 462.936 193.54 462.19 193.539Z"
                      fill="white"
                    />
                    <path
                      d="M449.989 398.903H260.415C260.001 398.902 259.603 398.736 259.31 398.441C259.017 398.146 258.852 397.745 258.851 397.328V388.508C258.852 388.091 259.017 387.691 259.31 387.395C259.603 387.1 260.001 386.934 260.415 386.934H449.989C450.404 386.934 450.801 387.1 451.095 387.395C451.388 387.691 451.553 388.091 451.553 388.508V397.328C451.553 397.745 451.388 398.146 451.095 398.441C450.801 398.736 450.404 398.902 449.989 398.903Z"
                      fill="white"
                    />
                    <path
                      d="M384.295 420.321H260.415C260.001 420.32 259.603 420.154 259.31 419.859C259.017 419.564 258.852 419.163 258.851 418.746V409.926C258.852 409.509 259.017 409.109 259.31 408.813C259.603 408.518 260.001 408.352 260.415 408.352H384.295C384.71 408.352 385.107 408.518 385.401 408.813C385.694 409.109 385.859 409.509 385.859 409.926V418.746C385.859 419.163 385.694 419.564 385.401 419.859C385.107 420.154 384.71 420.32 384.295 420.321Z"
                      fill="white"
                    />
                    <path
                      d="M376.255 366.147H333.192L335.876 325.59L351.411 329.2L366.52 323.347L366.921 323.196L366.946 323.184C366.951 323.196 366.955 323.208 366.958 323.221C367.196 324.185 371.938 343.304 376.255 366.147Z"
                      fill="#2E4DB7"
                    />
                    <path
                      d="M402.208 332.211L398.185 366.146H361.891L366.52 323.348L366.564 322.932L366.921 323.196L366.958 323.221L375.911 329.798L402.208 332.211Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M339.561 366.146H307.058L306.589 339.43L330.508 331.442L335.876 325.59C335.876 325.59 337.571 343.197 339.561 366.146Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M417.856 366.147H390.921L392.648 341.837L402.208 332.211C402.208 332.211 409.772 348.187 417.856 366.147Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M314.722 366.146H300.514C300.576 358.36 300.614 352.98 300.614 351.462C300.543 349.115 301.051 346.787 302.094 344.687C303.137 342.587 304.681 340.78 306.589 339.43L313.765 341.836L314.722 366.146Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M312.506 283.841C312.528 277.245 314.25 270.766 317.504 265.041C320.758 259.315 325.433 254.538 331.07 251.176C343.048 244.057 357.499 244.186 370.717 251.529C380.134 256.761 387.796 269.926 387.796 280.876V312.827H312.506V283.841Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M361.704 308.685C374.882 301.432 379.726 284.795 372.522 271.526C365.318 258.257 348.794 253.381 335.616 260.634C322.438 267.887 317.594 284.524 324.798 297.793C332.002 311.062 348.526 315.939 361.704 308.685Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M320.301 284.917C320.095 284.678 319.613 284.116 322.967 258.128L323.073 257.704H323.377C340.38 249.282 357.63 249.07 374.653 257.071C375.177 257.322 375.627 257.705 375.96 258.183C376.293 258.661 376.497 259.219 376.551 259.8C378.538 284.217 378.058 284.749 377.853 284.976C377.541 285.321 377.161 285.596 376.738 285.785C376.315 285.973 375.857 286.071 375.394 286.071H367.852L367.694 285.784C366.399 283.361 364.978 281.009 363.438 278.736C362.729 280.998 362.149 283.299 361.7 285.627L361.608 286.071H322.812C322.335 286.071 321.865 285.968 321.432 285.769C320.998 285.57 320.613 285.279 320.301 284.917Z"
                      fill="#2F2E41"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_47_332">
                      <rect width="700" height="443" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="expertise-head mt-5 mb-5">Security</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="security-svg"
                  viewBox="0 0 700 503"
                  fill="none"
                >
                  <g clip-path="url(#clip0_47_387)">
                    <path
                      d="M639.177 451.683C645.317 462.6 640.11 499.473 640.11 499.473C640.11 499.473 606.019 484.955 599.88 474.043C596.94 468.801 596.188 462.599 597.79 456.799C599.393 451 603.218 446.078 608.426 443.115C613.634 440.151 619.798 439.389 625.564 440.996C631.33 442.602 636.227 446.446 639.177 451.683V451.683Z"
                      fill="#F1F1F1"
                    />
                    <path
                      d="M640.605 499.426L639.881 499.58C632.905 466.24 608.545 443.631 608.3 443.406L608.798 442.855C609.045 443.081 633.578 465.844 640.605 499.426Z"
                      fill="white"
                    />
                    <path
                      d="M694.96 464.113C686.629 479.317 639.66 499.912 639.66 499.912C639.66 499.912 631.916 448.96 640.243 433.762C644.244 426.462 650.963 421.06 658.923 418.745C666.883 416.429 675.431 417.39 682.687 421.415C689.943 425.439 695.312 432.199 697.614 440.207C699.915 448.214 698.961 456.814 694.96 464.113Z"
                      fill="#F1F1F1"
                    />
                    <path
                      d="M640.075 500.464L639.369 499.717C673.357 467.245 682.156 421.956 682.241 421.502L683.247 421.692C683.162 422.149 674.309 467.756 640.075 500.464Z"
                      fill="white"
                    />
                    <path
                      d="M164.572 348.993C159.196 348.975 153.845 348.278 148.642 346.92L147.616 346.634L146.665 346.155C112.273 328.808 83.2586 305.895 60.4271 278.052C41.5274 254.869 26.7924 228.547 16.8846 200.27C5.03634 166.415 -0.663806 130.692 0.0562164 94.8076C0.0707451 94.0544 0.0830409 93.4728 0.0830409 93.0721C0.0830409 75.6283 9.70785 60.3227 24.6033 54.0789C36.0036 49.3003 139.513 6.52969 146.991 3.43939C161.076 -3.66026 176.102 2.26551 178.506 3.30177C183.9 5.52017 279.587 44.8927 300.265 54.7981C321.576 65.007 327.262 83.347 327.262 92.5742C327.262 134.348 320.071 173.39 305.887 208.614C294.432 237.125 278.197 263.446 257.889 286.431C218.707 330.79 179.515 346.515 179.137 346.653C174.453 348.275 169.525 349.066 164.572 348.993ZM155.355 326.025C158.753 326.792 166.576 327.941 171.675 326.07C178.152 323.694 210.955 306.581 241.609 271.878C283.962 223.93 305.452 163.655 305.483 92.7283C305.408 91.2913 304.393 81.0425 290.902 74.5799C270.625 64.866 171.166 23.953 170.163 23.5407L169.889 23.4235C167.804 22.5448 161.171 20.694 156.598 23.1045L155.683 23.5339C154.574 23.992 44.6983 69.3914 32.98 74.3033C24.7827 77.7393 21.862 86.2516 21.862 93.0722C21.862 93.5706 21.8492 94.2956 21.8311 95.2327C20.8945 143.764 32.0578 263.183 155.355 326.025Z"
                      fill="#3F3D56"
                    />
                    <path
                      d="M151.674 13.7684C151.674 13.7684 40.7997 59.5797 28.9202 64.5592C17.0408 69.5387 11.1011 81.4894 11.1011 93.4402C11.1011 105.391 2.19151 261.333 151.674 336.73C151.674 336.73 165.241 340.506 175.535 336.73C185.828 332.953 316.501 269.216 316.501 92.9422C316.501 92.9422 316.501 75.0161 295.712 65.0571C274.923 55.0981 174.412 13.7684 174.412 13.7684C174.412 13.7684 162.069 8.29096 151.674 13.7684Z"
                      fill="#2E4DB7"
                    />
                    <path
                      opacity="0.1"
                      d="M163.425 49.252V293.639C163.425 293.639 51.5608 239.468 52.5507 97.055L163.425 49.252Z"
                      fill="black"
                    />
                    <path
                      d="M164.884 224.897L129.25 178.803L149.973 162.589L166.845 184.413L223.845 123.881L242.906 142.048L164.884 224.897Z"
                      fill="white"
                    />
                    <path
                      d="M699.145 502.1H373.532C373.306 502.1 373.088 502.01 372.928 501.849C372.768 501.687 372.678 501.469 372.678 501.241C372.678 501.013 372.768 500.794 372.928 500.633C373.088 500.471 373.306 500.381 373.532 500.381H699.145C699.372 500.381 699.589 500.471 699.75 500.633C699.91 500.794 700 501.013 700 501.241C700 501.469 699.91 501.687 699.75 501.849C699.589 502.01 699.372 502.1 699.145 502.1Z"
                      fill="#CACACA"
                    />
                    <path
                      d="M467.657 488.548L480.874 488.547L487.163 437.26L467.655 437.261L467.657 488.548Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M464.285 484.206L490.315 484.205H490.316C494.716 484.205 498.935 485.963 502.046 489.093C505.157 492.222 506.904 496.467 506.905 500.893V501.435L464.286 501.437L464.285 484.206Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M512.098 488.548L525.315 488.547L531.603 437.26L512.095 437.261L512.098 488.548Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M508.726 484.206L534.756 484.205H534.757C539.156 484.205 543.376 485.963 546.486 489.093C549.597 492.222 551.345 496.467 551.345 500.893V501.435L508.727 501.437L508.726 484.206Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M488.431 308.438L491.602 471.148L465.954 469.548L448.161 365.911L442.541 295.248L488.431 308.438Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M532.449 281.117L536.043 473.728L506.131 472.868L499.67 358.374L488.431 316.919L442.541 295.249L450.034 243.43L517.464 242.488L532.449 281.117Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M480.878 108.702C493.546 108.702 503.815 98.3709 503.815 85.6272C503.815 72.8835 493.546 62.5527 480.878 62.5527C468.211 62.5527 457.941 72.8835 457.941 85.6272C457.941 98.3709 468.211 108.702 480.878 108.702Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M499.902 118.422L503.416 123.776L512.782 150.156L505.289 252.851L461.271 253.794L455.653 136.024L467.424 121.222L499.902 118.422Z"
                      fill="#CCCCCC"
                    />
                    <path
                      d="M437.858 138.85L430.366 137.908C430.366 137.908 428.493 138.85 427.557 145.445C426.62 152.041 415.382 210.454 415.382 210.454L430.366 282.059L447.224 259.447L436.922 219.876L447.224 180.305L437.858 138.85Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M533.385 137.908H539.004L553.052 214.222L539.941 273.578L526.829 251.909L530.575 228.355L528.702 207.628L522.146 195.379L533.385 137.908Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M494.432 85.626L490.261 84.5771C490.261 84.5771 487.133 66.7469 479.835 68.8445C472.537 70.9422 453.771 73.0399 453.771 64.6492C453.771 56.2584 471.495 48.9166 481.921 49.9654C492.346 51.0143 505.662 54.4938 509.028 69.8933C514.423 94.5796 497.895 100.815 497.895 100.815L498.17 99.9162C498.934 97.4205 498.988 94.7597 498.328 92.2345C497.667 89.7092 496.317 87.4201 494.432 85.626Z"
                      fill="#2F2E41"
                    />
                    <path
                      d="M431.303 137.909L461.272 125.661L468.296 120.479L489.368 214.224L499.202 117.652L538.068 137.909L524.956 201.976L523.083 226.472L528.702 246.257C528.702 246.257 548.37 260.389 541.814 275.464C535.258 290.538 527.766 291.481 527.766 291.481C527.766 291.481 495.924 261.332 494.051 253.794C492.178 246.257 489.368 233.067 489.368 233.067C489.368 233.067 473.447 293.365 454.716 292.423C435.986 291.481 435.986 271.695 435.986 271.695L440.668 250.968L448.16 229.298L444.414 193.496L431.303 137.909Z"
                      fill="#2F2E41"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_47_387">
                      <rect width="700" height="502.1" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </Col>
            <Col md={6}>
              <h1 className="security-para">
                We understand that the security of your data is of the utmost
                importance. That's why we go above and beyond to protect your
                systems and data, using advanced security measures such as
                penetration testing, encryption, access controls, and continuous
                monitoring.
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="contact-us-div">
        <Container>
          <Row>
            <Col md={6}>
              {/* <Image className="contact-logo" src={logo_2} /> */}
              <Image
                className="contact-logo"
                alt="Cyber-Sec Global LLC"
                src={"https://120mybucket.s3.amazonaws.com/images/logo-2.png"}
              />
            </Col>
            <Col md={6}>
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
                  label="Email*"
                  className="contact-field"
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

                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
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
                    className="contact-field-two"
                    id="firstName"
                    label="First Name*"
                    variant="outlined"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
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
                    className="contact-field-two"
                    id="lastName"
                    label="Last Name*"
                    variant="outlined"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />{" "}
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
                    className="contact-field-two"
                    id="city"
                    label="City*"
                    variant="outlined"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
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
                    className="contact-field-two"
                    id="phone"
                    label="Phone*"
                    variant="outlined"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                  />
                </Box>
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
                  id="requirements"
                  name="requirements"
                  label="Requirements"
                  placeholder="Requirements*"
                  className="blog-text-two"
                  type="text"
                  value={formik.values.requirements}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.requirements &&
                    Boolean(formik.errors.requirements)
                  }
                  helperText={
                    formik.touched.requirements && formik.errors.requirements
                  }
                />
                {showRequirementsError && (
                  <FormHelperText
                    className="contact-para-two"
                    style={{ color: "#d32f2f", fontSize: "15px" }}
                  >
                    Kindly add your requirements
                  </FormHelperText>
                )}
                <p className="contact-para">
                  I would like to sign up with my email address to receive
                  valuable reources and useful tips.
                </p>

                <div style={{ display: "flex" }}>
                  <Checkbox
                    style={{
                      color: "#fff",
                      marginTop: "-2%",
                      marginLeft: "-2%",
                    }}
                    value={isChecked}
                    onChange={(e) => setIsChecked((prev) => !prev)}
                    className="contact-checkbox"
                    label="checkbox"
                  />
                  <p className="contact-para-two">
                    By submitting this form you confirm that you agree to our
                    privacy policy.
                  </p>
                </div>
                {showError && (
                  <FormHelperText
                    className="contact-para-two"
                    style={{ color: "#d32f2f", fontSize: "15px" }}
                  >
                    Kindly agree to our privacy policy
                  </FormHelperText>
                )}
                <ButtonComponent
                  className={"contact-us-button-initial mt-5 rounded-pill"}
                  label={"CONTACT US"}
                  handleClick={sendEmail}
                  type="submit"
                />
              </form>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
