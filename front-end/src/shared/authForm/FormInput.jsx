import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useField } from "formik";

import theme from "./Theme";

const FormControl = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  display: block;
  background-color: ${theme.color.grey};
  border: 1px solid ${theme.color.grey};
  border-radius: 4px;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
  font-size: "1rem";
  transition: ${theme.transition.base({ el: "border" })};
  &:invalid {
    border-color: red;
    background: #ffd1d1;
  }
  &:focus {
    border: 2px solid ${theme.color.primary};
    transition: ${theme.transition.base({ el: "border" })};
  }
`;

const FormError = styled.div`
  color: red;
  font-size: 0.775rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 550;
`;

const FormInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl className={meta.touched && meta.error}>
      <StyledInput {...field} {...props} />
      {meta.touched && meta.error ? (
        <FormError>{meta.error}</FormError>
      ) : null}
    </FormControl>
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
