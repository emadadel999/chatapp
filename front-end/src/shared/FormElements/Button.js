import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import theme from '../util/styles/Theme';


const Default = styled.button`
  border-radius: 20px;
  border: 1px solid ${(props) => theme.color[props.color] || theme.color.grey};
  background-color: ${(props) => theme.color[props.color] || theme.color.grey};
  margin-bottom: ${(props) => props.marginBottom || "0.35em"};
  margin-top: ${(props) => props.marginTop || 0};
  margin-left: ${(props) => props.marginLeft || 0};
  margin-right: ${(props) => props.marginRight || 0};
  color: ${theme.color.dark};
  font-size: 0.875rem;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: ${theme.transition.base({ el: "transform" })};
  cursor: pointer;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }

  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: #ccc;
    color: #979797;
    border-color: #ccc;
    cursor: not-allowed;
  }
`;

const Primary = styled(Default)`
  border-color: ${theme.color.primary};
  background-color: ${theme.color.primary};
  color: ${theme.color.white};
`;

const Secondary = styled(Default)`
  border-color: ${theme.color.scondary};
  background-color: ${theme.color.secondary};
  color: ${theme.color.white};
`;

const Transparent = styled(Default)`
  background-color: transparent;
  border-color: ${theme.color.white};
  color: ${theme.color.white};
`;

const Button = ({ variant= 'default', ...props }) => {
    const variants = {
      primary: Primary,
      secondary: Secondary,
      transparent: Transparent,
      default: Default,
    };

    return React.createElement(variants[variant], props);
};

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "transparent",
    "default",
  ]),
  marginBottom: PropTypes.string,
  marginTop: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};

export default Button;
