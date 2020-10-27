"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var theme = {
  color: {
    dark: "rgba(0, 0, 0, 0.87)",
    primary: "#5677fc",
    primaryDark: "#455ede",
    secondary: "#ff5177",
    grey: "#EEEEEE",
    greyLight: "#f6f5f7",
    white: "#FFFFFF"
  },
  transition: {
    base: function base(options) {
      return "\n          ".concat(options.el, " ").concat(options.speed || "0.2", "s cubic-bezier(0.4, 0.0, 0.2, 1)\n        ");
    }
  }
};
var _default = theme;
exports.default = _default;

//# sourceMappingURL=Theme.jsx.map