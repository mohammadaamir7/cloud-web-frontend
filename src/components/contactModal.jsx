import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch } from "react-redux";
import { sendEmail as sendEmailFunction } from "../actions/userActions";
import { Image, Modal } from "react-bootstrap";
import ButtonComponent from "./button";

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
});

const MyVerticallyCenteredModal = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      city: "",
      phone: "",
    },
    validationSchema: validationSchema,
  });

  const sendEmail = () => {
    setShowError(false);
    if (!isChecked) {
      setShowError(true);
    } else {
      dispatch(
        sendEmailFunction(
          formik.values.email,
          formik.values.firstName,
          formik.values.lastName,
          formik.values.city,
          formik.values.phone
        )
      );
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-head" id="contained-modal-title-vcenter">
          Contact Us
        </Modal.Title>
      </Modal.Header>
      {/* <Image className="modal-logo" src={logo_2} /> */}
      <Image
        className="modal-logo"
        src={"https://120mybucket.s3.amazonaws.com/images/logo-2.png"}
        alt="logo"
      />

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            style={{ margin: "10px 0" }}
            fullWidth
            id="email"
            name="email"
            label="Email*"
            className="modal-field"
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
              className="modal-field-two"
              id="firstName"
              label="First Name*"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              className="modal-field-two"
              id="lastName"
              label="Last Name*"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />{" "}
            <TextField
              className="modal-field-two"
              id="city"
              label="City*"
              variant="outlined"
              value={formik.values.city}
              onChange={formik.handleChange}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
            <TextField
              className="modal-field-two"
              id="phone"
              label="Phone*"
              variant="outlined"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Box>
          <p className="contact-para" style={{ color: "#000000" }}>
            I would like to sign up with my email address to receive valuable
            reources and useful tips.
          </p>

          <div style={{ display: "flex" }}>
            <Checkbox
              style={{
                marginTop: "-2%",
                marginLeft: "-2%",
              }}
              value={isChecked}
              onChange={(e) => setIsChecked((prev) => !prev)}
              className="contact-checkbox"
              label="checkbox"
            />
            <p className="contact-para-two" style={{ color: "#000000" }}>
              By submitting this form you confirm that you agree to our privacy
              policy.
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
            className={"contact-us-button mt-5 rounded-pill"}
            label={"CONTACT US"}
            handleClick={sendEmail}
            type="submit"
          />
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal