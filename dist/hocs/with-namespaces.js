"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _reactI18next = require("react-i18next");

function _default() {
  var namespaces = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.i18n.nsFromReactTree = (0, _toConsumableArray2.default)(new Set(this.i18n.nsFromReactTree.concat(namespaces)));
  return (0, _reactI18next.withNamespaces)(namespaces, options);
}