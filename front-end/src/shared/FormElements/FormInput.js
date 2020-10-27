import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useField } from "formik";

import theme from "../util/styles/Theme";
import "./FormInput.css";

const StyledInput = styled.input`
  background-color: ${theme.color.grey};
  border: 1px solid ${theme.color.grey};
  border-radius: 4px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
  font-size: "1rem";
  transition: ${theme.transition.base({ el: "border" })};

  &:focus {
    border: 1px solid ${theme.color.primary};
    transition: ${theme.transition.base({ el: "border" })};
  }
`;



const FormInput = ({ type = "text", required = false, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={`form-control ${
        meta.touched && meta.error && "form-control--invalid"
      }`}
    >
      <StyledInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="form-error">{meta.error}</div>
      ) : null}
    </div>
  );
};

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password", "number"]),
  required: PropTypes.bool,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormInput;
