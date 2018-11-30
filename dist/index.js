"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createConfig = _interopRequireDefault(require("./config/create-config"));

var _createI18nextClient = _interopRequireDefault(require("./create-i18next-client"));

var _hocs = require("./hocs");

var _components = require("./components");

var _middlewares = require("./middlewares");

var NextI18Next = function NextI18Next(userConfig) {
  (0, _classCallCheck2.default)(this, NextI18Next);
  this.config = (0, _createConfig.default)(userConfig);
  this.i18n = (0, _createI18nextClient.default)(this.config);
  this.appWithTranslation = _hocs.appWithTranslation.bind(this);
  this.nextI18NextMiddleware = _middlewares.nextI18NextMiddleware.bind(this);
  this.withNamespaces = _hocs.withNamespaces.bind(this);
  this.Link = _components.Link.apply(this);
};

exports.default = NextI18Next;