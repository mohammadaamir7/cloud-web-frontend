import React from "react";
import { Button } from "react-bootstrap";

const ButtonComponent = ({ label, variant, className, handleClick, type }) => {
  return (
    <>
      <Button onClick={handleClick} className={className} variant={variant} type={type}>
        {label}
      </Button>
    </>
  );
};

export default ButtonComponent;
