import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog as deleteBlogAction } from "../actions/blogActions";
import { Image, Modal } from "react-bootstrap";
import ButtonComponent from "./button";
import { useNavigate } from "react-router-dom";

const DeleteModal = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteBlog = async () => {
    const success = await dispatch(deleteBlogAction(props.blogId));
    if (success) {
      navigate("/blogs");
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
          Delete Blog
        </Modal.Title>
      </Modal.Header>
      {/* <Image className="modal-logo" src={logo_2} /> */}
      <Image
        className="modal-logo"
        src={"https://120mybucket.s3.amazonaws.com/images/logo-2.png"}
        alt="logo"
      />

      <Modal.Body>
        <p className="delete-modal-para">
          Are you sure you want to delete this blog?
        </p>
        <ButtonComponent
          className={"contact-us-button delete-modal-yes mt-5 rounded-pill"}
          label={"YES"}
          handleClick={deleteBlog}
          type="submit"
        />
        <ButtonComponent
          className={"contact-us-button delete-modal-no mt-5 rounded-pill"}
          label={"NO"}
          handleClick={() => props.setModalShow(false)}
          type="submit"
        />
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal