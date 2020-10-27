"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _Theme = _interopRequireDefault(require("./Theme"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 0.875rem;\n  line-height: 1.5;\n  letter-spacing: 0.01071em;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 2.125rem;\n  line-height: 1.17;\n  letter-spacing: 0.00735em;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  ", "\n  font-size: 1rem;\n  line-height: 1.5;\n  letter-spacing: 0.00938em;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-family: \"Roboto\", \"Helvetica\", \"Arial\", sans-serif;\n  margin-bottom: ", ";\n  margin-top: ", ";\n  margin-left: ", ";\n  margin-right: ", ";\n  color: ", ";\n  font-weight: ", ";\n  text-align: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Base = (0, _styledComponents.css)(_templateObject(), function (props) {
  return props.marginBottom || "0.35em";
}, function (props) {
  return props.marginTop || 0;
}, function (props) {
  return props.marginLeft || 0;
}, function (props) {
  return props.marginRight || 0;
}, function (props) {
  return _Theme.default.color[props.color] || _Theme.default.color.dark;
}, function (props) {
  return props.fontWeight || 400;
}, function (props) {
  return props.align || "inherit";
});

var Body = _styledComponents.default.p(_templateObject2(), Base);

var H4 = _styledComponents.default.h4(_templateObject3(), Base);

var Body2 = _styledComponents.default.p(_templateObject4(), Base);

var Typography = function Typography(_ref) {
  var _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'body' : _ref$variant,
      props = _objectWithoutProperties(_ref, ["variant"]);

  var variants = {
    'h4': H4,
    'body': Body,
    'body2': Body2
  };
  return _react.default.createElement(variants[variant], props);
};

Typography.propTypes = {
  variant: _propTypes.default.oneOf(['h4', 'body', 'body2']),
  marginBottom: _propTypes.default.string,
  marginTop: _propTypes.default.string,
  marginLeft: _propTypes.default.string,
  marginRight: _propTypes.default.string,
  color: _propTypes.default.string,
  fontWeight: _propTypes.default.number,
  align: _propTypes.default.oneOf(['right', 'left', 'center', 'inherit'])
};
var _default = Typography;
exports.default = _default;

//# sourceMappingURL=Typography.jsx.map