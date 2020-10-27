"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var yup = _interopRequireWildcard(require("yup"));

var _Typography = _interopRequireDefault(require("./Typography"));

var _FormInput = _interopRequireDefault(require("./FormInput"));

var _Button = _interopRequireDefault(require("./Button"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SignUpForm(_ref) {
  var className = _ref.className,
      onSignUp = _ref.onSignUp,
      serverError = _ref.serverError,
      loading = _ref.loading;
  return /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema: yup.object({
      name: yup.string().max(15, "must be 15 characters or less").required("required"),
      email: yup.string().email("invalid email address").required("required"),
      password: yup.string().max(6, "must be 6 characters or less").required("required")
    }),
    onSubmit: function onSubmit(values) {
      onSignUp(values);
    }
  }, function (formik) {
    return /*#__PURE__*/_react.default.createElement(_formik.Form, {
      className: className,
      onSubmit: formik.handleSubmit
    }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
      fontWeight: 550,
      variant: "h4"
    }, "Create Account"), /*#__PURE__*/_react.default.createElement(_FormInput.default, {
      id: "name",
      name: "name",
      type: "text",
      placeholder: "Name"
    }), /*#__PURE__*/_react.default.createElement(_FormInput.default, {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email"
    }), /*#__PURE__*/_react.default.createElement(_FormInput.default, {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password"
    }), serverError && /*#__PURE__*/_react.default.createElement("div", {
      className: "form-error"
    }, serverError), !loading ? /*#__PURE__*/_react.default.createElement(_Button.default, {
      variant: "secondary",
      type: "submit",
      marginTop: "1.17rem",
      disabled: !formik.isValid
    }, "Sign up") : /*#__PURE__*/_react.default.createElement(_Button.default, {
      variant: "secondary",
      type: "submit",
      marginTop: "1.17rem",
      disabled: true
    }, "Loading..."));
  });
}

var _default = SignUpForm;
exports.default = _default;

//# sourceMappingURL=SignUpForm.jsx.map