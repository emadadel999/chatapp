"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Theme = _interopRequireDefault(require("./Theme"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  background-color: transparent;\n  border-color: ", ";\n  color: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  border-color: ", ";\n  background-color: ", ";\n  color: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  border-color: ", ";\n  background-color: ", ";\n  color: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  border-radius: 20px;\n  border: 1px solid ", ";\n  background-color: ", ";\n  margin-bottom: ", ";\n  margin-top: ", ";\n  margin-left: ", ";\n  margin-right: ", ";\n  color: ", ";\n  font-size: 0.875rem;\n  font-weight: bold;\n  padding: 12px 45px;\n  letter-spacing: 1px;\n  text-transform: uppercase;\n  transition: ", ";\n  cursor: pointer;\n\n  &:active {\n    transform: scale(0.95);\n  }\n\n  &:focus {\n    outline: none;\n  }\n\n  &:disabled,\n  &:hover:disabled,\n  &:active:disabled {\n    background: #ccc;\n    color: #979797;\n    border-color: #ccc;\n    cursor: not-allowed;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Default = _styledComponents.default.button(_templateObject(), function (props) {
  return _Theme.default.color[props.color] || _Theme.default.color.grey;
}, function (props) {
  return _Theme.default.color[props.color] || _Theme.default.color.grey;
}, function (props) {
  return props.marginBottom || "0.35em";
}, function (props) {
  return props.marginTop || 0;
}, function (props) {
  return props.marginLeft || 0;
}, function (props) {
  return props.marginRight || 0;
}, _Theme.default.color.dark, _Theme.default.transition.base({
  el: "transform"
}));

var Primary = (0, _styledComponents.default)(Default)(_templateObject2(), _Theme.default.color.primary, _Theme.default.color.primary, _Theme.default.color.white);
var Secondary = (0, _styledComponents.default)(Default)(_templateObject3(), _Theme.default.color.scondary, _Theme.default.color.secondary, _Theme.default.color.white);
var Transparent = (0, _styledComponents.default)(Default)(_templateObject4(), _Theme.default.color.white, _Theme.default.color.white);

var Button = function Button(_ref) {
  var _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'default' : _ref$variant,
      props = _objectWithoutProperties(_ref, ["variant"]);

  var variants = {
    primary: Primary,
    secondary: Secondary,
    transparent: Transparent,
    default: Default
  };
  return _react.default.createElement(variants[variant], props);
};

Button.propTypes = {
  variant: _propTypes.default.oneOf(["primary", "secondary", "transparent", "default"]),
  marginBottom: _propTypes.default.string,
  marginTop: _propTypes.default.string,
  marginLeft: _propTypes.default.string,
  marginRight: _propTypes.default.string,
  color: _propTypes.default.string,
  type: _propTypes.default.oneOf(["button", "submit"]),
  onClick: _propTypes.default.func,
  disabled: _propTypes.default.bool
};
var _default = Button;
exports.default = _default;

//# sourceMappingURL=Button.jsx.map