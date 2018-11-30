"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = require("url");

var _default = function _default(req, res, next) {
  var _parse = (0, _url.parse)(req.url),
      pathname = _parse.pathname,
      search = _parse.search;

  req.i18n.options.allLanguages.forEach(function (lng) {
    if (pathname === "/".concat(lng)) {
      res.redirect(301, pathname.replace("/".concat(lng), "/".concat(lng, "/")) + (search || ''));
    }
  });
  next();
};

exports.default = _default;