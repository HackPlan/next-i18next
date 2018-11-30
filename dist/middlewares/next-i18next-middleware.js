"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _utils = require("../utils");

function _default(app, server) {
  var config = this.config,
      i18n = this.i18n;
  var allLanguages = config.allLanguages,
      localeSubpaths = config.localeSubpaths;
  server.use(_i18nextExpressMiddleware.default.handle(i18n));

  if (localeSubpaths) {
    server.get('*', _utils.forceTrailingSlash);
    server.get(/^\/(?!_next|static).*$/, _utils.lngPathDetector);
    server.get("/:lng(".concat(allLanguages.join('|'), ")/*"), function (req, res) {
      var lng = req.params.lng;
      app.render(req, res, req.url.replace("/".concat(lng), ''), {
        lng: lng
      });
    });
  }
}