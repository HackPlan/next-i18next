"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _detectNode = _interopRequireDefault(require("detect-node"));

var _i18next = _interopRequireDefault(require("i18next"));

var _i18nextXhrBackend = _interopRequireDefault(require("i18next-xhr-backend"));

var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));

var i18n = _i18next.default.default ? _i18next.default.default : _i18next.default;
i18n.nsFromReactTree = [];

if (_detectNode.default) {
  var i18nextNodeBackend = eval("require('i18next-node-fs-backend')"); // eslint-disable-line

  var i18nextMiddleware = require('i18next-express-middleware');

  i18n.use(i18nextNodeBackend).use(i18nextMiddleware.LanguageDetector);
} else {
  i18n.use(_i18nextXhrBackend.default).use(_i18nextBrowserLanguagedetector.default);
}

var _default = function _default(config) {
  if (!i18n.isInitialized) {
    i18n.init(config);
  }

  return i18n;
};

exports.default = _default;