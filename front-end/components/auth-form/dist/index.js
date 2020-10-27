"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Typography = _interopRequireDefault(require("./Typography"));

var _Button = _interopRequireDefault(require("./Button"));

var _SignUpForm = _interopRequireDefault(require("./SignUpForm"));

var _SignInForm = _interopRequireDefault(require("./SignInForm"));

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n  right: 0;\n  transform: ", ";\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  transform: ", ";\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  padding: 0 40px;\n  text-align: center;\n  top: 0;\n  height: 100%;\n  width: 50%;\n  transform: \"translateX(0)\";\n  transition: ", ";\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  background: #ff416c;\n  background: linear-gradient(to right, #9965f4 20%, #0000d6 100%);\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: 0 0;\n  color: #ffffff;\n  position: relative;\n  left: -100%;\n  height: 100%;\n  width: 200%;\n  transform: ", ";\n  transition: ", ";\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 50%;\n  width: 50%;\n  height: 100%;\n  overflow: hidden;\n  transition: ", ";\n  z-index: 100;\n  transform: ", ";\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  padding: 0 50px;\n  height: 100%;\n  text-align: center;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  left: 0;\n  width: 50%;\n  z-index: 2;\n  transform: ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n          ", " 0.6\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  left: 0;\n  width: 50%;\n  z-index: ", ";\n  transform: ", ";\n  opacity: ", ";\n  animation: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  0%, 49.99% {\n    opacity: 0;\n    z-index: 1;\n  }\n\n  50%, 100% {\n    opacity: 1;\n    z-index: 5;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  height: 100%;\n  transition: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 10px;\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);\n  position: relative;\n  overflow: hidden;\n  width: 768px;\n  max-width: 100%;\n  min-height: 480px;\n  text-align: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  font-family: \"Montserrat\", sans-serif;\n  height: 100vh;\n  margin: -20px 0 50px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Root = _styledComponents.default.div(_templateObject(), _Theme.default.color.greyLight);

var Container = _styledComponents.default.div(_templateObject2(), _Theme.default.color.white);

var FormContainer = _styledComponents.default.div(_templateObject3(), _Theme.default.transition.base({
  el: "all",
  speed: "0.6"
}));

var ShowSignUpContainer = (0, _styledComponents.keyframes)(_templateObject4());
var SignUpContainer = (0, _styledComponents.default)(FormContainer)(_templateObject5(), function (props) {
  return props.signUpActive ? 5 : 1;
}, function (props) {
  return props.signUpActive ? "translateX(100%)" : "translateX(0)";
}, function (props) {
  return props.signUpActive ? 1 : 0;
}, function (props) {
  return props.signUpActive ? (0, _styledComponents.css)(_templateObject6(), ShowSignUpContainer) : "none";
});
var SignInContainer = (0, _styledComponents.default)(FormContainer)(_templateObject7(), function (props) {
  return props.signUpActive ? "translateX(100%)" : "translateX(0)";
});
var StyledForm = (0, _styledComponents.css)(_templateObject8(), _Theme.default.color.white);
var SignUpFormStyled = (0, _styledComponents.default)(_SignUpForm.default)(_templateObject9(), StyledForm);
var SignInFormStyled = (0, _styledComponents.default)(_SignInForm.default)(_templateObject10(), StyledForm);

var OverlayContainer = _styledComponents.default.div(_templateObject11(), _Theme.default.transition.base({
  el: "transform",
  speed: "0.6"
}), function (props) {
  return props.signUpActive ? "translateX(-100%)" : "translateX(0)";
});

var Overlay = _styledComponents.default.div(_templateObject12(), function (props) {
  return props.signUpActive ? "translateX(50%)" : "translateX(0)";
}, _Theme.default.transition.base({
  el: "transform",
  speed: "0.6"
}));

var OverlayPanel = _styledComponents.default.div(_templateObject13(), _Theme.default.transition.base({
  el: "transform",
  speed: "0.6"
}));

var OverlayPanelLeft = (0, _styledComponents.default)(OverlayPanel)(_templateObject14(), function (props) {
  return props.signUpActive ? "translateX(-0)" : "translateX(-20%)";
});
var OverlayPanelRight = (0, _styledComponents.default)(OverlayPanel)(_templateObject15(), function (props) {
  return props.signUpActive ? "translateX(20%)" : "translateX(0)";
});

var AuthForm = function AuthForm(_ref) {
  var onSignUp = _ref.onSignUp,
      onSignIn = _ref.onSignIn,
      serverError = _ref.serverError,
      loading = _ref.loading;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      signUpActive = _useState2[0],
      setsignUp = _useState2[1];

  var toggleSignPanel = function toggleSignPanel() {
    setsignUp(function (prevSignUp) {
      return !prevSignUp;
    });
  };

  return /*#__PURE__*/_react.default.createElement(Root, null, /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(SignUpContainer, {
    signUpActive: signUpActive
  }, /*#__PURE__*/_react.default.createElement(SignUpFormStyled, {
    onSignUp: onSignUp,
    serverError: serverError,
    loading: loading
  })), /*#__PURE__*/_react.default.createElement(SignInContainer, {
    signUpActive: signUpActive
  }, /*#__PURE__*/_react.default.createElement(SignInFormStyled, {
    onSignIn: onSignIn,
    serverError: serverError,
    loading: loading
  })), /*#__PURE__*/_react.default.createElement(OverlayContainer, {
    signUpActive: signUpActive
  }, /*#__PURE__*/_react.default.createElement(Overlay, {
    signUpActive: signUpActive
  }, /*#__PURE__*/_react.default.createElement(OverlayPanelRight, {
    signUpActive: signUpActive
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    fontWeight: 550,
    variant: "h4",
    color: "white"
  }, "Welcome Back!"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body",
    color: "white"
  }, "To keep connected with us please login with your personal info"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: toggleSignPanel,
    variant: "transparent",
    marginTop: "1.17rem"
  }, "Sign Up")), /*#__PURE__*/_react.default.createElement(OverlayPanelLeft, {
    signUpActive: signUpActive
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    fontWeight: 550,
    variant: "h4",
    color: "white"
  }, "Hello, Friend!"), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body",
    color: "white"
  }, "Enter your personal details and start journey with us"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onClick: toggleSignPanel,
    variant: "transparent",
    marginTop: "1.17rem"
  }, "Sign In"))))));
};

var _default = AuthForm;
exports.default = _default;

//# sourceMappingURL=index.jsx.map